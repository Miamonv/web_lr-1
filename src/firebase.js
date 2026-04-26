// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGy-0etu-kTmAsnsbrP-NBnOZ2_VLETAs",
  authDomain: "emberlens-app.firebaseapp.com",
  projectId: "emberlens-app",
  storageBucket: "emberlens-app.firebasestorage.app",
  messagingSenderId: "621442452917",
  appId: "1:621442452917:web:1e57bfc7d4cae5df019dfc",
  measurementId: "G-V49CNHEST2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
