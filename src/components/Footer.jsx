import React from 'react'
import logoNoName from '../assets/logo-noname.png'
import panahBawah from '../assets/panah-bawah.png'
import line from '../assets/garis.png'
import slack from '../assets/slack.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import linkedin from '../assets/linkedin.png'

export default function Footer() {
  return (
    <footer className="relative bg-[#003366] flex flex-col">
      <div className="flex flex-row justify-between px-7 pt-3">
        {/* Kiri */}
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <img src={logoNoName} alt="logo" className='w-14 h-14' />
            <h1 className='font-semibold font-manrope text-5xl text-white ml-4'>selaras</h1>
          </div>
          <p className='text-[#FAFAFA] font-manrope mt-8'>Platform rekomendasi destinasi yang membantumu menemukan</p>
          <p className='text-[#FAFAFA] font-manrope'>tempat terbaik sesuai suasana hati dan kebutuhanmu.</p>
        </div>

        {/* Tengah */}
        <img src={panahBawah} alt="panahbawah" className='w-24 h-24' />

        {/* Navigasi */}
        <div className='flex mr-8 mt-12'>
          <div className='flex flex-col'>
          <h1 className='text-white font-semibold text-center mb-2'>Navigasi</h1>
          <div className='text-left flex flex-col ml-10'>
            <a href="#home" className="text-[#B3B3B3] font-manrope text-md">Beranda</a>
            <a href="#about" className="text-[#B3B3B3] font-manrope text-md">Tentang Kami</a>
            <a href="#overview" className="text-[#B3B3B3] font-manrope text-md">Cerita Mereka</a>
            <a href="#contact" className="text-[#B3B3B3] font-manrope text-md">Kontak Kami</a>
          </div>
        </div>

        {/* Layanan */}
        <div className='flex flex-col ml-10'>
          <h1 className='text-white font-semibold text-center mb-2'>Layanan</h1>
          <div className='text-left flex flex-col ml-3'>
            <a href="#quiz" className="text-[#B3B3B3] font-manrope text-md">Quiz</a>
            <a href="#ai" className="text-[#B3B3B3] font-manrope text-md">Selaras AI</a>
          </div>
        </div>
        </div>
      </div>

      {/* Gambar garis di bawah */}
      <div className="mt-28 mx-5">
        <img src={line} alt="line" className='w-full h-auto' />
      </div>

      <div className='flex mx-5 mt-5'>
        <p className='text-[#D6D6D6] text-md font-semibold'>&copy; 2025 Selaras. Semua hak dilindungi.</p>
        <div className='flex flex-row gap-4 right-4 absolute'>
          <img src={slack} alt="" className='w-6 h-6'/>
          <img src={linkedin} alt="" className='w-6 h-6'/>
          <img src={twitter} alt="" className='w-6 h-6'/>
          <img src={instagram} alt="" className='w-6 h-6'/>
        </div>
      </div>
    </footer>
  )
}
