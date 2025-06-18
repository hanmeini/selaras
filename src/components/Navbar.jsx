// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import panah from "../assets/panah.png";
import person from "../assets/person-icon.png";
import { useState, useRef, useEffect } from "react";
import stars from '../assets/stars.png'
import quiz from '../assets/quiz.png'
import React from "react";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const layananRef = useRef(null);

  const toggleLayanan = () => {
  setLayananOpen(!layananOpen);
};

  // Tutup modal saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (layananRef.current && !layananRef.current.contains(event.target)) {
        setLayananOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-[#FAFAFA] shadow-md transition-all duration-300${
        isScrolled
          ? "bg-white/20 backdrop-blur-lg shadow-lg"
          : "bg-transparent lg:bg-[#FAFAFA]"
      } p-1 md:p-2`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7 lg:py-5">
        {/* Logo kiri */}
        <div className="flex-shrink-0">
          <img src={logo} alt="logo" className="h-12 w-auto lg:h-12 " />
        </div>

        {/* Navigasi tengah */}
        <div className="flex-1 w-full flex justify-center">
          <div className="flex gap-10 text-sm lg:text-base font-medium text-[#2E2E2E] text-center items-center mr-12">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Beranda
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Tentang Kami
            </Link>
            <div className="relative">
              <button
                onClick={toggleLayanan}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                <span className="flex items-center gap-1">
                  Layanan
                  <img
                    src={panah}
                    alt="panah"
                    className={`w-3 h-3 mt-1 transform transition-transform duration-200 ${
                      layananOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              {layananOpen && (
                <div ref={layananRef} className="absolute top-full mt-2 bg-white shadow-lg rounded-xl p-5 z-50 flex flex-col w-max items-start gap-5">
                  <p className="text-gray-400">Layanan</p>
                  <Link to='/SelarasAI' className="flex flex-row gap-2">
                    <img className="bg-[#003366] p-3 object-contain rounded-xl w-12 h-12" src={stars}/>
                    <div className="flex-col flex items-start">
                      <p className="font-semibold">Selaras AI</p>
                      <p className="text-gray-400">Rekomendasi liburan sesuai mood-mu.</p>
                    </div>
                  </Link>
                  <Link to='/quiz' className="flex flex-row gap-2">
                    <img className="bg-[#003366] p-3 object-contain rounded-xl w-12 h-12" src={quiz}/>
                    <div className="flex-col flex items-start">
                      <p className="font-semibold">Selaras Quiz</p>
                      <p className="text-gray-400 max-w-[80%] text-left">Cari tahu tempat liburan paling pas untukmu lewat kuis ini.</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/chat"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Kontak Kami
            </Link>
          </div>
        </div>

        {/* daftar */}
        <div className="flex items-center gap-2">
          <Link to='/register' className="flex items-center justify-between bg-[#003366] lg:w-32 lg:h-11 rounded-full text-[#FAFAFA] font-medium px-3">
            <span className="ml-2">Daftar</span>
            <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#FAFAFA]">
              <img src={person} alt="person icon" className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Spacer kanan biar simetris */}
        <div className="w-12 lg:w-16" />
      </div>
    </nav>
  );
}
