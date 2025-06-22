import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Impor ikon dari react-icons
import { FiMapPin, FiClock, FiChevronLeft, FiStar, FiSun, FiCompass, FiAnchor } from 'react-icons/fi';

const DetailPage = () => {
  const { placeId } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!placeId) return;
      setLoading(true);
      const docRef = doc(db, 'places', placeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlace({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
        // Arahkan ke halaman not found jika perlu
      }
      setLoading(false);
    };

    fetchPlace();
  }, [placeId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Memuat data wisata...</div>;
  }

  if (!place) {
    return <div className="flex justify-center items-center h-screen">Wisata tidak ditemukan.</div>;
  }

  const featureIcons = {
    island: <FiAnchor />,
    dragon: <FiCompass />,
    sunset: <FiSun />,
  }

  return (
    <div className="bg-white">
      {/* Tombol Kembali */}
      <button onClick={() => navigate(-1)} className="absolute top-5 left-5 z-20 bg-white/50 p-2 rounded-full hover:bg-white transition">
        <FiChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* --- Bagian Header & Galeri --- */}
      <header className="p-4 md:p-8 lg:p-12 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">{place.name}</h1>
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 mt-4 text-blue-200">
            <p className="flex items-center gap-2"><FiMapPin /> {place.location}</p>
            <p className="flex items-center gap-2"><FiClock /> {place.jamOperasional}</p>
          </div>
        </div>
      </header>
      
      {/* Galeri Gambar Responsif */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 -mt-16 md:-mt-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-96">
          <div className="col-span-2 row-span-2">
            <img src={place.galleryImages?.[0]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
          </div>
          <div className="col-span-1 row-span-1">
            <img src={place.galleryImages?.[1]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
          </div>
          <div className="col-span-1 row-span-1">
            <img src={place.galleryImages?.[2]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Kolom Konten Utama (Kiri) --- */}
        <div className="lg:col-span-2 space-y-10">
          {/* Section "Serunya Liburan Disini" */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Serunya Liburan Disini</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {place.keyFeatures?.map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-48 bg-gray-50 p-4 rounded-xl border">
                  <div className="text-blue-600 text-2xl mb-2">{featureIcons[feature.icon] || <FiStar />}</div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section "Tentang" */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tentang {place.name}</h2>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
          </div>
        </div>

        {/* --- Kolom Info (Kanan) --- */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">Info Umum</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Lokasi:</strong> {place.location}</li>
              <li><strong>Jam Operasional:</strong> {place.jamOperasional}</li>
              <li><strong>Waktu Terbaik:</strong> {place.waktuTerbaik}</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">Aksesibilitas Difabel</h3>
            <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
              {place.aksesibilitasDetails?.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default DetailPage;