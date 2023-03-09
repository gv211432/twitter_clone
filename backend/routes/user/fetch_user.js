// this rotue fetches the user with given user id
const express = require('express');
const router = express.Router();
const user = require('../../model/user');
const tweet = require('../../model/tweet');

router.get('/user/:id', async (req, res) => {
  if (req.params.id == "own") {
    if (req.session && req.session.passport && req.session.passport.user) {
      const tweet_data = (await tweet.find({ tweetedBy: req.session.passport.user.id }).lean());
      return res.status(200).json({
        msg: "Fetched Successfully",
        data: { ...req.session.passport.user, tweet_data }
      });
    } else {
      return res.status(401).json({
        msg: "User in not logged in!",
        data: {}
      });
    }
  }

  const user_data = (await user.find({ _id: req.params.id }).lean())[0];
  const tweet_data = (await tweet.find({ tweetedBy: user_data._id }).lean());
  if (user_data) {
    // const { password, tmp } = user_data;
    return res.status(200).json({
      msg: "Fetched Successfully",
      data: { ...user_data, tweet_data: tweet_data }
    });
  } else {
    return res.status(404).json({
      msg: "User not found!",
    });
  }
});

module.exports = router;