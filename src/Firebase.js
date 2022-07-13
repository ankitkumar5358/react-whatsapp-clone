import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAXh8_2E86GSJsSJg7OK1WwWjl9onXEn60",
  authDomain: "whatsapp-clone-reactjs-5c8e6.firebaseapp.com",
  databaseURL : "https://whatsapp-clone-reactjs-5c8e6-default-rtdb.firebaseio.com/https://whatsapp-clone-reactjs-5c8e6-default-rtdb.firebaseio.com/https://whatsapp-clone-reactjs-5c8e6-default-rtdb.firebaseio.com/",
  projectId: "whatsapp-clone-reactjs-5c8e6",
  storageBucket: "whatsapp-clone-reactjs-5c8e6.appspot.com",
  messagingSenderId: "631957804798",
  appId: "1:631957804798:web:4fcbec71754651f16bb7af",
  measurementId: "G-BVP7QKEX8N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); 
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};

export default db;



// import * as firebase from 'firebase';
// import firebase from "firebase/compat/app";

/*
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
*/