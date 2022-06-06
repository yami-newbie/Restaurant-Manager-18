// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTQVYCtG03UrL-sg8x0_xb8TZItG2BWaM",
  authDomain: "quanlynhahang-b44c4.firebaseapp.com",
  databaseURL:
    "https://quanlynhahang-b44c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlynhahang-b44c4",
  storageBucket: "quanlynhahang-b44c4.appspot.com",
  messagingSenderId: "993636431615",
  appId: "1:993636431615:web:484d07f53dfb579e02feca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);