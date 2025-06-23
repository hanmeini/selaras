import { useEffect } from 'react';
import { getRedirectResult } from "firebase/auth";
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // login berhasil, arahkan ke halaman rekomendasi
          navigate('/rekomendasi');
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
        navigate('/login'); // kembali ke login jika gagal
      });
  }, [navigate]);

  return <p>Memproses login Google...</p>;
};

export default RedirectHandler;
