import React from 'react'

import "./styling/home.css";
import Sidebar from './ChatSideBar';
import Chat from './Chat';

const ChatHome = () => {
  
  
    return (
    
    <div className='home'>
        <div className='container'> 
         <Sidebar/> 
         <Chat/>
        </div>
    </div>
  )
}

export default ChatHome;