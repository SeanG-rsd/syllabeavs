"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../api/firebase/auth";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

interface RegisterProps {
    close: () => void;
    signIn: () => void;
}

const Register: React.FC<RegisterProps> = ({ close, signIn }) => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { userLoggedIn } = useAuth();

    useEffect(() => {
        if (userLoggedIn) {
            router.replace("generate");
        }
    }, [userLoggedIn]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);

            // Optional: add password confirmation check
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match.");
                setIsRegistering(false);
                return;
            }

            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error: any) {
                setErrorMessage(error.message || "Failed to register.");
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 bg-white text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="flex items-center justify-between mt-2">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl w-full text-center">
                            Create a New Account
                        </h3>
                        <div className="hover:scale-105 hover:cursor-pointer transition duration-200">
                            <IoClose
                                onClick={close}
                                size={30}
                                className=" text-black"
                            />
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className="text-red-600 font-bold">
                                {errorMessage}
                            </span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                                isRegistering
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                            }`}
                        >
                            {isRegistering ? "Signing Up..." : "Sign Up"}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account?{" "}
                            <button
                                onClick={signIn}
                                className="text-center text-sm hover:underline font-bold"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
