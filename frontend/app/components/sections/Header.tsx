"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Typewriter from "typewriter-effect"

export default function Header() {
  return (
    <div className="mt-15 h-[75%] w-[80%] m-auto">
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-10 font-bold">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 1 }}
          >
            <h2 className="text-white text-3xl">Introducing</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h1 className="text-white text-7xl">
              Sylla
              <span className="bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text">
                Beavs
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.75, duration: 1.5 }}
          >
            <div className="space-y-10">
              <div className="text-white text-3xl">
                <h2 className="">
                  Generate TO-DOs & assignment checklists{" "}
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text">
                    <Typewriter
                      // tag="span"
                      options={{
                        wrapperClassName: "ah-words-wrapper",
                        strings: ["efficiently", "effectively"],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>
                </h2>
                <h2 className="">with the all-new AI syllabus organizer</h2>
              </div>
              <Link href="../generate">
                <button className="group bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full p-[1.5px] hover:cursor-pointer hover:scale-110 hover:from-yellow-500 hover:to-red-500 transition duration-200">
                  <div className="h-full w-full flex items-center justify-center py-3 px-5 rounded-full bg-black">
                    <h2 className="text-white text-xl font-bold">
                      Try it out!
                    </h2>
                    <div className="group-hover:rotate-45 transition duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-5 ml-2 text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
