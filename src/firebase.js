import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// 使用你的 Firebase 設定
const firebaseConfig = {
    apiKey: "AIzaSyBmzIjGo15d_hm90W5EXj-Bs_eh3FcDRPQ",
    authDomain: "my-port-comment.firebaseapp.com",
    projectId: "my-port-comment",
    storageBucket: "my-port-comment.firebasestorage.app",
    messagingSenderId: "362747889736",
    appId: "1:362747889736:web:5705fdd2c9b6dc81cfb07d",
    measurementId: "G-8MN6BMEYK2"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, collection, addDoc, getDocs, doc, setDoc, deleteDoc, getDoc,
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };