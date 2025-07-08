// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZF8inkf61AEQfK3hzp_CrxHKDE_pPH6c",
  authDomain: "congressional-app-7fd62.firebaseapp.com",
  databaseURL: "https://congressional-app-7fd62-default-rtdb.firebaseio.com",
  projectId: "congressional-app-7fd62",
  storageBucket: "congressional-app-7fd62.firebasestorage.app",
  messagingSenderId: "940249466643",
  appId: "1:940249466643:web:2da4d2930cfe1f5e303ce6",
  measurementId: "G-YSHL4YESCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };