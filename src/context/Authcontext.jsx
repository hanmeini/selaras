import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Impor getDoc dan setDoc
import { auth, db } from "../../firebase-config"; // Pastikan db juga diimpor

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
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile({
            uid: user.uid,
            photoURL: user.photoURL, 
            ...docSnap.data()
          });
        } else {

          const newUserProfile = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user", 
          };

          await setDoc(docRef, newUserProfile);

          setUserProfile({
            uid: user.uid,
            ...newUserProfile
          });
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

  const value = {
    userProfile,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}