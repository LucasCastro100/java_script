
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMVIGx-8NWInwC-NtrykW1cdVdVQZ6918",
  authDomain: "link-tree-eaee3.firebaseapp.com",
  projectId: "link-tree-eaee3",
  storageBucket: "link-tree-eaee3.firebasestorage.app",
  messagingSenderId: "719982403595",
  appId: "1:719982403595:web:e86e423a96d7f257f8670e",
  measurementId: "G-6CVSLJ5K6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}