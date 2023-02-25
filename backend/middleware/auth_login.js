var express = require('express');
var passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('../model/user');
const bcrypt = require('bcryptjs');

// strategy of authentication a users
passport.use(new LocalStrategy(function verify(username, password, callback) {
  if (username && password) {
    return user.findOne({
      email: username,
    }).then(
      record => {
        // if user record is found for the perticula user
        console.log("Found user record =>>", record);
        // matching the password hash
        if (record && bcrypt.compareSync(password, record.password)) {
          // if passed, sending the user object in the request
          return callback(null, record);
        } else {
          console.log("Authentication failed!!");
          return callback(null);
        }
      },
      err => {
        console.log("Database error during authentication....");
        console.log(err);
        return callback(null);
      }
    );
  }
  return callback(null);
}));

// for serilizing and storing a session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user.id,
      username: user.username,
      email: user.email,
      dob: user.date_of_birth,
      password: user.passport,
      location: user.location,
      following: user.following,
      followers: user.followers,
      date_of_birth: user.date_of_birth,
      profile_pic_url: user.profile_pic_url,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  });
});
// for deserilizing and fetching a session
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;