import React from 'react'
import { Navbar } from '../Components/Navbar'
import Exploretweet from "../Components/Exploretweet";
import styles from "./Explore.module.css";
import { useSelector } from 'react-redux';
import Login from "./Login";


const Explore = () => {
  const {currentUser} = useSelector((state)=> state.user)
  return (
      <>
          {!currentUser ?  (   //in this if user is there then show the explore page
            <Login />           // otherwise show login page
          ) :( 
          <div className={styles.explore}>
            <div>
              <Navbar />
            </div>
            <div className={styles.line}></div>
            <div className={styles.main}>
              <div className={styles.title}>
                <h1>Explore</h1>
                
              </div>
              <div>
              <div className={styles.horline}></div>
                <Exploretweet />
              </div>
            </div>
            <div className={styles.lastline}></div>
          </div>
          
    )
    
    }
    

    </>
  )
}

export default Explore