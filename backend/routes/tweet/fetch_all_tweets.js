// this route fetches all tweets present in db on get request
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.get('/tweet', async (req, res) => {
  // const all_tweets = await tweet.find({}).sort({ createdAt: -1 });
  const all_tweets = await tweet.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "tweetedBy",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        "user.password": 0,
        "user.email": 0,
        "user.createdAt": 0,
        "user.updatedAt": 0,
        "user.__v": 0,
      }
    }
  ]).sort({ createdAt: -1 });
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