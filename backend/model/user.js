// creating schema of the users collection
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic_url: String,
  location: String,
  date_of_birth: String,
  followers: [{
    type: String
  }],
  following: [{
    type: String
  }],
}, { timestamps: true });

// finally making model of it
const user = mongoose.model("user", userSchema);
module.exports = user;