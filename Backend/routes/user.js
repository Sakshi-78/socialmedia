const path = require('path');
const express = require('express');
const router = express.Router();


const { verifyToken } = require("../verifyToken"); 
const postController = require("../controller/user");

//Update User
router.put("/:id", verifyToken ,postController.updateUserProfile);

// Get User
router.get("/find/:id",postController.getUserProfile);

// Delete User
router.delete("/:id", verifyToken , postController.deleteUser);

// Follow
router.put("/follow/:id", verifyToken , postController.followUser);

// Unfollow
router.put("/unfollow/:id", verifyToken , postController.unFollowUser);


module.exports=router;