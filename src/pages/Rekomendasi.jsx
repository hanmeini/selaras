import React from 'react';
import RekomendasiGrid from '../components/RekomendasiGrid'; // Sesuaikan path
import iconPersonal from '../assets/target.png';
import iconAI from '../assets/ai.png';
import iconCepat from '../assets/petir.png';
import iconGratis from '../assets/kado.png';
import FiSearch from '../assets/search.png'
import HeroBg from '../assets/bg-Rekomendasi.png';
import { useParams } from 'react-router-dom';

const Rekomendasi = () => {
  const valueProps = [
    { icon: <img src={iconPersonal} alt="Ikon Rekomendasi Personal" className="w-5 h-5" />, text: "Rekomendasi Personal" },
    { icon: <img src={iconAI} alt="Ikon Tanya AI" className="w-5 h-5" />, text: "Tanya AI" },
    { icon: <img src={iconCepat} alt="Ikon Cepat dan Mudah" className="w-5 h-5" />, text: "Cepat & Mudah" },
    { icon: <img src={iconGratis} alt="Ikon Akses Gratis" className="w-5 h-5" />, text: "Akses Gratis" },
  ];
  const { kategori } = useParams();

  return (
    <div className="bg-gray-50">
      {/* 1. Hero Section */}
      <header 
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center text-white p-4"
        style={{ backgroundImage: `url(${HeroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Destinasi Sesuai <span className="text-yellow-300">MOOD</span>-mu
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">
            Yuk, jelajahi tempat-tempat yang paling cocok dengan suasana hatimu.
          </p>
          <div className="mt-8 w-full max-w-lg">
            <div className="relative">
              <input 
                type="text"
                placeholder="Cari destinasi impianmu..."
                className="bg-white w-full py-4 pl-6 pr-16 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#003366] hover:bg-[#6595c5] text-white p-2 rounded-full transition-colors">
                <img src={FiSearch} alt="Cari" className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Value Props Section */}
      <div className="bg-white py-4 -mt-8 relative z-20 mx-auto max-w-4xl rounded-full shadow-lg">
        <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-12 gap-y-2 px-4">
          {valueProps.map((prop, index) => (
            <div key={index} className="flex items-center gap-2 text-blue-900 font-semibold">
              {prop.icon}
              <span className="text-sm">{prop.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Rekomendasi Grid Section */}
      
      <RekomendasiGrid kategori={kategori} />
      
      {/* 4. Call to Action Section */}
      <footer className="text-center py-16">
        <p className="text-lg text-gray-600">
          Cari rekomendasi lain? <a href="#" className="font-bold text-blue-600 hover:underline">Tanya AI</a>
        </p>
        {/* Anda bisa menambahkan ikon-ikon di sini jika perlu */}
      </footer>
    </div>
  );
};

export default Rekomendasi;