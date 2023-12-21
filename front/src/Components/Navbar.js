import React from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'

import {logout} from "../Redux/userSlice";
import styles from "./Navbar.module.css";
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";


export const Navbar = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const handlelogout = ()=>{
    dispatch(logout());
  }
   return (


    <div className={styles.navbar}>
        <img className={styles.logo} alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" />
        <div className={styles.navlink}>
            <ul className={styles.list}>
                <li>
                    <NavLink className= {styles.navitem} to="/">
                      <HomeIcon />
                      Home
                    </NavLink>
                    <NavLink className= {styles.navitem} to = "/explore">
                      <TagIcon />
                      Explore
                    </NavLink>
                    <NavLink className= {styles.navitem} to={`/profile/${currentUser._id}`}>
                      <PersonIcon />
                      Profile
                    </NavLink>
                    
                </li>
            </ul>
          </div> 
          <div className={styles.logout}>
              <p className={styles.user}>{currentUser.username}</p>
              <p className={styles.user}>@{currentUser.username}</p>
            <div >
              <NavLink to= "/login">
              <button  className={styles.btn} onClick={handlelogout}>Logout</button>
              </NavLink>
            </div>
          </div> 
       
    </div>
  )
}
