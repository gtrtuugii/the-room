import React, { useContext, useEffect, useRef } from 'react'
import "./styling/message.css";
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import { Timestamp} from 'firebase/firestore';
const Message = ({message}) => {


  const {currentUser} =  useContext(AuthContext);
  const {data} =  useContext(ChatContext);
  const ref = useRef();

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="message-info">
        <img 
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
          alt="" 
        />
      </div>

      <div className="message-content">
        
        {message.text  ? <p>{message.text}</p> : <div className='empty-msg'></div>}
        {message.img && <img src={message.img} alt="" />}


        {/* To do: calculate date and time from now() */}
        {(message.text || message.img) &&  
        <span className='time'>{
          
          message.date.toDate().toLocaleDateString() === Timestamp.now().toDate().toLocaleDateString() 
          ? <span> {message.date.toDate().toLocaleTimeString()} </span> 
          : <span> {message.date.toDate().toLocaleDateString() + ' ' + message.date.toDate().toLocaleTimeString()}</span>}

        </span> }
       
        
      </div>
    </div>
  )
}

export default Message