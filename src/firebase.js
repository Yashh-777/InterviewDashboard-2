// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKdGTICi9NQI5TfczFpWMeG58o4pM2few",
  authDomain: "dashboard-project-ea50f.firebaseapp.com",
  projectId: "dashboard-project-ea50f",
  storageBucket: "dashboard-project-ea50f.appspot.com",
  messagingSenderId: "887394970054",
  appId: "1:887394970054:web:b0560e363356b1a3516ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);