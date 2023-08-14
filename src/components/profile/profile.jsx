import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import "./profile.css";
import Post from "../dashboard/Post";
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db, storage } from "../firebase/firebase";

import EditProfile from "./EditProfile"

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editPopupVisible, setEditPopupVisible] = useState(false); // State to control the popup
    const [activeSection, setActiveSection] = useState('posts'); // Initial active section


    const handleSectionChange = (section) => {
      setActiveSection(section);
    };

    const handleEditClick = () => {
      setEditPopupVisible(true);
    };


    useEffect(() => {
      let unsubscribe; // Declare a variable to hold the unsubscribe function
  
      if (currentUser) {
        const docRef = doc(db, 'posts', currentUser.uid);
        
        // Set up the onSnapshot listener and assign the unsubscribe function
        unsubscribe = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setPosts(doc.data()?.posts);
            setIsLoading(false);
          }
        });
      }
  
      return () => {
        // Unsubscribe from the listener when the component unmounts
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [currentUser]);
      
      
      return (
        <div className="profile">
          <div className="container">
            <div className="header">
              <img src={currentUser?.photoURL} alt="" />
              <div className="user">
                <h2>{currentUser?.displayName}</h2>
                <div className="user-info">
                  <span> {posts?.length ? posts.length : 0} Posts </span>
                  <span> # Friends </span>
                  <span> # Likes </span>
                </div>
                <div className="profile-buttons">
                  
                    <button id="edit-btn" onClick={() => setEditPopupVisible(true)} className='btn-dark'>Edit Profile</button>
                    <button id="share-btn" className='btn-dark'>Share Profile</button>
                 
                </div>
              </div>
            </div>
            {/* Conditional rendering for EditProfile popup */}
            {/* Conditional rendering for EditProfile popup */}
            {editPopupVisible && (
              <EditProfile trigger={editPopupVisible} setTrigger={setEditPopupVisible} currentUser={currentUser} />
            )}
            <div className="main-body">
              <div className="main-body-selection">
                <h1 onClick={() => handleSectionChange('posts')}>Your Posts</h1>
                <h1 onClick={() => handleSectionChange('liked')}>Your Liked Posts</h1>
              </div>
                    
                {/* Conditional rendering based on activeSection */}
                {activeSection === 'posts' ? (
                  Array.isArray(posts) && posts.length > 0 ? (
                    posts.slice().sort((a, b) => b.date - a.date).map((post, index) => (
                      <Post key={`post_${index}`} post={post} />
                    ))
                  ) : (
                    <div className="no-posts">
                      <p>You have no posts yet.</p>
                    </div>
                  )
                ) : (
                  activeSection === 'liked' && <h3>Coming Soon</h3>
                )}




      


            </div>
      

          </div>
        </div>
      );
      
}

export default Profile