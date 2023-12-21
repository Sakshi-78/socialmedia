const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
     type: String,
      required: true, 
      unique: true
     },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
   profileProfile:
    {
       type: String 
    },
    followers: 
    { 
      type: Array,
       defaultValue: []
     },
    following: 
    { 
      type: Array,
       defaultValue: []
     },
    description: {
       type: String 
    },
    profilePicture: { type: String },
  

},
{timestamps:true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
