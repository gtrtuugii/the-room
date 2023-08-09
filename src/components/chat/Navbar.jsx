import React, { useContext, useState } from 'react'
import "./styling/navbar.css";
import Cube from "./media/cube.svg";
import Power from "./media/power.svg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../context/context';


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
      isOpen === true ? setIsopen(false) : setIsopen(true);
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Clear any other necessary data or states related to the user session
      // Redirect the user to the appropriate page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
     
      <div className='chatnavbar'>
        <div className="user">         
            <img src={currentUser?.photoURL} alt=""/>
            <span className='user-name'> {currentUser?.displayName} </span>
        </div>
        <div className="user-right">
            <div className="power-button" onClick={handleLogout}>
              <img className='power'  src={Power} alt=''/>
              <span className="tooltiptext" >Sign out</span>
            </div>
        </div>
      </div>


      
   

    
  )
}

export default Navbar;  