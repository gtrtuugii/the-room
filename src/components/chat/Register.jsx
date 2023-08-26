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
    const [img, setImg] = useState(null);
    // Auth
    const { currentUser } = useContext(AuthContext);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setImg(selectedFile);
    };



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
        errors.password = 'Password must have at least 8 characters, 1 uppercase letter, and 1 number Hint: You might be using illegal characters "+,.!", for now use a password 8 char long';
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
                        
                        <label id="add-avatar" htmlFor="avatar">

                            {img ? <img src={AddedImage}  alt=""/> : <img src={AddImage}  alt=""/>}
                            
                            <span>Add an avatar</span>
                            
                        </label>

                        {img && <img id="file-preview" src={URL.createObjectURL(img)} alt="Avatar Preview" />}
                       

                        <input className="form-control" id="avatar" onChange={handleFileChange} accept="image/*" type="file"></input>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                          <label className="form-check-label" for="defaultCheck1">
                            By pressing this you agree to our 
                          </label>

                          <span style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Terms and conditions
                          </span>


                          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Terms and Conditions</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                </div>
                                <div className="modal-body">
                                <p>
                                These Terms and Conditions govern your use of The Room provided by Tuguldur Gantumur. By accessing or using the Service, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use the Service.
                                <h3>User Conduct</h3>
                                

                                By using the Service, you agree to abide by all applicable laws and regulations and not to engage in any of the following activities:

                                - Violating any laws or regulations
                                - Posting or transmitting any unauthorized or unsolicited advertising, promotional materials, or any other forms of solicitation
                                - Impersonating any person or entity, or falsely representing your affiliation with a person or entity
                                - Using the Service for any illegal or unauthorized purpose
                                - Uploading or transmitting any harmful code, viruses, or other destructive features

                              <h3>Intellectual Property</h3> 

                                All content, features, and functionality available through the Service, including but not limited to text, graphics, logos, images, and software, are the property of [Your Company Name] and are protected by intellectual property laws.

                                <h3>Limitation of Liability</h3>

                                The Service is provided on an "as is" and "as available" basis without any warranties, express or implied. Tuguldur Gantumur shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the Service.

                                <h3>Indemnification</h3>

                                You agree to defend, indemnify, and hold Tuguldur Gantumur harmless from and against any claims, actions, or demands arising from your use of the Service or violation of these terms.

                                <h3>Termination</h3>

                                We reserve the right to terminate your access to the Service at any time, without notice, for any reason.

                                <h3>Governing Law</h3>

                                These terms shall be governed by and construed in accordance with the laws of Federal Court of Australia. Any legal action or proceeding arising out of or relating to these terms shall be exclusively brought in the courts located in Federal Court of Australia, and you consent to the personal jurisdiction of such courts.

                                </p>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          
   

                        </div>
                        
                        
                       



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

