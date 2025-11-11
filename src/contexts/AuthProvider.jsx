import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const signInWithGoogle = ()=>{
    setLoading(true)
    return signInWithPopup (auth ,googleProvider)
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
        signInWithGoogle
   }
   
    return (
        <AuthContext value={authInfo}>
        {children}
        </AuthContext>
    );
};

export default AuthProvider;