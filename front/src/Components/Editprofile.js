import React, { useEffect,useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile} from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import {logout} from "../Redux/userSlice"
import styles from "./Editprofile.module.css";

const Editprofile = ({setOpen}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [img, setImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
const uploadImg = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta_clone");
    data.append("cloud_name", "dzqrubcup");
  
    fetch("https://api.cloudinary.com/v1_1/dzqrubcup/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          const updateProfile = await axios.put(`/users/${currentUser._id}`, {
            profilePicture: data.secure_url,
          });
          console.log(updateProfile);
        } catch (error) {
          console.log(error);
        }
        console.log("downloaded " + data.secure_url);
        dispatch(changeProfile(data.secure_url));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  const handleDelete = async() =>{
    const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
    dispatch(logout());
    navigate("/login")
  }
 
  return (
    <div className={styles.profile}>
        <div className={styles.main}>
            <button onClick={()=> setOpen(false)} className={styles.close}>close</button>
            <div className={styles.line}></div>
            <h2 className={styles.title}>Edit Profile</h2>
            <div className={styles.upload}>
            <p className={styles.title}>Profile Picture</p>
            {imgUpload  > 0 ?(
                "Uploading " + imgUpload + "%"
            ) :
            (
              <div className={styles.uploadImg}>
                <input 
                className={styles.image} 
                type="file" 
                accept="image/*" 
                onChange= {(e) => setImg(e.target.files[0])}/>
                <button className={styles.save}>Upload Image</button>
              </div> 
             
            )
            }
            </div>
            <div className={styles.line}></div>
            
            {/* <p className={styles.del}>Delete Account</p>
            <button className={styles.delete} onClick={handleDelete}>Delete Account</button> */}
        </div>
    </div>
  )
}

export default Editprofile