import React, { useContext, useState } from 'react'
import "./styling/input.css";
import AddImage from "./media/addimgs.svg";
import Arrow from "./media/arrow.svg";
import AddedImage from "./media/checkmark-image.svg"
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/context';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
 

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      if(!text === ''){
        const storageRef = ref(storage, 'chats/' + uuid());
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
            
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
              });
              setImg(null);
          }
        );

      }else{
        const storageRef = ref(storage, 'chats/' + uuid());
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
            
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
              });
  
              await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.chatId + '.lastMessage']: {
                  text,
                },
                [data.chatId + '.date']: serverTimestamp(),
              });
  
              await updateDoc(doc(db, 'userChats', data.user.uid), {
                [data.chatId + '.lastMessage']: {
                  text,
                },
                [data.chatId + '.date']: serverTimestamp(),
              });
  
              setText('');
              setImg(null);
          
          }
          );
      }


    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }



    setText("");
    setImg(null);
  };

  // handler for send 
  const handleKey = e=>{
    e.code === "Enter" && handleSend();
  };



  return (
    <div className='chat-input'>
      <input type="text" placeholder='Type something...' onKeyDown={handleKey} onChange={(e) => setText(e.target.value)} value={text} />

      <div className="send">

        <input type="file" id="file" onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          {img ? <img src={AddedImage}  alt=""/> : <img src={AddImage}  alt=""/>}
          
        </label>
        {text ?
          <button className='btn' onClick={handleSend}>
            <img src={Arrow} alt="arr" className='arrow'/>
          </button>
          :
          <button className='btn' onClick={handleSend}>Send</button>
        }
        
      </div>
    </div>
  )
}

export default Input;