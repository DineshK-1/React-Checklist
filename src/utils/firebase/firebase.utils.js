// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAY1E6F9uNzRrQd6YUsW3g0YSZVlLkct74",
  authDomain: "react-checklist-70787.firebaseapp.com",
  projectId: "react-checklist-70787",
  storageBucket: "react-checklist-70787.appspot.com",
  messagingSenderId: "579663331738",
  appId: "1:579663331738:web:7faa60adc7925082f47a23",
  measurementId: "G-Y3GHHSWZVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})


export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//Create Document In Firestore
export const createUserDocumentFromAuth = async (UserAuth) => {
  const userDocRef = doc(db, 'users', UserAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = UserAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, photoURL, email, createdAt
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
}

export const createUser = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);