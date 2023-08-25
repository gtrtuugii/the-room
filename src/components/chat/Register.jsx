import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import "./styling/register.css";
import AddImage from "./media/addimgs.svg"
import AddedImage from "./media/checkmark-image.svg"

// Firebase imports
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AuthContext } from '../context/context';

const Register = () => {


    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
      // Auth
    const { currentUser } = useContext(AuthContext);


    // Validation Check for input
    const validateRegistrationInput = async (username, email, password) => {
      const errors = {};

      // Check for illegal usernames or if username is taken
      const illegalUsernames = ['admin', 'root', 'superuser', 'Admin', 'Moderator', 'Root', 'Superuser', 'SuperUser', 'Anonymous', 'Anon' ]; // Initial list

      // Fetch all display names from the Firestore collection 'users'
      const usersCollectionRef = collection(db, 'users'); 
      const querySnapshot = await getDocs(usersCollectionRef);
      const allDisplayNames = querySnapshot.docs.map((doc) => doc.data().displayName);

      // Add allDisplayNames to the illegalUsernames list
      illegalUsernames.push(...allDisplayNames);

      if (illegalUsernames.includes(username)) {
        errors.username = 'Username is not allowed';
      }

      // Check password requirements
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        errors.password = 'Password must have at least 8 characters, 1 uppercase letter, and 1 number Hint: You might be using illegal characters, for now use a password 8 char long';
      }

      // Check valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
      }

      return errors;
      };

      const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
      
        const validationErrors = await validateRegistrationInput(displayName, email, password);
        setErrors(validationErrors);
      
        if (Object.keys(validationErrors).length === 0) {
          try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(res.user);
      
            if (file) {
              // Create a unique image name
              const date = new Date().getTime();
              const storageRef = ref(storage, 'user-profiles/' + `${email + date}`);
        
              await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    // Update profile with photoURL
                    await updateProfile(res.user, {
                      displayName,
                      photoURL: downloadURL,
                    });
      
                    // Create user in the "users" collection
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      authProvider: "local",
                      displayName,
                      email,
                      photoURL: downloadURL,
                    });
      
                    // Create a posts section for the user
                    await setDoc(doc(db, "posts", res.user?.uid), {
        
                    });
      
                    // Create empty user chats in the "userChats" collection
                    await setDoc(doc(db, "userChats", res.user.uid), {});
      
                    // Navigate to the appropriate page
                    navigate('/check-email');
                  } catch (err) {
                    setErr(true);
                    setLoading(false);
                  }
                });
              });
            } else {
              // No profile image provided
              // Update profile without photoURL
              await updateProfile(res.user, {
                displayName,
              });
      
              // Create user in the "users" collection
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                authProvider: "local",
                displayName,
                email,
              });
      
              // Create a posts section for the user
              await setDoc(doc(db, "posts", res.user?.uid), {
        
              });
      
              // Create empty user chats in the "userChats" collection
              await setDoc(doc(db, "userChats", res.user.uid), {});
      
              // Navigate to the appropriate page
              navigate('/check-email');
            }
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        }
      };
          

    // const resendEmail = async()=>{
    //   if (currentUser && !currentUser.emailVerified) {
    //     await sendEmailVerification(currentUser);
    //   }
    // }

    
    useEffect(() => {
      if (loading) return;
      
    
      // Check if the user is logged in and has a valid currentUser object
      if (currentUser && currentUser.emailVerified) {
        navigate("/home");
      }
    }, [currentUser, loading]);
    

    return (
        <div className="register">
            <div className="form-container">
                <div className='form-wrapper'>
                    <span className="logo">Le Qubé</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control" type="text" placeholder="Username" required/>
                        <input className="form-control" type="email" placeholder="E-mail" required/>
                        <input className="form-control" type="password" placeholder="Password" required/>
                        
                        <label htmlFor="avatar">

                            {AddImage ? <img src={AddedImage}  alt=""/> : <img src={AddImage}  alt=""/>}
                            
                            <span>Add an avatar</span>
                        </label>

                        <input className="form-control" id="avatar"  type="file"></input>

                        <button className="btn"> Register </button>
                        {err && <span style={{ color: "red" }}>Something went wrong</span>}
                        {errors.username && <p className="error">{errors.username}</p>}
                        {errors.email && <p className="error">{errors.email}</p>}
                        {errors.password && <p className="error">{errors.password}</p>}
                        {errors.password && <p className="error">{errors.password}</p>}
                        {loading && "Joining the room please wait..."}

                        
                    </form>
                    <p>Have an account? <Link to="/login"> Login </Link> instead.</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Register

