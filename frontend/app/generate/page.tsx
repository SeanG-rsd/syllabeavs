"use client";

import Image from "next/image";
import { useState } from "react";
import Generate from "../components/sections/Generate";
import Navigation from "../components/Navigation";

export default function Home() {
  const [response, setResponse] = useState("");

  const [syllabus, setSyllabus] = useState("");

  const sendPlainText = async () => {
    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: 'Test File',
    });

    const data = await res.json();

    setResponse(data.message);
  };

  const parseSyllabus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    if (file != null) {
      formData.append("file", file);
    } else {
      return;
    }

    console.log("HERE");

    try {
      const response = await fetch('http://localhost:8000/input', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <section className="flex w-screen h-screen bg-[#292929]">
      <Generate />
    </section>
  );
}
