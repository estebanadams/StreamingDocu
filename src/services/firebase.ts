import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3YZHugWd6YgnzuO_dGa2BH03fXVdSisA",
  authDomain: "dindon-47ee5.firebaseapp.com",
  databaseURL: "https://dindon-47ee5.firebaseio.com",
  projectId: "dindon-47ee5",
  storageBucket: "dindon-47ee5.appspot.com",
  messagingSenderId: "534584229339",
  appId: "1:534584229339:web:a062029a0d1a18be6cfbfe",
  measurementId: "G-4B1YG0DMTW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.database();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signup = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signin = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};
