// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

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

export const createUser = async (email, pass) => createUserWithEmailAndPassword(auth, email, pass);

export const createUserDocument = async (userAuth, displayName) => {
  const { user } = userAuth;
  const { email } = user;
  const createdAt = new Date(); const photoURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const userDocRef = doc(db, "users", user.uid);

  try {
    await setDoc(userDocRef, {
      displayName, photoURL, email, createdAt
    })
  } catch (error) {
    console.log(error);
  }
}

//Sign in Methods
export const signInwithAuth = async (email, password) => signInWithEmailAndPassword(auth, email, password);

export const GetDatabaseUserProfile = async () => {
  const { user } = useContext(UserContext)
  if (user != null) {
    return await getDoc(doc(db, "users", user.uid))
  }
  else {
    return;
  }
}

export const signOutUser = async () => await signOut(auth);