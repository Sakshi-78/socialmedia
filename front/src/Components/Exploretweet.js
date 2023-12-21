//here explore page is rendered where everyones tweet is present

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Tweet from "./Tweet";


const Explore = () => {
  const [explore, setExplore] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get('/tweets/explore'); 
        setExplore(exploreTweets.data);
        console.log(exploreTweets.data);
      } catch (err) {
        console.error('error ', err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
      <div>
      {explore && explore.map((tweet) => {
        return(
        <div key={tweet._id}>
          <Tweet tweet ={tweet} 
            comment={tweet.comment}  
            imageUrl={tweet.image}
          />      
         </div>
      )
        })}
    </div> 
  );
};

export default Explore;
