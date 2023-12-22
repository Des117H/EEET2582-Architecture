import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZ52ZecgR_HY-AJ5oSisUdm2SPhoYEZ40",
  authDomain: "architecture-grandma-bea3b.firebaseapp.com",
  databaseURL:
    "https://architecture-grandma-bea3b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "architecture-grandma-bea3b",
  storageBucket: "architecture-grandma-bea3b.appspot.com",
  messagingSenderId: "390073017040",
  appId: "1:390073017040:web:0ce22fda1c9c80d2c3f4d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

//   onAuthStateChanged(auth, user =>{
//     if(user != null) {
//         console.log('logged in!');
//     }
//     else {
//         console.log("No user");
//     }
//   })
