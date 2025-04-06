"use client"
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from '../../firebase/auth';
//import { initializeApp } from "firebase/app";

const AuthContext = React.createContext();

//use auth hook, so we can use it later
export function useAuth(){
    return useContext(AuthContext);
}

async function initializeUser(user){
    if(user){
        const userData =await getUserData(user.uid);
        setCurrentUser({
            ...user,
            ...userData
        });
        setUserLoggedIn(true);
    }else{
        setCurrentUser(null);
        setUserLoggedIn(false);
    }
    setLoading(false);
}

export function AuthProvider({ children }){
    //when user login, current user data is set in "currentUser"
    const [currentUser, setCurrentUser] = useState(null);
    //if the the user logged in 'userLoggedIn' is set to true else it's defualt val -> false
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    //'loading' is true when code is trying to load current auth state of users in progress
    const [loading, setLoading] = useState(true);

    //when auth state is changed: user logins in or out

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    },[])

    async function initializeUser(user){
        if(user){
            setCurrentUser({  ...user });
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }
    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
