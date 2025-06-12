import React, { useState } from 'react';

export default function WisataQuiz({ onSubmit }) {
  const [answers, setAnswers] = useState({
    jenis: '',
    gaya: '',
    budget: '',
    cuaca: '',
  });
  

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers); // kirim jawaban ke parent (bisa ditampilkan hasilnya)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kuis Rekomendasi Wisata</h2>

      <label>Jenis wisata favorit:</label>
      <select name="jenis" value={answers.jenis} onChange={handleChange} required>
        <option value="">-- Pilih --</option>
        <option value="Pantai">Pantai</option>
        <option value="Gunung">Gunung</option>
        <option value="Kota">Kota</option>
        <option value="Sejarah">Sejarah</option>
      </select>

      <label>Gaya liburan:</label>
      <select name="gaya" value={answers.gaya} onChange={handleChange} required>
        <option value="">-- Pilih --</option>
        <option value="Santai">Santai</option>
        <option value="Petualangan">Petualangan</option>
        <option value="Budaya">Budaya</option>
        <option value="Kuliner">Kuliner</option>
      </select>

      <label>Budget:</label>
      <select name="budget" value={answers.budget} onChange={handleChange} required>
        <option value="">-- Pilih --</option>
        <option value="Hemat">Hemat</option>
        <option value="Sedang">Sedang</option>
        <option value="Mewah">Mewah</option>
      </select>

      <label>Cuaca disukai:</label>
      <select name="cuaca" value={answers.cuaca} onChange={handleChange} required>
        <option value="">-- Pilih --</option>
        <option value="Panas">Panas</option>
        <option value="Dingin">Dingin</option>
        <option value="Bebas">Bebas</option>
      </select>

      <button type="submit">Lihat Rekomendasi</button>
    </form>
  );
}
