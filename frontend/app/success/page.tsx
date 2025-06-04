"use client";

import { useEffect } from "react";

const SuccessPage = () => {
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        const uid = sessionStorage.getItem("firebaseUID");

        console.log("code:", code);
        console.log("uid:", uid);

        if (code && uid) {
            console.log("HERE");

            fetch("http://localhost:8000/store_google_tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, code }),
            })
                .then(() => {
                    window.location.href = "/generate";
                })
                .catch(console.error);
        }
    });

    return <p>Connecting your Google Tasks...</p>;
};

export default SuccessPage;
