// this route unlikes already liked tweet
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.post('/tweet/:id/dislike', async (req, res) => {
  // console.log(req.session);
  const user_id = req.session.passport.user.id;
  const tweet_data = await tweet.updateOne({
    _id: req.params.id, // tweet id
    likes: { $in: [user_id] }
  }, {
    $pull: { likes: user_id }
  });

  if (tweet_data.modifiedCount) {
    return res.status(200).json({
      msg: "Updated Successfully",
    });
  } else {
    return res.status(403).json({
      msg: "Unable to update!",
    });
  }
});

module.exports = router;