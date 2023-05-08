import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJuEP9LJrS_JeHn-sZwxeGI_FydaPLYeg",
  authDomain: "pumppeak-45b4c.firebaseapp.com",
  projectId: "pumppeak-45b4c",
  storageBucket: "pumppeak-45b4c.appspot.com",
  messagingSenderId: "229125409024",
  appId: "1:229125409024:web:64f8de23939294001a0be5",
  measurementId: "G-D3TYMPG1MF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
