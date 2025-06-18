import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; // Impor 'limit'
import WisataCard from './WisataCard';
import { useParams, useLocation } from 'react-router-dom'; // <== tambahkan useParams

const RekomendasiGrid = () => { // Terima 'kategori' dari prop
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const { kategori } = useParams(); // /rekomendasi/:kategori
  const location = useLocation();   // ?mood=semua&aksesDifabel=false
  const searchParams = new URLSearchParams(location.search); // ✅

  const pilihanMood = searchParams.get('mood') || 'semua';
  const aksesDifabelParam = searchParams.get('aksesDifabel');
  const butuhAksesDifabel = aksesDifabelParam === 'true'; // ✅ ubah jadi boolean


  useEffect(() => {
    const fetchDestinasi = async () => {
      setLoading(true);
      try {
      let conditions = [where('category', '==', kategori)];

      if (pilihanMood && pilihanMood !== 'semua') {
        conditions.push(where('mood', 'array-contains', pilihanMood));
      }

      if (butuhAksesDifabel === true) {
        conditions.push(where('aksesDifabel', '==', true));
      }

        const q = query(collection(db, 'places'), ...conditions);
        const querySnapshot = await getDocs(q);
        const listDestinasi = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDestinasi(listDestinasi);
      } catch (error) {
        console.error("Query Gagal! Cek Composite Index di Firestore.", error);
      }
      setLoading(false);
    };

    if (!kategori) {
      setDestinasi([]);
      setLoading(false);
      return;
    }

    fetchDestinasi();
  }, [kategori, pilihanMood, butuhAksesDifabel]);

  if (loading) {
    return <div className="text-center p-10">Memuat rekomendasi...</div>;
  }

  if (!kategori && !pilihanMood && !butuhAksesDifabel) {
    return <p className="text-center">Silakan pilih kategori atau filter terlebih dahulu.</p>
  }

  // ( ... sisa kode JSX Anda tetap sama ... )
  return (
    <section className="px-4 md:px-8 lg:px-16 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          {kategori ? "Rekomendasi Untukmu" : "Jelajahi Tempat Populer"}
        </h2>
        {kategori && (
          <p className="text-gray-600 mt-2 capitalize">
            Menampilkan hasil untuk: {kategori}
            {pilihanMood && pilihanMood !== 'semua' && `, mood ${pilihanMood}`}
            {butuhAksesDifabel && ', ramah difabel'}
          </p>
        )}
      </div>

      {destinasi.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinasi.map(item => (
            <WisataCard 
              key={item.id}
              gambarUrl={item.imageUrl}
              nama={item.name}
              lokasi={item.location}
              deskripsi={item.description}
              moods={item.mood}
              aksesDifabel={item.aksesDifabel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold bg-white p-10 rounded-xl shadow-md">
          <p>Maaf, tidak ada rekomendasi yang ditemukan untuk kombinasi filter ini.</p>
        </div>
      )}
    </section>
  );
};

export default RekomendasiGrid;