import React, { useEffect,useState } from 'react'
import { Navbar } from '../Components/Navbar'
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import Tweet from "../Components/Tweet";
import Editprofile from '../Components/Editprofile';
 import{following} from "../Redux/userSlice";
import styles from "./Profile.module.css";

const Profile = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [open, setOpen] = useState(false);
  
  const { id } = useParams();
  const dispatch = useDispatch();
 

  useEffect(()=>{
    const fetchData = async() =>{
      try{
      const userTweets = await axios.get(`/tweets/user/all/${id}`)  // it will display the tweets of user
      const userProfile  = await axios.get(`/users/find/${id}`)  // it will display the user profile
      setUserTweets(userTweets.data);
      console.log(userTweets.data);
      setUserProfile(userProfile.data);
        }catch(err){
          console.log("err",err);
        };
      }
      fetchData();
  },[currentUser,id])

   const handleFollow = async()=>{
    if(!currentUser.following.includes(id)){
      try{
        const follow  = await axios.put(`/users/follow/${id}`,{
          id:currentUser._id,
        });
        dispatch(following(id));
      }catch(err){
        console.log("error",err);
      }
    }else{
      try{
        const unfollow = await axios.put(`/users/unfollow/${id}`,{
          id:currentUser._id,
        });

        dispatch(following(id));
      }catch(err){
        console.log("error",err);
      }
    }
   };
  return (
  <>
   <div className={styles.profile}>
    <div>
        <Navbar />
    </div>
    <div className={styles.line}></div>
    <div className={styles.main}>
        <div className={styles.title}>
            <h1>Profile</h1>
        </div>
        <div className={styles.horline}></div>
        <div className={styles.section}>
            <img
              className={styles.img}
              src={userProfile?.profilePicture}
              alt="Profile Picture"
           
            />
            <div className={styles.myname}>
            {currentUser.username}
            </div>
            <p className={styles.follower}>{`Followers ${currentUser.followers.length}`}</p>
            <p className={styles.follower}>{`Following ${currentUser.following.length}`}</p>
          {currentUser._id === id ? ( // Conditionally render the edit profile button
            <button
              className={styles.edit}
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
          ): currentUser.following.includes(id) ? (
            <button className={styles.following} onClick={handleFollow}>
              Following
            </button>
            
          ) : (
            <button className={styles.follow} onClick={handleFollow}>
              Follow
            </button>
            
          )}
         
        </div>
        {/* {currentUser.following.length} */}
        
        <div className={styles.horline}></div>
        </div>
    <div className={styles.mytweet}>
      <h2 className={styles.subtitle}>My Tweets</h2>
      {userTweets && userTweets.map((tweet)=>{
        return (
          <div key={tweet._id}>
            <Tweet tweet={tweet} setData={setUserTweets} comment={tweet.comment} imageUrl={tweet.image}/>
          </div>
          
        )
      })}
    </div>
    <div className={styles.lastline}></div>
    </div>
    
    {open && <Editprofile setOpen={setOpen} />}
</>
  )
}

export default Profile