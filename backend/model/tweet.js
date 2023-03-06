// creating schema of the users collection
const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  content: String,
  tweetedBy: { type: mongoose.Types.ObjectId, $ref: "users" },
  tweetedByUsername: String,
  likes: [{ type: mongoose.Types.ObjectId, $ref: "users" }],
  retweetedBy: [{ type: mongoose.Types.ObjectId, $ref: "users" }],
  image: [{ type: String }],
  replies: [{ type: mongoose.Types.ObjectId, $ref: "tweet" }],
}, { timestamps: true });

// finally making model of it
const tweet = mongoose.model("tweet", tweetSchema);
module.exports = tweet;