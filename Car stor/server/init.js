// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "firebase api key",
  authDomain: "care-store-9dfbc.firebaseapp.com",
  projectId: "care-store-9dfbc",
  storageBucket: "care-store-9dfbc.firebasestorage.app",
  messagingSenderId: "***************",
  appId: "*************************"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;