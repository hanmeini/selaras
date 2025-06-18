import React from 'react';
import ReactMarkdown from 'react-markdown';

// Ikon bisa Anda simpan di sini atau impor dari file lain
const UserIcon = () => ( <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div> );
const AiIcon = () => ( <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">✧</div> );

const ChatMessage = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';

  return (
    // Kontainer utama untuk satu baris pesan, menggunakan flexbox
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      <div className="flex items-start gap-3 max-w-2xl">
        
        {/* Tampilkan Ikon AI di kiri */}
        {!isUser && <AiIcon />}
        
        {/* Gelembung Pesan */}
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
            ? 'bg-gray-200 text-gray-800' // Gaya untuk user (kanan)
            : 'bg-white' // Gaya untuk AI (kiri)
          }`}
        >
          <p className="font-bold text-sm mb-1">
            {isUser ? 'Anda' : 'Selaras AI'}
          </p>
          
          {/* Konten pesan dengan text-justify dan styling dari 'prose' */}
          <div className="prose prose-sm max-w-none text-justify">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        {/* Tampilkan Ikon User di kanan */}
        {isUser && <UserIcon />}
        
      </div>
    </div>
  );
};

export default ChatMessage;