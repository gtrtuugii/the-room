 import React from 'react';
 import "./styling/chatsidebar.css";

 import Search from "./Search";
 import Chats from "./Chats";
 import Navbar from "./Navbar";
 const ChatSideBar = () => {
   return (
    <div className='chatsidebar'>
      
      <Navbar/>
      <Search/>
      <Chats/>
      
    </div>
   )
 }
 
 export default ChatSideBar