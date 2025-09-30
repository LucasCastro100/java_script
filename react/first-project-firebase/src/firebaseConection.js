import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1TsKCYrx1EwNYJazmgNvogl7bm64JfLs",
    authDomain: "fisrt-project-react.firebaseapp.com",
    projectId: "fisrt-project-react",
    storageBucket: "fisrt-project-react.firebasestorage.app",
    messagingSenderId: "773007037039",
    appId: "1:773007037039:web:469ecd7479704eccab739a",
    measurementId: "G-8D0PE4HHG0"
};

const fisebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fisebaseApp);

export { db };