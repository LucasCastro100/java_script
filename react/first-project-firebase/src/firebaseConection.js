// AQUI VAI FICAR TODA A CONEXÃO COM O FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// AQUI VAI FICAR TODA A PARTE DE AUTENTICAÇÃO
import {getAuth} from "firebase/auth";

// AQUI VAI FICAR TODA A CONFIGURAÇÃO DO FIREBASE
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
const auth = getAuth(fisebaseApp);

export { db, auth };