import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUlSzXQBiD__aikLtIkrJ650opusp0_QA",
  authDomain: "task-ed03d.firebaseapp.com",
  projectId: "task-ed03d",
  storageBucket: "task-ed03d.firebasestorage.app",
  messagingSenderId: "374519193366",
  appId: "1:374519193366:web:bfac605b422a2065d3ba37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }