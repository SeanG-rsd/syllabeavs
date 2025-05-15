import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import Signin from "./auth/login";
import Register from "./auth/register";

export default function Navigation() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closeSignIn = () => {
    setShowSignIn(false);
  }

  const openSignIn = () => {
    setShowSignIn(true);
    setShowRegister(false);
  }

  const openRegister = () => {
    setShowRegister(true);
    setShowSignIn(false);
  }

  const closeRegister = () => {
    setShowRegister(false);
  }

  return (
    <div className="w-[90%] m-auto">
      <div className="flex justify-between">
        <Link href="../">
          <div className="flex justify center items-center">
            <img src="/syllabeavs_logo.png" alt="logo" className="h-12" />
            <h1 className="text-slate-100 font-bold text-xl">
              Sylla
              <span className="bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text">
                Beavs
              </span>
            </h1>
          </div>
        </Link>
        <button
          className="hover:cursor-pointer"
          onClick={() => setShowSignIn(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-slate-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        {showRegister && (
          <div className="fixed bg-black/50 min-h-screen w-screen z-10 flex justify-center items-center top-0 left-0 text-white">
          <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ scale: 0 }}
                key="box"
              >
                <Register close={closeRegister} signIn={openSignIn}/>
              </motion.div>
        </div>
        )}
        {showSignIn && (
          <div className="fixed bg-black/50 min-h-screen w-screen z-10 flex justify-center items-center top-0 left-0 text-white">
            <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0 }}
                  key="box"
                >
                  <Signin close={closeSignIn} register={openRegister}/>
                  {/* <div className="absolute top-2 right-2 hover:scale-105 hover:cursor-pointer transition duration-200">
                    <IoClose
                      onClick={() => setShowSignIn(false)}
                      size={30}
                      className="mt-1 mr-1 text-white"
                    />
                  </div> */}
                </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
