// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDG7ceTTrncnHqedKk2lVlvuZuukMJcT4c",
  authDomain: "familydirectory-f57d5.firebaseapp.com",
  databaseURL: "https://familydirectory-f57d5-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Correct region
  projectId: "familydirectory-f57d5",
  storageBucket: "familydirectory-f57d5.appspot.com",
  messagingSenderId: "237534249037",
  appId: "1:237534249037:web:e6093a23b964b720689c04",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { auth, provider, signInWithPopup, signOut, db, ref, set, get };
