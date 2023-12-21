import {React,useState} from 'react'
import {  useDispatch } from 'react-redux';
import { loginStart,loginSuccess,loginFailed } from "../Redux/userSlice"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

const Signup = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    const dispatch =useDispatch();
    const navigate = useNavigate(); 


    const handleSignup = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await axios.post("/auth/signup",{username,password,email});
            dispatch(loginSuccess(res.data));  //if user successfully signup then  move to login 
            navigate("/login");
        }catch(err){
          dispatch(loginFailed());  
        }
    }
  return (

    <div className={styles.main}>
        <form className={styles.form}>
        <img className = {styles.logo} alt = "twitter" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" />

            <h1 className={styles.title}>Singup to Twitter</h1>
            <input
            className={styles.name}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder='Enter Username'
            />
             <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              required
              className={styles.email}
            />
            <input  
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder = "Enter Password"
            />
            <button className={styles.btn} type="submit" onClick={handleSignup}>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup