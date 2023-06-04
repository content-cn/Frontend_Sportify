import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAFRiiDVwbj4h3W_NKAspqIQLHceeYfNA",
  authDomain: "gym-app-3cec3.firebaseapp.com",
  databaseURL:
    "https://gym-app-3cec3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gym-app-3cec3",
  storageBucket: "gym-app-3cec3.appspot.com",
  messagingSenderId: "299867870166",
  appId: "1:299867870166:web:0322384531c936d6778a77",
  measurementId: "G-6BNS9HVR2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
export { db, auth };
