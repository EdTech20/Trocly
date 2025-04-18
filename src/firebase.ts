// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATPsRM8UvMfyOWtoXMpXHxiPh9HFKEgjU",
  authDomain: "trocly-281ee.firebaseapp.com",
  projectId: "trocly-281ee",
  storageBucket: "trocly-281ee.firebasestorage.app",
  messagingSenderId: "1091474535232",
  appId: "1:1091474535232:web:6ae0b0ef82a8ffcfc600a5",
  measurementId: "G-KEY1ETQ1H4"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, analytics, auth, db, addDoc, collection}
