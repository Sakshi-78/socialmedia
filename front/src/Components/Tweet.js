import axios from "axios";
import React, { useState} from "react";
import formatDistance from "date-fns/formatDistance";
import styles from "./Tweet.module.css";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

const Tweet = ({ tweet, setData, comment, imageUrl}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState('');
  const [userData, setUserData] = useState();
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());  // for time at which it user tweet
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${currentUser._id}`);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("Error fetching user profile", err);
      }
    };

    fetchUserProfile();
  }, [currentUser._id]);

  


  const handleDelete = async(e)=>{
    e.preventDefault();
    try{
      const deleteTweet = await axios.delete(`/tweets/${tweet._id}`,{
        data:{ id: currentUser._id},
      })

      if(location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
      setData(newData.data);
    } else if (location.includes("explore")) {
      const newData = await axios.get(`/tweets/explore`);  
      setData(newData.data);
    } else {
      const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);  // likes where all tweet are there
      setData(newData.data);
    }
    }catch(err){
      console.log(err);
    }
  }


  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });
      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);  
        setData(newData.data);
      } else{
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);  // likes where all tweet are there
        setData(newData.data);
      } 
    } catch (err) {
      console.log("error", err);
    }
  };
console.log(comment);

  const handleComment = async(e)=>{
     e.preventDefault();
     try{
      const commentTweet = await axios.put(`/tweets/${tweet._id}/comment`, {
        text: commentText,
        id: currentUser._id,
        username: currentUser.username
    
      }); 
      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);  
        setData(newData.data);
        console.log(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);  // likes where all tweet are there
        setData(newData.data);
        console.log(newData.data)
      }
     setCommentText("");
    } catch (err) {
      console.log("error");
    }
}
  return (
     <div>
      {userData && (
        <>
          <div className={styles.info}>
          {userProfile && (
            <img
              className={styles.mypic}
              src={userProfile.profilePicture}
              alt="Profile Picture"
            />
          )}  
            <Link className={styles.name}to={`/profile/${userData._id}`}>
              <h3>{userData.username}</h3>
            </Link>
            <span className={styles.username}>@{userData.username}</span>
            <p className={styles.date}> - {dateStr}</p>
          </div>
          <div className={styles.des}>
          <p className={styles.description}>{tweet.description}</p>
          </div>
          <div className={styles.uploadimg}>
          { imageUrl && <img src={imageUrl} alt="Uploaded" className={styles.upload}/>}
          </div>
          <div className={styles.icons}>
            <div className={styles.btn}>
              <button  className={styles.btn} onClick={handleLike}>
                {tweet.likes.includes(currentUser._id) ? (
                  <FaHeart className={styles.like} />
                ) : (
                  <FaRegHeart className={styles.like} />
                )}
              </button>
              { tweet.likes.length}
            </div>
            <div>
              <button className={styles.delbtn} onClick={handleDelete}>   
                <DeleteIcon />
              </button>
            </div>
          </div>
          <form onSubmit={ handleComment} >
        <input
          type="text"
          className={styles.mycomment}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add your comment"
        />
        <button className={styles.submit} type="submit">Comment</button>
      </form>
      
      <div>
        {comment.map((comment) => (
          <div className={styles.comment} key={comment._id}>
            <h4 className={styles.myname}>{comment.username}</h4>
            <p className={styles.text}>{comment.text}</p>
            {/* <p>Posted By: {comment.postedBy}</p> */}
           </div>
        ))}
      </div> 
     
        <div className={styles.margin}></div> 
        </>
      )}  
  </div>
  )
};


export default Tweet;