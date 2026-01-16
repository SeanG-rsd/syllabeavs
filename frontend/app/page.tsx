"use client";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Signin from "./components/auth/login";
import { motion } from "motion/react";
import { useState } from "react";
import SuggestionModal from "./components/auth/suggestionModal";
import SubscribeModal from "./components/subscription/subscribeModal";

export default function Home() {
  const [suggestionModal, setSuggestionModal] = useState(false);

  const close = () => {
    setSuggestionModal(false);
  }

  return (
    <>
      {suggestionModal ? <SuggestionModal onClose={close}></SuggestionModal> : <div></div>}
      <section className="w-screen h-screen m-auto absolute inset-0 -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#AF2C00_100%)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation />
        </motion.div>
        <Header />

        <SubscribeModal check={true}/>

        <div className="h-[20%] flex justify-end items-end">
          <button
            className="hover:text-orange-400"
            onClick={() => setSuggestionModal(true)}
          >
            Make a suggestion!
          </button>
          {
            /* <p className="mx-1.5"> | </p>
        <a className="hover:text-orange-400" href="/support">
          Privacy
        </a>
        <p className="mx-1.5"> | </p>
        <a className="hover:text-orange-400" href="/support">
          Terms
        </a> */
          }
        </div>
      </section>
    </>
  );
}
