"use client"

import Navigation from "./components/Navigation";
import Header from "./components/sections/Header";
import Signin from "./components/auth/login/index";
import { motion } from "motion/react";

export default function Home() {
  return (
    <section className="w-screen h-screen m-auto absolute inset-0 -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#AF2C00_100%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navigation />
      </motion.div>
      <Header />
      <Signin />
    </section>
  );
}
