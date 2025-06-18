import React, { useContext, useState, useEffect } from 'react';
import { signOut ,onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config"; // Sesuaikan path

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // LOG 1: Cek apakah user terdeteksi
        console.log("AuthContext: User terdeteksi, UID:", user.uid);
        
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // LOG 2: Jika dokumen profil ditemukan
          console.log("AuthContext: Dokumen profil DITEMUKAN!", docSnap.data());
          setUserProfile({ uid: user.uid, ...docSnap.data() });
        } else {
          // LOG 3: Jika dokumen profil TIDAK ditemukan
          console.error("AuthContext: FATAL! Dokumen profil TIDAK DITEMUKAN di Firestore untuk user ini.");
          setUserProfile(user); // Fallback ke data auth dasar
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userProfile,
    loading,
    logout, 
  };

  // PENTING: Jangan render apapun sebelum proses loading selesai
  // Ini adalah kunci untuk mencegah "race condition"
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}