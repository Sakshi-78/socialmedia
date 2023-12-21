import React from 'react'
import { Navbar } from '../Components/Navbar'
import { useSelector } from 'react-redux' //go to the store and find the user
import Login from "./Login";
import Maintweet from "../Components/Maintweet";
import styles from "./Home.module.css";
const Home = () => {

    const {currentUser} = useSelector((state) => state.user);  // it will currently which user is logged in 
 
    return (
     <>
        {!currentUser ? (  // in this if user is logged in then move to home page where auser can tweets
            <Login />      // otherwise redirect it to login page
        ) : (  
          <div className={styles.homesection}>
            <div>
              <Navbar />
            </div>
            <div className={styles.line}></div>
            <div className={styles.main}>
              <div className={styles.title}>
                <h1>Home</h1>
                
              </div>
              <div>
              <div className={styles.horline}></div>
                <Maintweet />
              </div>
              <div className={styles.horline}></div>
            </div>
            <div className={styles.lastline}></div>
          </div>
          
         
      )
    
     }</>
  )
}

export default Home