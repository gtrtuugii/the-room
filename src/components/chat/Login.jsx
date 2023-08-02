import React, { useState, useEffect, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./styling/login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../context/context';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // Auth
  const { currentUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    } catch (err) {
      setErr(true);
    }
  };



  useEffect(() => {
    if(currentUser) navigate("/home")
  },[currentUser]);


  return (
    <div className='login'>
      <div className="form-container">
        <div className='form-wrapper'>
            <span className="logo">Le Qubé</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="email" placeholder="Email" required/>
                <input className="form-control" type="password" placeholder="Password" required/>
                <button className="btn"> Login </button>
            </form>
           
            {err && <span style={{ color: "red" }}>Something went wrong</span>}
            <p>Don't have an account? <Link to="/register">Register.</Link></p>
        </div>
    </div>
  </div>
  )
}

export default Login