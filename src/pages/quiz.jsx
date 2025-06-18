import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import bgHome from '../assets/bg-grid.png'
import question from '../assets/question.png'
import { useAuth } from '../context/Authcontext'; // Sesuaikan path


export const quizQuestions = [
  // --- BAGIAN 1: Menentukan KATEGORI UTAMA (3 Pertanyaan) ---
  {
    question: "Jenis tempat wisata seperti apa yang paling menarik bagi Anda?",
    key: "kategori_1", 
    options: [
      { answer: "Pegunungan, danau, atau air terjun", category: "alam" },
      { answer: "Museum, candi, atau kota tua", category: "sejarah" },
      { answer: "Pantai dengan pasir dan ombak", category: "pantai" },
      { answer: "Taman hiburan atau pusat keramaian", category: "hiburan" },
    ],
  },
  {
    question: "Aktivitas apa yang paling ingin Anda lakukan di liburan berikutnya?",
    key: "kategori_2",
    options: [
      { answer: "Menjelajah alam dan menikmati udara segar", category: "alam" },
      { answer: "Mempelajari budaya dan cerita masa lalu", category: "sejarah" },
      { answer: "Bermain air dan bersantai di tepi laut", category: "pantai" },
      { answer: "Mencoba wahana seru dan mencari keramaian", category: "hiburan" },
    ],
  },
  {
    question: "Jika Anda punya waktu luang seharian, ke mana Anda akan pergi?",
    key: "kategori_3",
    options: [
      { answer: "Ke kawasan hutan pinus atau kebun teh", category: "alam" },
      { answer: "Mengunjungi bangunan-bangunan kuno", category: "sejarah" },
      { answer: "Menikmati matahari terbenam di pantai", category: "pantai" },
      { answer: "Ke theme park atau pusat perbelanjaan", category: "hiburan" },
    ],
  },

  // --- BAGIAN 2: Menentukan MOOD (1 Pertanyaan) ---
  {
    question: "Suasana atau 'mood' seperti apa yang Anda cari untuk liburan kali ini?",
    key: "pilihanMood",
    options: [
      { answer: "Romantis dan penuh kenangan", value: "romantis" },
      { answer: "Menantang dan penuh petualangan", value: "petualangan" },
      { answer: "Seru, ramai, dan penuh energi", value: "seru" },
      { answer: "Santai, tenang, dan damai", value: "santai" },
    ],
  },
  
  // --- BAGIAN 3: Menentukan PREFERENSI AKSESIBILITAS
  {
    question: "Apakah Anda memprioritaskan tempat wisata dengan fasilitas ramah difabel?",
    key: "preferensiDifabel",
    options: [
      { answer: "Ya, ini penting bagi saya", value: true },
      { answer: "Tidak, ini bukan prioritas utama", value: false },
    ],
  },
];


const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const navigate = useNavigate(); 
  const { logout } = useAuth(); // 1. Ambil fungsi logout dari konteks

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

    const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1){
      setCurrentIndex(currentIndex + 1);
    }
  };

    const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

    const handleFinish = () => {
        console.log("Tombol 'Selesai' diklik, fungsi handleFinish berjalan!");
        // Filter hanya jawaban dari pertanyaan kategori
        const categoryAnswers = answers.filter(ans => ans && ans.category);

        // Hitung skor untuk setiap kategori
        const categoryCount = categoryAnswers.reduce((acc, current) => {
            acc[current.category] = (acc[current.category] || 0) + 1;
            return acc;
        }, {});

        const sortedCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
        
        const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : 'alam';

        // 2. AMBIL JAWABAN SPESIFIK UNTUK MOOD
        const moodAnswer = answers.find(ans => ans && ans.key === 'pilihanMood');

        const pilihanMood = moodAnswer ? moodAnswer.value : 'semua';

        const difabelAnswer = answers.find(ans => ans && ans.key === 'preferensiDifabel');

        const butuhAksesDifabel = difabelAnswer ? difabelAnswer.value : false;

        console.log('--- HASIL KUIS ---');
        console.log('Kategori Terpilih:', topCategory);
        console.log('Mood Pilihan:', pilihanMood);
        console.log('Butuh Akses Difabel:', butuhAksesDifabel);
        console.log('--------------------');

        navigate(`/rekomendasi/${topCategory}?mood=${pilihanMood}&aksesDifabel=${butuhAksesDifabel}`);
    };

    const answeredQuestions = answers.reduce((acc, val, idx) => {
    if (val !== null) acc.push(idx);
    return acc;
    }, []);

    const currentQuestion = quizQuestions[currentIndex];

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Jawaban:', answers[currentIndex]?.answer);
    };

    const handleLogout = async () => {
        try {
            await logout(); // 2. Panggil fungsi logout dari konteks
            navigate('/'); // 3. Arahkan pengguna ke homepage setelah logout
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

  return (
    <div style={{ backgroundImage: `url(${bgHome})` }} className="min-h-screen bg-gray-50 p-20 mt-20 bg-cover bg-center bg-no-repeat">
      <div className="text-sm text-gray-600 mb-4 flex justify-start gap-1">
          <Link to="/quiz" className="text-[#003366] hover:underline font-semibold">Layanan</Link>
          <span>/</span>
          <Link to="/quiz" className="text-[#003366] hover:underline font-semibold">Quiz</Link>
          <span>/</span>
          <Link to="/rekomendasi-wisata" className="text-gray-400 hover:underline font-semibold">Rekomendasi Wisata</Link>
      </div>

      <div className='flex flex-row items-center justify-center'>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          QUIZ
        </h1>
        <img
            src={question}
            alt="question"
            className="object-contain w-14 h-20 mt-[-10px]"
          />
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-500">
          Berikan jawabanmu dari kuis dibawah ini untuk
        </p>
        <p className="text-gray-500">
          merekomendasikan wisata yang terbaik
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-20 py-10">
        {/* Kiri: Pertanyaan */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-left">{currentQuestion.question}</h2>
          <p className='mb-4 text-gray-500 text-left'>Berikan Jawabanmu :</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-6">
              {currentQuestion.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 border px-5 py-3 rounded-xl cursor-pointer ${answers[currentIndex]?.answer === opt.answer ? 'bg-blue-100 border-blue-600' : 'bg-white'}`}
                >
                <input
                  type="radio"
                  name="answer"
                  value={opt.answer}
                  checked={answers[currentIndex]?.answer === opt.answer}
                  onChange={() => handleSelect(opt)}
                  className="accent-blue-700"
                />
                <span>{opt.answer}</span>
                </label>
              ))}
            </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {currentIndex < quizQuestions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={answers[currentIndex] === null}
            className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Selesai
          </button>
        )}
      </div>
          </form>
        </div>

        {/* Kanan: List Pertanyaan */}
        <div className="bg-white p-6 rounded-2xl shadow w-full">
          <h3 className="text-md font-semibold mb-4">List Kuis Pertanyaan</h3>
          <div className="flex flex-col gap-2">
            {quizQuestions.map((_, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-4 py-2 rounded-xl text-sm font-medium ${answeredQuestions.includes(i) ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-400'}`}
              >
                <span>Pertanyaan {i + 1}</span>
                {answeredQuestions.includes(i) && (
                  <span className="text-blue-600">✔️</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default QuizPage;