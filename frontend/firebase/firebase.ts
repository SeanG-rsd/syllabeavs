// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGgG0RL35HpgYSYaF2ZK7ugcIx3NMZ9UI",
  authDomain: "syllabeavs.firebaseapp.com",
  projectId: "syllabeavs",
  storageBucket: "syllabeavs.firebasestorage.app",
  messagingSenderId: "705685253990",
  appId: "1:705685253990:web:b3044bea5eb00d4c2ca2a7",
  measurementId: "G-0711JX5N30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

