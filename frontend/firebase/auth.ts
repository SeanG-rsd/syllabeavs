import { auth } from "./firebase";
import { collection, getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { db } from './firebase';

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, 
    signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) =>{
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

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
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
    if(!docSnapshot.exists()){
        //user data DNE, store it
        await setDoc(userRef, userData);
    }
    }catch(error){
        console.error("Error during Google sign in: ", error);
        throw error;
    }

};

//sign out

export const doSignOut = () => {
    return auth.signOut();
}

export const getUserData = async (userUid: string) => {
    const userRef = doc(db, 'users', userUid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        return userSnap.data();
    }else{
        console.log("No Data found for user");
        return null;
    }
};

