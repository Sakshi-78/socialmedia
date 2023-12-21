const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    image:{
      type: String, 
    },
    likes: {
      type: Array,
      default: [],
    },
    comment: [{
      text:{ type:String
      },
      username:{ type:String},
      postedBy: { type:ObjectId, ref: 'User' }
    }],
    postedBy:{
      type:ObjectId,
      ref:"User"
   },
  },
  { timestamps: true }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
