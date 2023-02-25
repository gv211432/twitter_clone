// this route creates new session entry on successful login 
// usign user name and password
const express = require('express');
const tweet = require('../../model/tweet');
const router = express.Router();

router.post('/tweet/:id/retweet', async (req, res) => {
  // console.log(req.session);
  const user_id = req.session.passport.user.id;
  const tweet_data = await tweet.updateOne({
    _id: req.params.id, // tweet id
    retweetedBy: { $nin: [user_id] }
  }, {
    $push: { retweetedBy: user_id }
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