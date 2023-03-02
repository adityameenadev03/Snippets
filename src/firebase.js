// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,getDoc ,addDoc,writeBatch} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3PTCcpjYWe8vclHMAMgxy4wLVCEvBeMs",
  authDomain: "snippty-30a2c.firebaseapp.com",
  projectId: "snippty-30a2c",
  storageBucket: "snippty-30a2c.appspot.com",
  messagingSenderId: "489169726993",
  appId: "1:489169726993:web:c8813c55607210ed11cbb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const  auth = getAuth(app);
export {db,collection,getDocs, getDoc, addDoc , writeBatch} 
export default auth