// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9eZ8q8rc2FiKMHFYUFDAAlTq0cmMSU6I",
  authDomain: "syllabeavs-f8259.firebaseapp.com",
  projectId: "syllabeavs-f8259",
  storageBucket: "syllabeavs-f8259.firebasestorage.app",
  messagingSenderId: "270874866173",
  appId: "1:270874866173:web:534a5041d751e158b96994",
  measurementId: "G-7LYW1N8KD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db };

