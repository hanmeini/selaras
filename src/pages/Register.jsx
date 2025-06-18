import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import login from "../assets/login.png";
import unlock from '../assets/Unlock.png';
import { auth, provider, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date()
      });

      alert("Registrasi berhasil!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date()
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full">
        <div className="w-1/2 relative hidden lg:block">
        <img
            src={login}
            alt="background"
            className="h-full w-full object-cover"
        />

        {/* BACK BUTTON */}
        <button  onClick={() => navigate(-1)} className="z-10 absolute top-5 left-5 w-12 h-12 flex items-center justify-center text-white text-2xl border border-white rounded-full hover:bg-white hover:text-[#003366] transition">
            ←
        </button>

        <div className="absolute inset-0 bg-[#003366]/55 flex flex-col justify-end p-10 text-white">
            <div className="text-white mb-10">
            <h1 className="text-3xl font-bold z-20">
                Temukan Tempat, Temukan Cerita
            </h1>
            <p className="text-lg mt-2">
                Jelajahi destinasi yang sesuai dengan suasana hatimu.
            </p>
            </div>
        </div>
        </div>


      {/* Kanan: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="mb-6">
            <img src={unlock}/>
        </div>

        <h2 className=" text-3xl font-semibold text-gray-800">
          Gabung Bersama Kami
        </h2>
        <p className="text-gray-500 mt-1 mb-6 text-center">
          Mulai petualanganmu bersama Selaras
        </p>
        <button onClick={handleGoogle} className="w-full max-w-sm flex items-center justify-center gap-2 border rounded-full px-6 py-3 hover:shadow-md transition">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            className="w-5 h-5"
          />
          <span className="text-sm font-semibold text-gray-700">Masuk dengan Google</span>
        </button>

        <div className="my-6 w-full max-w-sm flex items-center justify-between">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-sm text-gray-400">Atau</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
          <div>
            <h1 className="flex justify-start font-semibold">Nama</h1>
            <input
                type="text"
                placeholder="Masukkan namamu"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className="w-full rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h1 className="flex justify-start font-semibold">Email</h1>
            <input
                type="email"
                placeholder="contoh@gmail.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h1 className="flex justify-start font-semibold">Kata Sandi</h1>
            <input
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="w-full rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-[#003366] text-white rounded-full py-3 font-semibold hover:bg-blue-900 transition"
          >
            Daftar
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
