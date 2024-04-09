// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnGSavtldMo8DKSKSPD1nV8QxYJ9nHpPs",
  authDomain: "android-firebase-2c2c8.firebaseapp.com",
  projectId: "android-firebase-2c2c8",
  storageBucket: "android-firebase-2c2c8.appspot.com",
  messagingSenderId: "561559533183",
  appId: "1:561559533183:web:2c6feec74d304b3e1ab14a",
  measurementId: "G-TPEZKS4Z4G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
