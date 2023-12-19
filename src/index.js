import {
    initializeApp

} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCZ52ZecgR_HY-AJ5oSisUdm2SPhoYEZ40",
    authDomain: "architecture-grandma-bea3b.firebaseapp.com",
    databaseURL: "https://architecture-grandma-bea3b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "architecture-grandma-bea3b",
    storageBucket: "architecture-grandma-bea3b.appspot.com",
    messagingSenderId: "390073017040",
    appId: "1:390073017040:web:0ce22fda1c9c80d2c3f4d5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);