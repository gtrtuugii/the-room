import React, { useContext, useEffect, useRef } from 'react'
import "./styling/message.css";
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import { Timestamp} from 'firebase/firestore';
const Message = ({message}) => {


  const {currentUser} =  useContext(AuthContext);
  const {data} =  useContext(ChatContext);
  const ref = useRef();

  // Function to format time difference
  function formatTimeDifference(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // Difference in seconds
  
        if (diff < 60) {
          return `${diff} seconds ago`;
        } else if (diff < 3600) {
          const minutes = Math.floor(diff / 60);
          return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diff < 86400) {
          const hours = Math.floor(diff / 3600);
          return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diff < 604800) {
          const days = Math.floor(diff / 86400);
          return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } 
        else {
          // Display full date without the year
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString('en-US', options);
        }
  }
    

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
        <span className='time'>
          {
          formatTimeDifference(message.date?.toDate())

         }
         </span>}
       
        
      </div>
    </div>
  )
}

export default Message