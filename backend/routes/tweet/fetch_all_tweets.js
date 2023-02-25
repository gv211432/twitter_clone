// this route fetches all tweets present in db on get request
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.get('/tweet', async (req, res) => {
  const all_tweets = await tweet.find({});
  if (all_tweets) {
    return res.status(200).json({
      msg: "Fetched Successfully",
      data: all_tweets
    });
  } else {
    return res.status(403).json({
      msg: "Unable to find!",
    });
  }
});

module.exports = router;