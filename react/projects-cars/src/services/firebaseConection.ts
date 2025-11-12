
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDBsC7c2NuKJGSA_OLJxOAEBAvbuy0FNjs",
  authDomain: "dev-cars-ac813.firebaseapp.com",
  projectId: "dev-cars-ac813",
  storageBucket: "dev-cars-ac813.firebasestorage.app",
  messagingSenderId: "995810568693",
  appId: "1:995810568693:web:50bbbc27d2e6982b8e58bc"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}