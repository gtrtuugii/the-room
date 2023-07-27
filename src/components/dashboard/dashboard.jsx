// Components and Dependencies
import React, { useContext, useEffect, useState } from "react";
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
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

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


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "a_title") {
      setTitle(value);
    }
    if (id === "a_text") {
      setText(value);
    }
  };

  const handlePopup =() => {

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
  useEffect(()=>{


    const unsubs = onSnapshot(colRef, (snapshot) =>{
      snapshot.docs.forEach((doc) => {
        posts.push(doc.data().posts)
      })
    });


    return () => unsubs()



  },);
  console.log(posts)

  /*
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [studentID, setstudentID] = useState("");
  const [checkstat, setCheck] = useState("");
  //const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
/*
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);*/

  return (
    <div className="dashboard" style={{ zIndex: 0 }}>
      <div className="marquee" id="yzy">
        <marquee className="font-face-gm">{quote} - Ye</marquee>
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
           
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-sm-center">
       
          <div className="col-sm-7" id="posts">



            {
              posts.map((p) => (
                p.map((item)=>(
                    <Post post={item}/>  
                  )
                )
              ) 
            )
            }
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
