import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/Authcontext'; // Sesuaikan path
import { db } from '../../firebase-config';
import { collection, doc, addDoc, getDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import ChatMessage from '../components/ChatStyle';
import logo from "../assets/logo.png";
import SelarasAI from '../assets/selarasAi.png'
import { useNavigate } from 'react-router-dom';

const SendIcon = () => ( <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg> );
const UserIcon = () => ( <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>);
const NewChatIcon = () => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> );
const HomeIcon = () => ( <svg  className="w-5 h-5" strokeWidth={1.5} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5413 3.60374C13.2234 3.01136 14.0965 2.68518 15 2.68518C15.9035 2.68518 16.7766 3.01136 17.4587 3.60374L26.2087 11.1987C26.6143 11.5509 26.9394 11.986 27.1622 12.4747C27.3849 12.9634 27.5002 13.4942 27.5 14.0312V23.75C27.5 24.7446 27.1049 25.6984 26.4017 26.4016C25.6984 27.1049 24.7446 27.5 23.75 27.5H19.375C18.8777 27.5 18.4008 27.3024 18.0492 26.9508C17.6975 26.5992 17.5 26.1223 17.5 25.625V17.1087H12.5V25.625C12.5 26.1223 12.3025 26.5992 11.9508 26.9508C11.5992 27.3024 11.1223 27.5 10.625 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4016C2.89509 25.6984 2.5 24.7446 2.5 23.75V14.0312C2.49985 13.4942 2.61506 12.9634 2.83783 12.4747C3.0606 11.986 3.38574 11.5509 3.79125 11.1987L12.5413 3.60374ZM15.82 5.49124C15.5926 5.29356 15.3013 5.18469 15 5.18469C14.6987 5.18469 14.4074 5.29356 14.18 5.49124L5.43 13.0875C5.29496 13.2049 5.18669 13.3499 5.11251 13.5127C5.03832 13.6755 4.99996 13.8523 5 14.0312V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H10V17.1087C10 16.4457 10.2634 15.8098 10.7322 15.341C11.2011 14.8721 11.837 14.6087 12.5 14.6087H17.5C18.163 14.6087 18.7989 14.8721 19.2678 15.341C19.7366 15.8098 20 16.4457 20 17.1087V25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V14.0312C24.9999 13.8522 24.9613 13.6753 24.8869 13.5125C24.8125 13.3497 24.704 13.2047 24.5688 13.0875L15.82 5.49124Z" fill="black"/></svg> );


// --- Komponen Utama ---
const ChatPage = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null); // State untuk melacak chat aktif
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fungsi untuk scroll otomatis ke pesan terakhir
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  // Mengambil riwayat chat dari Firestore untuk sidebar
  useEffect(() => {
    if (!userProfile) return;
    const q = query(collection(db, `users/${userProfile.uid}/chats`), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => ({ id: doc.id, title: doc.data().prompt.substring(0, 30) + '...' }));
      setChatHistory(history);
    });
    return () => unsubscribe();
  }, [userProfile]);

  // Fungsi untuk memulai percakapan baru
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput('');
  };

  // Fungsi untuk memuat percakapan lama dari riwayat
  const handleLoadChat = async (chatId) => {
    if (!userProfile) return;
    setIsLoading(true);
    setMessages([]); // Kosongkan pesan saat memuat
    setCurrentChatId(chatId);
    
    const docRef = doc(db, `users/${userProfile.uid}/chats`, chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatData = docSnap.data();
      // Rekonstruksi percakapan dari data yang tersimpan
      setMessages([
        { role: 'user', content: chatData.prompt },
        { role: 'ai', content: chatData.response }
      ]);
    } else {
      console.error("No such document!");
    }
    setIsLoading(false);
  };

  // Fungsi utama untuk mengirim pesan
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !userProfile) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const aiMessage = { role: 'ai', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);

      // Logika penyimpanan: hanya menyimpan jika ini adalah percakapan baru
      if (currentChatId === null) {
        const chatCollectionRef = collection(db, `users/${userProfile.uid}/chats`);
        const newDocRef = await addDoc(chatCollectionRef, {
          prompt: currentInput,
          response: data.reply,
          timestamp: serverTimestamp(),
        });
        // Setelah tersimpan, set ID chat agar percakapan selanjutnya tidak membuat dokumen baru
        setCurrentChatId(newDocRef.id);
      }
      
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: 'Maaf, terjadi kesalahan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans pt-16 md:pt-0"> {/* Padding top untuk mobile */}
      {/* --- Sidebar (Kiri) --- */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r shrink-0">
        <div className="p-4 border-b">
          <img src={logo} alt="logo" className="h-12 w-auto lg:h-12 " />
        </div>
        <div className="p-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium text-sm">
            <HomeIcon />
            Beranda
          </button>
        </div>
        <div className="p-2">
          <button onClick={handleNewChat} className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-200 font-medium text-sm">
            <NewChatIcon />
            Percakapan Baru
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase">Percakapan</p>
          {chatHistory.map(chat => (
            <button key={chat.id} onClick={() => handleLoadChat(chat.id)} className={`w-full text-left block p-2 rounded-lg text-sm truncate ${currentChatId === chat.id ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
              {chat.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- Area Chat Utama (Kanan) --- */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* --- Tampilan Kosong (Empty State) --- */}
            {messages.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <div className="inline-block p-3 bg-blue-100 rounded-full">
                  <img src={SelarasAI} />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-800">Halo! Lagi pengen liburan?</h2>
                <p className="mt-1 text-gray-500">Yuk cari tempat seru bareng aku!</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <AiIcon />
                <div className="flex-1 pt-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* --- Input Form --- */}
        <div className="p-4 sm:p-6 border-t bg-white">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Cari tempat sesuai moodmu..."
                className="w-full py-3 pl-4 pr-14 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                disabled={isLoading || !input.trim()}
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;