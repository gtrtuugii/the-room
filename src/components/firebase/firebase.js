// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";

import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7L35MwKZjw3U7ZBfYVJ5tqWjmxhu_uv8",
  authDomain: "the-locker-room-65105.firebaseapp.com",
  projectId: "the-locker-room-65105",
  storageBucket: "the-locker-room-65105.appspot.com",
  messagingSenderId: "633591322475",
  appId: "1:633591322475:web:34f904d7a81679743b5e2e",
  measurementId: "G-MEXCPXRTMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

/*
export const signInWithGoogle = () => {
  signInWithGoogle(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
*/

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const createPost = async () => {};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.code);
    if (error.code === "auth/wrong-password") {
      alert.error("Please check the password");
    }
    if (error.code === "auth/user-not-found") {
      alert.error("Please check the email");
    }
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const createSubCollection = async (user, subCollectionName) => {
  try {
    const userRef = collection(db, "users", user);
    await addDoc(collection(userRef, subCollectionName), {
      TEST: "test1"
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};


const registerWithEmailAndPassword = async (
  email,
  password,
  displayName,
  file
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
     
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => 
                {



                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });

                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: user.uid,
                    authProvider: "local",
                    email,
                    displayName,
                    photoURL: downloadURL,
                    registeredAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    bio: "",
                    favorites: { food: "Pizza", color: "Blue", subject: "recess" }
                  });
                }
                );
            }
            );


  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  createSubCollection
};
