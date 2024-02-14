// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-mern-estate.firebaseapp.com",
  projectId: "real-mern-estate",
  storageBucket: "real-mern-estate.appspot.com",
  messagingSenderId: "1010297959218",
  appId: "1:1010297959218:web:6f507fbb71d85dc3ee1d2b",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
