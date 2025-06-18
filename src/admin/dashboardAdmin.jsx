import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config'; // Sesuaikan path

const AdminDashboardPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('alam');
  const [moods, setMoods] = useState([]);
  const [aksesDifabel, setAksesDifabel] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const moodOptions = ["romantis", "petualangan", "seru", "santai"];

  const handleMoodChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMoods([...moods, value]);
    } else {
      setMoods(moods.filter((mood) => mood !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Menyimpan...');

    const newPlace = {
      name,
      location,
      description,
      category,
      mood: moods,
      aksesDifabel,
      imageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, 'places'), newPlace);
      setMessage(`Data berhasil ditambahkan dengan ID: ${docRef.id}`);
      // Kosongkan form
      setName(''); setLocation(''); setDescription(''); setCategory('alam');
      setMoods([]); setAksesDifabel(false); setImageUrl('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error adding document: ", error);
    }
  };

  return (
    // PENYESUAIAN 1: Padding diubah agar lebih kecil di mobile
    <div className="p-4 sm:p-8 lg:p-16 bg-gray-100 min-h-screen"> 
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        
        {/* PENYESUAIAN 2: Ukuran teks diubah agar lebih kecil di mobile */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Tambah Data Wisata Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block mb-1 font-medium text-left">Nama Wisata</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded"/>
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">Lokasi</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 border rounded" placeholder="Contoh: Kota Semarang"/>
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full p-2 border rounded" placeholder="Jelaskan tentang tempat wisata ini..."></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">URL Gambar</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full p-2 border rounded" placeholder="https://contoh.com/gambar.jpg"/>
          </div>
          
          <div>
            <label className="block mb-1 font-medium text-left">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
              <option value="alam">Alam</option>
              <option value="sejarah">Sejarah</option>
              <option value="pantai">Pantai</option>
              <option value="hiburan">Hiburan</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">Mood</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {moodOptions.map(mood => (
                <label key={mood} className="flex items-center gap-2 capitalize">
                  <input type="checkbox" value={mood} checked={moods.includes(mood)} onChange={handleMoodChange} className="w-4 h-4"/>
                  {mood}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">Akses Ramah Difabel?</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2"><input type="radio" name="difabel" checked={aksesDifabel === true} onChange={() => setAksesDifabel(true)} /> Ya</label>
              <label className="flex items-center gap-2"><input type="radio" name="difabel" checked={aksesDifabel === false} onChange={() => setAksesDifabel(false)} /> Tidak</label>
            </div>
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Simpan Data</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600 bg-gray-100 p-3 rounded-md">{message}</p>}
      </div>
    </div>
  );
};

export default AdminDashboardPage;