import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/context";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase/firebase";
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

import AddImg from "../chat/media/addimgs.svg"

import CloseButton from "../chat/media/close-button-icon.svg"
import AddedImage from "../chat/media/checkmark-image.svg"
import "./posts.css";


const Posts = (props) => {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    
    const handlePost = async () => {
        if (img) {
          if(!text === '')
          {
            const storageRef = ref(storage, 'posts/' + uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
      
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Here you can monitor the progress of the image upload if needed.
                // You can access snapshot.bytesTransferred and snapshot.totalBytes.
              },
              async (error) => {
                alert('Error while uploading image: ' + error.message);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                await updateDoc(doc(db, "posts", currentUser?.uid), {
                  posts: arrayUnion({
                    id: uuid(),
                    title: title,
                    publisherId: currentUser?.uid,
                    publisherDisplayImg: currentUser?.photoURL,
                    publisherDisplayName: currentUser?.displayName,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                  });
                await setDoc()
                  setImg(null);
              }
            );
    
          }else{
            const storageRef = ref(storage, 'posts/' + uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
      
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Here you can monitor the progress of the image upload if needed.
                // You can access snapshot.bytesTransferred and snapshot.totalBytes.
              },
              async (error) => {
                alert('Error while uploading image: ' + error.message);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                await updateDoc(doc(db, "posts", currentUser?.uid), {
                  posts: arrayUnion({
                    id: uuid(),
                    title: title,
                    text,
                    publisherId: currentUser?.uid,
                    publisherDisplayImg: currentUser?.photoURL,
                    publisherDisplayName: currentUser?.displayName,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                  });
      
    
                  setTitle("");
                  setText('');
                  setImg(null);
              
              }
              );
          }
    
    
        } else {
          await updateDoc(doc(db, "posts", currentUser?.uid), {
            posts: arrayUnion({
              id: uuid(),
              title: title,
              text,
              publisherId: currentUser?.uid,
              publisherDisplayImg: currentUser?.photoURL,
              publisherDisplayName: currentUser?.displayName,
              date: Timestamp.now(),
            }),
          });
    
        }
    
    
        setTitle("");
        setText("");
        setImg(null);
        props.setTrigger(false);
      };

    
    return (
    props.trigger) ?
    <div className="create-post">
        <div className="create-post-main">
            <div className="card">
                <div className="card-header">
                    <span id='card-title'>Create Post</span>
                    <button id='close-button' onClick={() => props.setTrigger(false)}><img src={CloseButton} alt=''/></button>
                    {props.children}
                </div>
                <div className="card-body">
                        <div className="card-user-info">
                            <img src={currentUser?.photoURL} alt="" />
                            <span>{currentUser?.displayName}</span>
                        </div>

                        <input
                            className="form-control"
                            type="text"

                            onChange={(e) => setTitle(e.target.value)} value={title}
                            placeholder="Enter title... (optional)"
                            />
                    
                        <textarea
                            className="form-control"
                            onChange={(e) => setText(e.target.value)} value={text}
                            placeholder="Go ahead, put anything."
                            autoFocus={true}
                            rows="4">
                                
                      </textarea>
                </div>
                <div className="card-footer">
                    <div className="media">
                        <label htmlFor="file">
                            Add to Your Post
                            {img ? <img src={AddedImage} alt=''/> : <img src={AddImg} alt=''/>}
                            <input type="file" id="file" onChange={(e)=>setImg(e.target.files[0])}/>
                        </label>
                    </div>
                    
                </div>
                
                <button className="post-button" onClick={handlePost}>Post</button>
                
            </div>
        </div>
    </div>
    : "";
  
}

export default Posts