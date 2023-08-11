// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkMRv_GfoHE0t7IoWVaVg_-P9bmHMECvU",
    authDomain: "pomodoro-8ceee.firebaseapp.com",
    projectId: "pomodoro-8ceee",
    storageBucket: "pomodoro-8ceee.appspot.com",
    messagingSenderId: "2644123256",
    appId: "1:2644123256:web:e50239e31c96736064d78d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }