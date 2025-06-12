// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import panah from '../assets/panah.png'
import person from '../assets/person-icon.png'
import { useState } from 'react';


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-[#FAFAFA] shadow-md transition-all duration-300${
      isScrolled? "bg-white/20 backdrop-blur-lg shadow-lg" : "bg-transparent lg:bg-[#FAFAFA]"
    } p-1 md:p-2`}>
  <div className="flex items-center justify-between px-5 lg:px-7 lg:py-5">
    {/* Logo kiri */}
    <div className="flex-shrink-0">
      <img src={logo} alt="logo" className="h-12 w-auto lg:h-12 " />
    </div>

    {/* Navigasi tengah */}
    <div className="flex-1 flex justify-center">
      <div className="flex gap-10 text-sm lg:text-base font-medium text-[#2E2E2E] text-center items-center mr-12">
        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Beranda</Link>
        <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">Tentang Kami</Link>
        <Link to="/quiz" className="hover:text-blue-600 transition-colors duration-200"><span className="flex items-center gap-1">Layanan<img src={panah} alt="panah" className="w-3 h-3 mt-1" /></span></Link>
        <Link to="/chat" className="hover:text-blue-600 transition-colors duration-200">Kontak Kami</Link>
      </div>
    </div>
    
  {/* daftar */}
  <div className='flex items-center gap-2'>
    <button className="flex items-center justify-between bg-[#003366] lg:w-32 lg:h-11 rounded-full text-[#FAFAFA] font-medium px-3">
  <span className="ml-2">Daftar</span>
  <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#FAFAFA]">
    <img src={person} alt="person icon" className="w-4 h-4" />
  </div>
</button>

  </div>

    {/* Spacer kanan biar simetris */}
    <div className="w-12 lg:w-16" />
  </div>
</nav>

  )
}
