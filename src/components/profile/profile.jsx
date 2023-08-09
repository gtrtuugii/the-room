import React, { useContext } from 'react'
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import "./profile.css";
import Post from "../dashboard/Post";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);


  return (

    <div className="profile">
        <div className="container">
            <div className="header">
                <img src={currentUser?.photoURL} alt="" />
                <div className="user">
                    <h2>{currentUser?.displayName}</h2>
                    <div className="user-info">
                        <span># Posts</span>
                        <span># Comments</span>
                    </div>
                </div>
                
            </div>
            <div className="main-body">
                {"<Post></Post>"}
            </div>
            <div className="footer">
                hello
            </div>
        </div>
    </div>
  )
}

export default Profile