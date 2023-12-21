//this code is for home page where user tweet and all users tweet is visible

import React,{useState} from 'react'
import Alltweet from './Alltweet'
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Maintweet.module.css"



const Maintweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  

  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'insta_clone');
      formData.append("cloud_name","cnq");
      const res = await fetch('https://api.cloudinary.com/v1_1/dzqrubcup/image/upload', {
        method: 'POST',
        body: formData,
      });

      const file = await res.json();
      const uploadedImageUrl = file.secure_url;
      setImageUrl(uploadedImageUrl);

      await axios.post('/tweets', {
        userId: currentUser._id,
        description: tweetText,
        image: uploadedImageUrl,
      });

      setTweetText('');
      setImage('');
      setImageUrl('');
    } catch (err) {
      console.log(err, 'this is error');
    }
  };

  return (
    <div>
      {currentUser && (
        <p className={styles.user}>{currentUser.username}</p>
      )}
       
        <form className={styles.tweettext}>
            <textarea 
            className={styles.text}
            onChange={(e) => setTweetText(e.target.value)}
            type="text" 
            placeholder="What's Happening?"></textarea>
            <div className={styles.img}>
              <label for="upload">Upload Image</label>
              <input
               type="file"
                id="upload" 
                onChange={(e) => setImage(e.target.files[0])} 
                style={{ display: 'none' }}
              />
            </div>
            <br></br>
        </form>
        <button className={styles.btn} onClick={handleSubmit}>Tweet</button>
        
        <div className={styles.horline}></div>
        <Alltweet /> 
    </div>
  )
}

export default Maintweet

