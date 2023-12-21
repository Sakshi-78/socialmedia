const express = require('express');
const router  = express.Router();


const loginController = require('../controller/login');
const postController= require("../controller/signup")


router.post("/signup",postController.postSignup);
router.post("/login",loginController.postLogin);

module.exports=router;