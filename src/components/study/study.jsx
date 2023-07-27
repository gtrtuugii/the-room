import React, { useEffect, useState } from 'react';
import { storage } from "../firebase/firebase";
import { ref, listAll, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Carousel } from 'react-bootstrap';
import AddImage from "../chat/media/addimgs.svg";
import AddedImage from "../chat/media/checkmark-image.svg"
import "./study.css";
import { serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
const Study = () => {
  

  // Get all the images from Storage
  const [files, setFiles] = useState([]);
  const [uploadImg, setUploadImg] = useState(null);
  // progress
  const [percent, setPercent] = useState(0);


  const getRandomImages = () => {

    const storageRef = ref(storage, 'anime-gifs/');

    listAll(storageRef)
    .then((result) => {
       const promises = [];
       result.items.forEach((imageRef) => {
         promises.push(getDownloadURL(imageRef));
       });
       return Promise.all(promises);
     })
     .then(urlsArray => {
        setFiles(urlsArray);
     });     
  }
  const handleSubmit = async () => {
    
    const storageRef = ref(storage, `anime-gifs/${uploadImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
          });
      }
  );
  
  setPercent(0);

    
  };

  useEffect(() => {
      getRandomImages()

    },[]);

  return (

    <div className="study">
      <div className="carousal">
        <Carousel  slide={false} fade={true} indicators={false} keyboard={true} touch={true}>
          {files.map((img, id)=>(
            <Carousel.Item>
              <img src={img} keyu={id} id='carousal-imgs' alt="..."/>
            </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <div className="upload-files">
          <div className="input-group">
            <label htmlFor="formFileSm" className='form-label'>Want to add to the collection?</label>
            <input type="file" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" className='form-control form-control-sm' onChange={(e)=>setUploadImg(e.target.files[0])} />
            <button type="button" className='btn btn-outline-dark' onClick={handleSubmit}>Upload</button>
          </div>
      
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: percent + "%"}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">{percent}%</div>
          </div>
        
      </div>
      <iframe title='spotify-player' id='spotify' src="https://open.spotify.com/embed/playlist/51q7F6whVJCBgsgJNLVSXp?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}

export default Study