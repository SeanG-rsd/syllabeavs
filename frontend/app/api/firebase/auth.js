import { auth } from "./firebase";
import { collection, getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import * as dotenv from 'dotenv';

dotenv.config();

import {
  createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, reauthenticateWithCredential,
  signInWithEmailAndPassword, signInWithPopup, updatePassword, reauthenticateWithPopup, EmailAuthProvider
} from "firebase/auth";

export const connectGoogleCalendar = async () => {
  const CLIENT_ID = "707127499604-5bqcqt8u06ppo3us5sb3b613c7fv8vpp.apps.googleusercontent.com";
  const REDIRECT_URI = "http://localhost:8000/oauth2callback";
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const userUid = auth.currentUser.uid;
  sessionStorage.setItem("firebaseUID", userUid); 
  const userRef = doc(db, "users", userUid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const connected = data?.calendar_tokens?.calendarConnected || false;
    console.log("Calendar connected:", connected);
  } else {
    console.log("No user document found.");
  }

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&access_type=offline&prompt=consent`;
  window.location.href = authUrl;
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userRef = doc(collection(db, 'users'), user.uid);

  const userData = {
    email: user.email,
    displayName: user.displayName || 'Mysterious',
    photoURL: user.photoURL || 'https://example.com/default-photo.jpg',
  };
  await setDoc(userRef, userData);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    //store user data
    const userRef = doc(collection(db, 'users'), user.uid);
    const userData = {
      email: user.email,
      displayName: user.displayName || 'Mysterious',
      photoURL: user.photoURL || 'https://example.com/default-photo.jpg',
    };

    //checks if user alr exists in firestore
    const docSnapshot = await getDoc(userRef);
    if (!docSnapshot.exists()) {
      //user data DNE, store it
      await setDoc(userRef, userData);
    }
  } catch (error) {
    console.error("Error during Google sign in: ", error);
    throw error;
  }

};

//sign out

export const doSignOut = () => {
  return auth.signOut();

}

export const reauthenticateGoogleAndDelete = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user.");

  const provider = new GoogleAuthProvider();

  try {
    await reauthenticateWithPopup(user, provider);
    await user.delete();
    console.log("User account deleted.");
  } catch (error) {
    console.error("Error during Google re-authentication:", error);
    throw error;
  }
};

export const reauthenticateAndDeleteAccount = async (email, password) => {
  const user = auth.currentUser;

  if (!user) throw new Error("No authenticated user.");

  try {
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    await user.delete();
    console.log("User account deleted.");
  } catch (error) {
    console.error("Error during account deletion:", error);
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password.");
    } else if (error.code === "auth/user-mismatch") {
      throw new Error("Re-authentication mismatch.");
    } else if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid credentials.");
    }
    throw error;
  }
};

export const getUserData = async (userUid) => {
  const userRef = doc(db, 'users', userUid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No Data found for user");
    return null;
  }
};

