// this route creates new session entry on successful login 
// usign user name and password
const express = require('express');
const router = express.Router();
const tweet = require('../../model/tweet');

router.get('/user/:id/tweets', async (req, res) => {
  const tweet_data = (await tweet.find({ _id: req.params.id }).lean());
  if (tweet_data) {
    // const { password, tmp } = tweet_data;
    return res.status(200).json({
      msg: "Fetched Successfully",
      data: tweet_data
    });
  } else {
    return res.status(403).json({
      msg: "User not found!",
    });
  }
});

module.exports = router;