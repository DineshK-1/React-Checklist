// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, deleteDoc, orderBy, updateDoc } from 'firebase/firestore'
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
// eslint-disable-next-line
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
// eslint-disable-next-line
const perf = getPerformance(app);

provider.setCustomParameters({
  prompt: "select_account"
})

//Authentication Section
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
  const { user, isLoggedIn } = useContext(UserContext)
  if (isLoggedIn) {
    return await getDoc(doc(db, "users", user.uid))
  }
  return null;
}

export const signOutUser = async () => await signOut(auth);

export const OnAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//Tasks Section

export const CreateTaskInDB = async (name, desc, date, tags) => {
  try {
    await addDoc(collection(db, "tasks"), {
      name: name.current.value,
      description: desc.current.value,
      createdDate: new Date(),
      dueDate: date,
      userID: auth.currentUser.uid,
      tags:tags,

      taskDone: false,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const FetchTaskInDB = async () => {
  try {
    const q = query(collection(db, "tasks"), where("userID", "==", auth.currentUser.uid), orderBy("createdDate"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

export const DeleteTaskInDB = async (ID) => {
  return await deleteDoc(doc(db, "tasks", ID));
}

export const SetTaskStateInDB = async (ID, check) => {
  return await updateDoc(doc(db, "tasks", ID), { taskDone: !check })
}

export const CreateHabitInDB = async (name, desc) => {
  try {
    await addDoc(collection(db, "habits"), {
      name: name.current.value,
      description: desc.current.value,
      createdDate: new Date(),
      userID: auth.currentUser.uid,

      habitDone: false,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const FetchHabitInDB = async () => {
  try {
    const q = query(collection(db, "habits"), where("userID", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    console.log( querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

export const DeleteHabitInDB = async (ID) => {
  return await deleteDoc(doc(db, "habits", ID));
}

export const SetHabitInDB = async (ID, check) => {
  return await updateDoc(doc(db, "habits", ID), { habitDone: !check })
}

