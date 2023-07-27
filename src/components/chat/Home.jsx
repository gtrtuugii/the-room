import React from 'react'

import "./styling/home.css";
import Sidebar from './ChatSideBar';
import Chat from './Chat';

const Home = () => {
  
  
    return (
    
    <div className='home'>
        <div className='container'> 
         <Sidebar/> 
         <Chat/>
        </div>
    </div>
  )
}

export default Home