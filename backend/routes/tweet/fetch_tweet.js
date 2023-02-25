// this route fetche a specific tweet
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.get('/tweet/:id', async (req, res) => {
  const single_tweet = await tweet.find({ _id: req.params.id });
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