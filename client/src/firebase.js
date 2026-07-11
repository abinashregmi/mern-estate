// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e4587.firebaseapp.com",
  projectId: "mern-estate-e4587",
  storageBucket: "mern-estate-e4587.firebasestorage.app",
  messagingSenderId: "603467297516",
  appId: "1:603467297516:web:e0f007785865def7ecabc9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
