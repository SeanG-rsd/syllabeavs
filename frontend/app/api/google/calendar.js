import * as dotenv from 'dotenv';
import { auth } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { userInfo } from 'os';

dotenv.config();

export const connectGoogleCalendar = async (assignments, currentClass) => {

    const authorized = await isAuthorizedForCalendar();

    const userUid = auth.currentUser.uid;

    if (!authorized) {

        const CLIENT_ID = "707127499604-5bqcqt8u06ppo3us5sb3b613c7fv8vpp.apps.googleusercontent.com";
        const REDIRECT_URI = "http://localhost:8000/oauth2callback";
        const SCOPES = ["https://www.googleapis.com/auth/tasks", "https://www.googleapis.com/auth/sheets"];

        sessionStorage.setItem("firebaseUID", userUid);

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES[0]}&access_type=offline&prompt=consent`;
        window.location.href = authUrl;
    } else {

        console.log("Add Events");

        const user = auth.currentUser;
        if (!user) {
            console.error("Not signed in");
            return;
        }

        const token = await user.getIdToken();

        const isAdded = await isAlreadyAddedToCalendar(currentClass);

        if (!isAdded) {

            console.log("ADD TASKS");
            await fetch("http://localhost:8000/add_events", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assignments: assignments, class: currentClass })
            });
        }

    }
};

export const isAlreadyAddedToCalendar = async (className) => {
    const user = auth.currentUser;

    if (!user) {
        console.error("User not authenticated.");
        return true;
    }

    const userUid = user.uid;

    const syllabusRef = doc(db, "users", userUid, "syllabi", className);
    const syllabusSnap = await getDoc(syllabusRef);

    if (!syllabusSnap.exists()) {
        console.warn(`Syllabus ${className} does not exist for user ${userUid}`);
        return true;
    }

    return syllabusSnap.data()["addedToCalendar"] ?? true;
};

export const isAuthorizedForCalendar = async () => {

    const userUid = auth.currentUser.uid;
    const userRef = doc(db, "users", userUid);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const data = userSnap.data();
        const connected = data?.calendar_tokens?.calendarConnected || false;
        console.log("Calendar connected:", connected);
        return connected;
    } else {
        console.log("No user document found.");

        return false;
    }
}

// export const connectGoogleSheets = async (assignments, currentClass) => {

//     const authorized = await isAuthorizedForCalendar();

//     const userUid = auth.currentUser.uid;

//     if (!authorized) {

//         const CLIENT_ID = "707127499604-5bqcqt8u06ppo3us5sb3b613c7fv8vpp.apps.googleusercontent.com";
//         const REDIRECT_URI = "http://localhost:8000/oauth2callback";
//         const SCOPES = ["https://www.googleapis.com/auth/tasks", "https://www.googleapis.com/auth/sheets"];

//         sessionStorage.setItem("firebaseUID", userUid);

//         const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES[0]}&access_type=offline&prompt=consent`;
//         window.location.href = authUrl;
//     } else {

//         console.log("Add Events");

//         const user = auth.currentUser;
//         if (!user) {
//             console.error("Not signed in");
//             return;
//         }

//         const token = await user.getIdToken();

//         const isAdded = await isAlreadyAddedToCalendar(currentClass);

//         if (!isAdded) {

//             console.log("ADD TASKS");
//             await fetch("http://localhost:8000/add_events", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ assignments: assignments, class: currentClass })
//             });
//         }

//     }
// };

// export const isAlreadyAddedToSheets = async (className) => {
//     const user = auth.currentUser;

//     if (!user) {
//         console.error("User not authenticated.");
//         return true;
//     }

//     const userUid = user.uid;

//     const syllabusRef = doc(db, "users", userUid, "syllabi", className);
//     const syllabusSnap = await getDoc(syllabusRef);

//     if (!syllabusSnap.exists()) {
//         console.warn(`Syllabus ${className} does not exist for user ${userUid}`);
//         return true;
//     }

//     return syllabusSnap.data()["addedToSheets"] ?? true;
// };

// export const isAuthorizedForSheets = async () => {

//     const userUid = auth.currentUser.uid;
//     const userRef = doc(db, "users", userUid);

//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//         const data = userSnap.data();
//         const connected = data?.sheets_tokens?.sheetsConnected || false;
//         console.log("Sheets connected:", connected);
//         return connected;
//     } else {
//         console.log("No user document found.");

//         return false;
//     }
// }