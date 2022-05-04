// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSIdKuauVFTPsdBGNYQGtEPYuq42lc89A",
    authDomain: "shop-120f8.firebaseapp.com",
    projectId: "shop-120f8",
    storageBucket: "shop-120f8.appspot.com",
    messagingSenderId: "56448227156",
    appId: "1:56448227156:web:03d631921a10c8f69c1ac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;