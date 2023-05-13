// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPUTbnlwisoRdwZwkSncOcMLRN4xOwHH4",
  authDomain: "cociertos-bd-4fd3f.firebaseapp.com",
  databaseURL: "https://cociertos-bd-4fd3f-default-rtdb.firebaseio.com",
  projectId: "cociertos-bd-4fd3f",
  storageBucket: "cociertos-bd-4fd3f.appspot.com",
  messagingSenderId: "535685733357",
  appId: "1:535685733357:web:8f1809d8cd7505873065e4"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//conectar a la base de datosm
export const db = getFirestore(app);