import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import Tweet from "./Tweet";


const Alltweet = () => {
    const [timeline,setTimeline] = useState("");
    const [comment,setComment] = useState(null);
    const {currentUser}  = useSelector((state)=> state.user);
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
               const timelineTweets  = await axios.get(`/tweets/timeline/${currentUser._id}`)
               setTimeline(timelineTweets.data);
               
            }catch(err){
                console.log("error",err);
            }
        };
        fetchData();
    },[currentUser._id]);
    console.log("timeline",timeline);
  return (
    <div>
        {timeline && 
        timeline.map((tweet) =>(
            <div key={tweet._id}>
                <Tweet tweet ={tweet} 
                    comment={timeline[0].comment} 
                    setData = {setTimeline} 
                    imageUrl={tweet.image}
                />  
            </div>
        
        ))}
    </div>
  )
}

export default Alltweet