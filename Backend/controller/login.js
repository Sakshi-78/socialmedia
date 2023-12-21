const User = require("../models/users");
// const passport = require("../Auth/passport");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jwt module

const handleError = (statusCode, message) => {
  return { statusCode, message };
};

 module.exports.postLogin = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) return next(handleError(404, "User not found"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(handleError(400, "Wrong password"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...othersData } = user._doc;
  
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(othersData);
        
    } catch (err) {
      next(err);
    }
    console.log(req);
    };





