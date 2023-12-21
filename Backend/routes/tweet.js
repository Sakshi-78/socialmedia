const path = require('path');
const express = require('express');
const router = express.Router();

const {verifyToken} = require("../verifyToken");

const postController = require("../controller/tweet");

 // Create Tweet
router.post("/", verifyToken ,postController.postCreateTweet);

// Get all tweets
router.get("/timeline/:id",postController.getAllTweets);

//Get users tweet
router.get('/user/all/:id',postController.getUserTweet);

// delete tweet
router.delete("/:id", verifyToken ,postController.deleteTweet);

// like or dislike  tweet
router.put("/:id/like",postController.likeTweet);

// tweet explore
router.get("/explore",postController.getExplore);

// tweet comment
router.put("/:id/comment", verifyToken , postController.comment);

  


module.exports=router;