"use client";

import {
    connectGoogleCalendar,
    isAlreadyAddedToCalendar,
    isAuthorizedForCalendar,
} from "@/app/api/google/calendar";
import { Assignment } from "@/app/types/assignment";
import { useEffect, useState } from "react";

interface ButtonBarProps {
    currentClass: string;
    currentSyllabus: Assignment[];
}

const ButtonBar: React.FC<ButtonBarProps> = (
    { currentClass, currentSyllabus },
) => {
    const [calendar, setCalendar] = useState(false);
    const [connected, setConnected] = useState(false);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            loadBar();
        }
    });

    const loadBar = async () => {
        var isAdded = await isAlreadyAddedToCalendar(currentClass);
        setCalendar(isAdded);

        var isConnected = await isAuthorizedForCalendar();
        setConnected(isConnected);

        setLoaded(true);
    };

    const addToCalendar = async () => {
        if (loaded) {
            await connectGoogleCalendar(currentSyllabus, currentClass);

            var isAdded = await isAlreadyAddedToCalendar(currentClass);
            setCalendar(isAdded);
        }
    };

    return (
        <div className="ml-4 flex gap-6">
            {/* <button className="flex justify-start">
                <div className="p-2 pl-4 pr-2 bg-white rounded-lg flex gap-2">
                    <p>Export</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                        />
                    </svg>
                </div>
            </button> */}
            <button className="flex justify-start" onClick={addToCalendar}>
                <div className="p-2 pl-4 pr-2 bg-white rounded-lg flex gap-2">
                    <p>
                        {loaded ? !connected
                            ? "Connect Calendar"
                            : (calendar
                                ? "Added to Calendar!"
                                : "Add to Calendar") : "Loading..."}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                    </svg>
                </div>
            </button>
            <div className="flex justify-start">
                <div className="p-2 pl-4 pr-2 bg-white rounded-lg flex gap-3">
                    <p>Notify Me</p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ButtonBar;
