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

  return (
     
      <div className='chatnavbar'>

        <div className="user">
          <img src={currentUser.photoURL} alt=""/>
          <span className='user-name'> {currentUser.displayName} </span>
          <div className="power-button">
            <img className='power' onClick={()=> signOut(auth)} src={Power} alt=''/>
            <span class="tooltiptext">Sign out</span>
          </div>
        </div>
      </div>


      
   

    
  )
}

export default Navbar;  