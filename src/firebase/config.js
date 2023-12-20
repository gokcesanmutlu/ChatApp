// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import{getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWcvd80GQc6xqiEr9RtIfCeY8AxTHTi0E",
  authDomain: "chatapp-7f87c.firebaseapp.com",
  projectId: "chatapp-7f87c",
  storageBucket: "chatapp-7f87c.appspot.com",
  messagingSenderId: "798178393493",
  appId: "1:798178393493:web:7f341017c3ef8fffa08a9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// console'daki authentication bölümünün referansını alır 
export const auth = getAuth(app)

// google sağlayıcısının referansını alma // google sağlayıcısının bir örneğini alma // new ile kilidini açma gibi düşünülebilir
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)