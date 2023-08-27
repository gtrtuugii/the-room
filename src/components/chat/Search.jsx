import React, { useContext, useState } from 'react'
import Raccoon from "./media/raccoon-icon.svg";
import SearchIcon from "./media/search-icon.svg";
import "./styling/search.css";
import { db } from '../firebase/firebase';
import { collection, getDocs, query, setDoc, where, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/context';


const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext);
  // Search for the user in the database
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try{

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){
      setErr(err)
    }


  };

  // handler for search 
  const handleKey = e=>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Create user chats

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
    try{
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()){
        // create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: []
        });
        // create chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL

          },
          [combinedId+".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL

          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    }catch(err){

    }
   
    setUser(null);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className='search-form'>
        <button className='btn' onClick={handleSearch}>
          <img src={SearchIcon} alt="search" />
        </button>
        <input type="text" placeholder='Find a friend' onKeyDown={handleKey} value={username} onChange={e=> setUsername(e.target.value)}/>
      </div>
      {err && <span style={{ color: "red" }}> User not found</span>}
        {user && <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>}
  </div>
  )
}

export default Search