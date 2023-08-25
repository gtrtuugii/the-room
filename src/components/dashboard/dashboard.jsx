// Components and Dependencies
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import { ReactComponent as DefaultUserIcon } from "../sidebar/icons/account-box.svg";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";

// css styling
import "./dashboard.css";
import { AuthContext } from "../context/context";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase/firebase";
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);

  const [quote, setQuote] = useState("");
  const [popup, setPopup] = useState(false);


  const [posts, setPosts] = useState([]);

  const colRef = collection(db, "posts");

  const [visiblePosts, setVisiblePosts] = useState(3); // Number of posts to display initially
  const [postsToLoad, setPostsToLoad] = useState(10); // Number of posts to load each time
  const postsContainerRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "a_title") {
      setTitle(value);
    }
    if (id === "a_text") {
      setText(value);
    }
  };



  const handleSend = async () => {
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
            
            await updateDoc(doc(db, "posts", data.chatId), {
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
            
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
              });
  

  
              setText('');
              setImg(null);
          
          }
          );
      }


    } else {
      await updateDoc(doc(db, "posts", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    }



    setText("");
    setImg(null);
  };

  const fetchKanyeQuote = async () => {
    try {
      
      const res = await fetch("https://api.kanye.rest/");
      const data = await res.json();

      setQuote(data.quote); // setter function updates initialState value
    } catch (error) {
      console.error(error);
    }
  }

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + postsToLoad);
  };

  const handleScroll = () => {
    const postsContainer = postsContainerRef.current;
    const containerHeight = postsContainer.clientHeight;
    const scrollTop = postsContainer.scrollTop;
    const scrollHeight = postsContainer.scrollHeight;

    // Check if the user has scrolled to the bottom of the container
    if (scrollTop + containerHeight >= scrollHeight - 100) {
      // Load more posts
      loadMorePosts();
    }
  };

  const scrollToTop = () => {
    const postsContainer = postsContainerRef.current;
    postsContainer.scrollTop = 0;
  };

  // async function copyData() {
  //   try {
  //     const sourceDocRef = doc(db, 'posts', 'Bayasaa');
  //     const sourceDocSnapshot = await getDoc(sourceDocRef);
  
  //     if (sourceDocSnapshot.exists()) {
  //       const dataToCopy = sourceDocSnapshot.data();
  
  //       const targetDocRef = doc(db, 'posts', '50472581-8b3f-4d7e-bffd-b6c96d5ff58d');
  //       await setDoc(targetDocRef, dataToCopy);
  
  //       console.log('Data copied successfully.');
  //     } else {
  //       console.log('Source document does not exist.');
  //     }
  //   } catch (error) {
  //     console.error('Error copying data:', error);
  //   }
  // }
  


  useEffect(()=>{

    // Add an event listener to listen for scroll events on the posts container
    const postsContainer = postsContainerRef.current;
    postsContainer.addEventListener('scroll', handleScroll);


    const unsubs = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().posts);
      const allPosts = data.flat();
      const sortedPosts = allPosts.sort((a, b) => b.date - a.date);
      setPosts(sortedPosts);
    });
    
    const sortedPosts = posts.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(sortedPosts);
    return () => {
      unsubs();
      // Remove the event listener when the component unmounts
      postsContainer.removeEventListener('scroll', handleScroll);
    }
    

  },[]);
  

  return (
    <div className="dashboard" style={{ zIndex: 0 }}>
      <div className="marquee" id="yzy">
        <marquee className="font-face-gm" onClick={fetchKanyeQuote}>{quote ? quote : <span>Click Me</span>} - Ye</marquee>
      </div>
      
      <div className="container-fluid">
        <div className="post-popup">
          <Posts trigger={popup} setTrigger={setPopup}>
          </Posts>
        </div>
        <div className="create-post-button">
          <div className="row">
            
              <button className="btn" id="post-button" onClick={() => setPopup(true)} >
                What's on your <strong id="mind-txt"> mind, </strong> {  currentUser?.displayName}?
              </button>
              <button className="btn" id="back-to-top" onClick={scrollToTop}>
                ▲
              </button>
           
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-sm-center">
       
          <div className="col-sm-7" id="posts" ref={postsContainerRef}>
          {posts
            .slice(0, visiblePosts) // Slice only the visible posts
            .map((item, index) => (
              <Post key={`post_${index}`} post={item} />  
            ))
          }
          </div>
          <button className="btn" id="back-to-top-bot" onClick={scrollToTop}>
          ▲
        </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
