import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config"; 

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          console.log("Mencoba mengambil/membuat dokumen untuk UID:", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Dokumen ditemukan, mengambil profil.");
            setUserProfile({
              uid: user.uid,
              photoURL: user.photoURL,
              ...docSnap.data()
            });
          } else {
            console.log("Dokumen tidak ditemukan, membuat profil baru...");
            const newUserProfile = {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: "user",
            };
            await setDoc(docRef, newUserProfile);
            console.log("Profil baru berhasil dibuat di Firestore.");
            setUserProfile({
              uid: user.uid,
              ...newUserProfile
            });
          }
        } catch (error) {
          console.error("AuthContext GAGAL berinteraksi dengan Firestore!", error);
          setUserProfile(user);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const refreshUserProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("Memperbarui profil dari Firestore...");
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile({
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          ...docSnap.data()
        });
        console.log("Profil berhasil diperbarui di state.");
      }
    }
  };

  const value = {
    userProfile,
    loading,
    logout,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}