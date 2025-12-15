// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See README.md for instructions on how to get these values.
const firebaseConfig = {
    apiKey: "AIzaSyDEwvqwVCfTj5nTzv9HHdmMjDBLLWm0Vko",
    authDomain: "shulov-1e752.firebaseapp.com",
    projectId: "shulov-1e752",
    storageBucket: "shulov-1e752.firebasestorage.app",
    messagingSenderId: "189731365296",
    appId: "1:189731365296:web:28371358a005cd701ef675"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
