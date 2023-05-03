// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCHUdXBJS_hUAnuYZxTjg4aSLipR5MGJW4",

  authDomain: "concert-tracker-c2d56.firebaseapp.com",

  projectId: "concert-tracker-c2d56",

  storageBucket: "concert-tracker-c2d56.appspot.com",

  messagingSenderId: "796230945348",

  appId: "1:796230945348:web:8cef441b6035c93076ca11",

  measurementId: "G-K4SRPMRCS1"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);