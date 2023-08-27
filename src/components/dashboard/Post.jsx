import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/context';
import { ChatContext } from '../context/ChatContext';
import "./post.css";
import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const DeleteConfirmationPopup = ({ onDelete, onCancel }) => {


  return (
    <div className="delete-popup">
      <p style={{ color: 'red' }}>Are you sure you want to delete this post?</p>
      <button style={{ marginRight: "5px", color: 'red', border: 'none', backgroundColor: "#282A3A", borderRadius: "5px" }} onClick={onDelete}>Delete</button>
      <button style={{ color: "white", border: 'none', backgroundColor: "#282A3A", borderRadius: "5px" }}onClick={onCancel}>Cancel</button>
    </div>
  );
};

const Post = ({post}) => {

    const {currentUser} =  useContext(AuthContext);
    const {data} =  useContext(ChatContext);
    const ref = useRef();
    //const [isLiked, setIsLiked] = useState(post.likedBy?.includes(currentUser.displayName));
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
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

    const handleLike = async (postId) => {
      try {
        const userPostRef = doc(db, 'posts', post.publisherId); // Use post.publisherId
        const userPostSnapshot = await getDoc(userPostRef);
        const userData = userPostSnapshot.data();
    
        // Find the post with the given postId and update its likedBy field
        const updatedPosts = userData.posts.map((post) => {
          if (post.id === postId) {
            const updatedLikedBy = { ...post.likedBy };
    
            // If the user has already liked the post, remove the like
            if (updatedLikedBy[currentUser.uid]) {
              delete updatedLikedBy[currentUser.uid];
            } else {
              updatedLikedBy[currentUser.uid] = currentUser.displayName;
            }
    
            return { ...post, likedBy: updatedLikedBy };
          }
          return post;
        });
    
        // Update the user's posts array with the updated likedBy field
        await updateDoc(userPostRef, { posts: updatedPosts });
    
        console.log('Post liked/unliked successfully');
      } catch (error) {
        console.error('Error liking/unliking post:', error);
      }
    };


    const handleComment = async (postId) => {
      if (!newComment.trim()) {
        return; // Prevent empty comments
      }
  
      try {
        const userPostRef = doc(db, 'posts', post.publisherId);
        const userPostSnapshot = await getDoc(userPostRef);
        const userData = userPostSnapshot.data();
  
        // Find the post with the given postId and add the new comment
        const updatedPosts = userData.posts.map((post) => {
          if (post.id === postId) {
            const updatedComments = { ...post.comments }; // Copy existing comments
            const commentId = new Date().toISOString(); // Create a unique comment ID
            updatedComments[commentId] = {
              comment_text: newComment,
              comment_publisherId: currentUser.uid,
              comment_publisherDisplayName: currentUser.displayName,
              comment_publisherPhotoURL: currentUser.photoURL,
              comment_date: Timestamp.now(),
            };
            return { ...post, comments: updatedComments };
          }
          return post;
        });
  
        // Update the user's posts array with the updated comments
        await updateDoc(userPostRef, { posts: updatedPosts });
  
        // Clear the new comment input
        setNewComment('');
  
        console.log('Comment added successfully');
      } catch (error) {
        console.error('Error adding comment:', error);
      }

      // Clear the new comment input
      setNewComment('');
    };

    const handleDeletePost = async (postId) => {
      try {
        const postRef = doc(db, 'posts', currentUser.uid);
        const postSnapshot = await getDoc(postRef);
        const userData = postSnapshot.data();
    
        // Filter out the post to be deleted
        const updatedPosts = userData.posts.filter((post) => post.id !== postId);
    
        // Update the user's posts array without the deleted post
        await updateDoc(postRef, { posts: updatedPosts });
    
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };
    
    

    const getLikeCount = (post) => {
      return Object.keys(post.likedBy || {}).length;
    };

    const getCommentCount = (post) => {
      return Object.keys(post.comments || {}).length;
    };

    const isLiked = (post) => {
      return post.likedBy && currentUser.uid in post.likedBy;
    };
    const toggleComments = () => {
      setShowComments(!showComments);
    };

      // handler for send 
    const handleKey = e =>{
      e.code === "Enter" && handleComment(post.id);
    };

  return (
    <div className="post" ref={ref} >
        <div className="card">
              <div className="card-header">
                <div className="user-info">
                  <img className="user-profile-pic" src={post?.publisherDisplayImg} alt='' />
           
                  <div className="user">
                    <span>{" #" + post?.publisherDisplayName}</span>
                    <span id="date">{formatTimeDifference(post.date?.toDate())}</span>
                  </div>
                </div>

                {/* 
                  {post.publisherId === currentUser.uid ?
                    <div className="del">
                      <button onClick={() => setShowDeletePopup(true)} title="Delete post"className='btn-dark'>X</button>
                    </div>
                    : ""
                  } */}

                  {/* {showDeletePopup && (
                    <DeleteConfirmationPopup
                      onDelete={() => {
                        handleDeletePost(post.id);
                        setShowDeletePopup(false); // Close the popup
                      }}
                      onCancel={() => setShowDeletePopup(false)}
                    />
                  )}   */}

                  {/* This doesnt work because currentUser is auth and has no role property */}
                {(post.publisherId === currentUser.uid || currentUser?.role === "admin" )   ? 
                  <div className="delete-post">
                    <button className="btn-dark" style={{cursor: "pointer", borderRadius: "5px", border:"none"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                      X
                    </button>
                    <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header" style={{backgroundColor:"#282A3A"}}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete post</h1>
                            <button type="button" style={{backgroundColor: "#3c3f57" , borderRadius: "50%"}} className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                          </div>
                          <div className="modal-body" style={{backgroundColor:"#3c3f57"}}>
                            <span style={{color: "red", border : "none"}}> Are you sure you want to delete this post?</span>
                          </div>
                          <div className="modal-footer" style={{backgroundColor:"#282A3A"}}>
                            <button type="button" style={{backgroundColor:"#3c3f57", color : "red"}} className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleDeletePost(post.id)} >Delete</button>
                            <button type="button"  style={{backgroundColor:"#3c3f57"}} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""
                }
              </div>

         
              
              <div className="card-body">
                
                {post.title && <h4>{post?.title}</h4>}
                <p>{post?.text}</p>
                {post.img && <img src={post?.img} alt="" />}
              </div>
              
              <div className="card-footer">
                <div className="post-info">
                  <span>{getLikeCount(post)} {getLikeCount(post) === 1 ? 'like' : 'likes'}</span>
                  <span>{getCommentCount(post)} {getCommentCount(post) === 1 ? 'comment' : 'comments'}</span>
                </div>
                <div className="post-buttons">
                  <button
                    className={`${isLiked(post) ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    {isLiked(post) ? 'Liked' : 'Like'}
                  </button>
                  <button className='' onClick={toggleComments} >{showComments ? "Hide Comments" : "Comment"}</button>
                </div>
                
                {/* Render comments section if showComments is true */}
                {showComments && (
                  <div className="comments-section">
                  {/* Render existing comments */}
                  {post.comments && Object.keys(post.comments).length > 0 ? (
                      Object.keys(post.comments)
                      
                      .sort((a, b) => post.comments[b].comment_date.toMillis() - post.comments[a].comment_date.toMillis())
                      .map((commentId) => {
                        const comment = post.comments[commentId];
                        return (
                          <div key={commentId} className="comment">
                            <div className="comment-content">
                              <img src={comment.comment_publisherPhotoURL} alt="profile-img" />
                              <div className="comment-context">
                                <div className="comment-author">
                                  <span id='author'>{comment.comment_publisherDisplayName}</span>
                                  <span id='time'>{formatTimeDifference(comment.comment_date?.toDate())}</span>
                                </div>
                                <p>{comment.comment_text}</p>
                              </div>
                            </div>
                            
                            {/* Display comment publisher info here */}
                          </div>
                        );
                      })
                    ) : (
                      <p>No comments yet.</p>
                    )}



                    {/* Input for new comments */}
                    <div className="new-comment">
                      

                      <div className="input-group mb-3">
                        <img alt='user profile img' src={currentUser?.photoURL}></img>
                        <input type="text" className="form-control" value={newComment} placeholder="Add a comment..." onKeyDown={handleKey} onChange={(e) => setNewComment(e.target.value)} aria-label="Add a comment..." aria-describedby="button-addon2"/>
                        <button className="btn" type="button" id="button-addon2" onClick={() => handleComment(post.id)}>Post</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
    </div>
  )
}

export default Post