import React from 'react';

const WisataCard = ({ gambarUrl, nama, lokasi, deskripsi }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img src={gambarUrl} alt={nama} className="w-full h-96 object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <button className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/50 transition-colors">
        Detail
      </button>

      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{nama}, {lokasi}</h3>
        <p className="text-sm mt-1 opacity-90">{deskripsi}</p>
      </div>
    </div>
  );
};

export default WisataCard;