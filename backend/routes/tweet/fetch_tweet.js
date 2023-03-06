// this route fetche a specific tweet
const express = require('express');
const { default: mongoose } = require('mongoose');
const tweet = require('../../model/tweet');
const router = express.Router();

router.get('/tweet/:id', async (req, res) => {
  const single_tweet = await tweet.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "tweets",
        localField: "replies",
        foreignField: "_id",
        as: "reply_arr",
      },
    },
  ]);
  // console.log(JSON.stringify(single_tweet));
  if (single_tweet) {
    return res.status(200).json({
      msg: "Fetched Successfully",
      data: single_tweet
    });
  } else {
    return res.status(403).json({
      msg: "Unable to find!",
    });
  }
});

module.exports = router;