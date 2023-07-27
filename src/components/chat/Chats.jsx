import React, { useContext, useEffect, useState } from 'react';
import "./styling/chats.css";
import Raccoon from "./media/raccoon-icon.svg";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';


const Chats = () => {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {

    const getChats = () =>{

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
    

      return ()=>{
        unsub();
      };
    };
    currentUser.uid && getChats();
    
  },[currentUser.uid]);

  
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload: u})
  }


  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
              <div className="user-chat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
              {chat[1].userInfo.photoURL ? <img src={chat[1].userInfo.photoURL} alt="" /> : <img src={Raccoon} alt="" /> }
              
              <div className="user-chat-info">
                <span>
                  {chat[1].userInfo.displayName}
                  
                </span>
                {chat[1].lastMessage?.text ? <p className='last-msg'>{chat[1].lastMessage?.text}</p> : <p> Sent a photo.</p>}
                
              </div>
            </div>
      ))}
    </div>
  )
}

export default Chats;