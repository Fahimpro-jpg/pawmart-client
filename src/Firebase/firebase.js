// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM7wx2vu2OvDeWFaeuw3N927T0v0YNGKI",
  authDomain: "pawmart-713f6.firebaseapp.com",
  projectId: "pawmart-713f6",
  storageBucket: "pawmart-713f6.firebasestorage.app",
  messagingSenderId: "376607301437",
  appId: "1:376607301437:web:96df928e6f79d7eee32f54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);