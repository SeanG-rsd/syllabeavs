"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword, doSignOut } from "../../api/firebase/auth";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { auth } from "@/app/api/firebase/firebase";

interface ProfileProps {
    close: () => void;
    signIn: () => void;
}

const Profile: React.FC<ProfileProps> = ({ close, signIn }) => {
    const router = useRouter();

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    const { userLoggedIn } = useAuth();

    useEffect(() => {
        if (userLoggedIn) {
            router.replace("generate");
        }
    }, [userLoggedIn]);

    const onSignOut = () => {
        doSignOut();
        router.replace("/");
    };

    const onDeleteAccount = async () => {
    };

    return (
        <>
            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 bg-white text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="flex items-center justify-between mt-2">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl w-full text-center">
                            Welcome Back!
                        </h3>
                        <div className="hover:scale-105 hover:cursor-pointer transition duration-200">
                            <IoClose
                                onClick={close}
                                size={30}
                                className=" text-black"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-around py-4">
                        <label className="text-lg text-center text-gray-600 font-bold">
                            Email:
                        </label>
                        <h1 className="text-lg text-center text-gray-600 bg-transparent">
                            {auth.currentUser?.email}
                        </h1>
                    </div>
                    <button
                        onClick={onSignOut}
                        disabled={isSigningOut}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                            isSigningOut
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                        }`}
                    >
                        {isSigningOut ? "Signing Out..." : "Sign Out"}
                    </button>
                    <button
                        type="submit"
                        disabled={isDeletingAccount}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                            isDeletingAccount
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                        }`}
                    >
                        {isDeletingAccount
                            ? "Deleting Account..."
                            : "Delete Account"}
                    </button>
                </div>
            </main>
        </>
    );
};

export default Profile;
