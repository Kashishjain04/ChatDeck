import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDyNxDvCMrFdCTNz-h_Ig84dSkq2h5iYXA",
  authDomain: "bahi-book.firebaseapp.com",
  projectId: "bahi-book",
  storageBucket: "bahi-book.appspot.com",
  messagingSenderId: "108109604682",
  appId: "1:108109604682:web:5ef7ffb1a2c7443b6543b3",
  measurementId: "G-6KDQEVSSKK",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
