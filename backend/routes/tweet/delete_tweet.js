// this route fetche a specific tweet
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.delete('/tweet/:id', async (req, res) => {
  const single_tweet = await tweet.deleteOne({ _id: req.params.id });
  const delete_from_replies = await tweet.updateMany({ replies: req.params.id }, {
    $pull: { replies: req.params.id }
  });
  console.log(delete_from_replies);
  if (single_tweet) {
    return res.status(200).json({
      msg: "Deleted Successfully",
      data: single_tweet
    });
  } else {
    return res.status(403).json({
      msg: "Unable to delete!",
    });
  }
});

module.exports = router;