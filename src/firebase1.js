// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app =  firebase.initializeApp ({
  apiKey: "AIzaSyCDmMvxSx3IGZzkQhqiDA6MuaofJw5g6y4",
  authDomain: "interview-dashboard-369516.firebaseapp.com",
  projectId: "interview-dashboard-369516",
  storageBucket: "interview-dashboard-369516.appspot.com",
  messagingSenderId: "819179062308",
  appId: "1:819179062308:web:38cdfe42dcce3a5ff4c4b1"
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const auth = app.auth()
export default app;