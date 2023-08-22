import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import "./post.css";
const Post = ({post}) => {

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
  
    if(!post){
      return null;
    }

  return (
    <div className="post" ref={ref} >
        <div className="card">
              <div className="card-header">
                <img className="user-profile-pic" src={post?.publisherDisplayImg} alt='' />
                
                <div className="user">
                  <span>{" #" + post?.publisherDisplayName}</span>
                  <span id="date">{formatTimeDifference(post.date?.toDate())}</span>

                </div>
              </div>
              
              <div className="card-body">
                
                {post.title && <h4>{post?.title}</h4>}
                <p>{post?.text}</p>
                {post.img && <img src={post?.img} alt="" />}
              </div>
              
              <div className="card-footer">
                <button className='btn-dark'>Like</button>
                <button className='btn-dark'>Comment</button>
              </div>
            </div>
    </div>
  )
}

export default Post