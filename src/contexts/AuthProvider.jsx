import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
   const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const signInWithGoogle = ()=>{
    setLoading(true)
    return signInWithPopup (auth ,googleProvider)
  }

  

  const signOutUser = ()=>{
    setLoading(true)
    return signOut(auth);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
    })
    return ()=>{
        unsubscribe()
    }
  },[])

    const authInfo = {
        createUser,
        user,
        loading,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUserProfile
   }
   
    return (
        <AuthContext value={authInfo}>
        {children}
        </AuthContext>
    );
};

export default AuthProvider;