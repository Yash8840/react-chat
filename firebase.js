import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyABGtd-GoUG8o_N116q3-FOhJIVq21GvfE",
  authDomain: "chat-621a7.firebaseapp.com",
  projectId: "chat-621a7",
  storageBucket: "chat-621a7.appspot.com",
  messagingSenderId: "186769486666",
  appId: "1:186769486666:web:0787b13104ba3eb59207b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();