import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import "./post.css";
const Post = ({post}) => {

    const {currentUser} =  useContext(AuthContext);
    const {data} =  useContext(ChatContext);
    const ref = useRef();
  

  return (
    <div className="post" ref={ref} >
        <div className="card">
              <div className="card-header">
                <img className="user-profile-pic" src={post.publisherDisplayImg} alt='' />
                <span>{" #" + post.publisherDisplayName}</span>
                
              </div>
              <div className="card-body">
                
                {post.title && <h4>{post.title}</h4>}
                <p>{post.text}</p>
                {post.img && <img src={post.img} alt="" />}
              </div>
              
              <div className="card-footer">
                <span> {post.date.toDate().toLocaleDateString() + ' ' + post.date.toDate().toLocaleTimeString()}</span>
              </div>
            </div>
    </div>
  )
}

export default Post