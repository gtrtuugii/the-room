import React, { useState } from 'react';
import "./meme.css";

const MemeCreator = () => {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [image, setImage] = useState(null);

    const [fontColor, setFontColor] = useState('#ffffff'); // Default font color
    const [fontSize, setFontSize] = useState(36); // Default font size
    const [fontFamily, setFontFamily] = useState('Impact'); // Default font family
    const [fontWeight, setFontWeight] = useState('normal'); // Default font weight
  
    const handleImageUpload = (event) => {
      const uploadedImage = event.target.files[0];
      const imageUrl = URL.createObjectURL(uploadedImage);
      setImage(imageUrl);
    };
  
    const handleDownload = () => {
      const canvas = document.createElement('canvas');
      const img = new Image();
  
      img.src = image;
  
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
  
        // Draw the image
        ctx.drawImage(img, 0, 0);
  
        // Draw top text
        ctx.fillStyle = fontColor;
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(topText, canvas.width / 2, 40);
  
        // Draw bottom text
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  
        // Convert canvas to image URL and initiate download
        const memeImage = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = memeImage;
        downloadLink.download = 'meme.png';
        downloadLink.click();
      };
    };
  return (
    <div className='meme'>
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Meme Creator</h2>
                </div>
                <div className="card-body">
                    <input className='form-control' type="file" onChange={handleImageUpload} />
                    <br />
                    <h5>Text Area</h5>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter Top Text..."
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                    />
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter Bottom Text ..."
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                    />
                    <br />
                    <label>
                        Font Color:
                        <input
                        className='form-control'
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Font Size:
                        <input
                        className='form-control'
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        />
                    </label>
                    <label>
                        Font Family:
                        <select
                            className='form-control'
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                        >
                        <option value="Impact">Impact</option>
                        <option value="Rubik">Rubik</option>
                        <option value="Press Start 2P">Press Start 2P</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        {/* Add more font options here */}
                        </select>
                    </label>
                    <label>
                        Font Weight:
                    <select
                        className='form-control'
                        value={fontWeight}
                        onChange={(e) => setFontWeight(e.target.value)}
                    >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Lighter</option>
                    {/* Add more font weight options here */}
                    </select>
                    </label>
                </div>
                <div className="img-preview">
                    {image && <img src={image} alt="Uploaded" />}
                </div>
                
                <div className="card-footer">
                    <button className="btn-light" onClick={handleDownload}>Download Meme</button>
                </div>
                
            </div>
        </div>

    </div>
  );
};

export default MemeCreator;




