// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiie0bW7mPBrzB8iKJ_cxCrNUu9dT_3bI",
  authDomain: "candyqueen-4d221.firebaseapp.com",
  projectId: "candyqueen-4d221",
  storageBucket: "candyqueen-4d221.appspot.com",
  messagingSenderId: "197935049652",
  appId: "1:197935049652:web:19bcf136f1bb8caa3d60e1",
  measurementId: "G-6B8XTPZQ3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleAuthProvider).then((data) => {
    return data?.user;
  });