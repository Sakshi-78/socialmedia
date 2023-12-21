import {React,useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

import { useDispatch } from 'react-redux';
import { loginStart,loginSuccess,loginFailed } from "../Redux/userSlice"


const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const dispatch =useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post("/auth/login",{username,password}); //here we will give name and password of user 
            dispatch(loginSuccess(res.data)); // this is for user, which is logged in successfullly
            // console.log("res",res.data);
            navigate("/");  //once login is successfull we will navigate to home page

        }catch(err){
            dispatch(loginFailed()); //if login is failed then error will be there
            console.log(err);
        }
    }
  return (
    <div className={styles.main}>
        <form className={styles.form}>
            <img className={styles.logo} alt = "twitter" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" />
            <h1 className={styles.title}>Login to Twitter</h1>
            <input 
            className={styles.name}
            onChange={(e) => setUsername(e.target.value)} //change username whatever we type
            type="text"
            placeholder = "Enter Username"
            />
            <input 
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder = "Enter Password"
            />
            <button className= {styles.btn} onClick={handleLogin}>Login</button>
            <div className={styles.redirect}>
            <p className="para">Don't have an account!</p>
            <NavLink  className={styles.link} to="/signup">Signup</NavLink>
        </div>
        </form>
        
    </div>
  )
}

export default Login