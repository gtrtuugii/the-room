import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import "./styling/register.css";
import AddImage from "./media/addimgs.svg"

// Firebase imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from '../context/context';

const Register = () => {


    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

      // Auth
    const { currentUser } = useContext(AuthContext);
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
  
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, 'user-profiles/' + `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                authProvider: "local",
                displayName,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "posts", res.user?.displayName), {

              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/home");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };

    
    useEffect(() => {
      if (loading) return;
      if(currentUser) navigate("/home");
    },[currentUser, loading]);

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
                            <img src={AddImage} alt="add-img" />
                            <span>Add an avatar</span>
                        </label>

                        <input className="form-control" id="avatar"  type="file"></input>

                        <button className="btn"> Register </button>
                        {loading && "Uploading and compressing the image please wait..."}
                        {err && <span style={{ color: "red" }}>Something went wrong</span>}
                    </form>
                    <p>Have an account? <Link to="/login"> Login </Link> instead.</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Register