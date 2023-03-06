// this route handles the new user registration request.
const express = require('express');
const router = express.Router();
const tweet = require('../../model/tweet');

router.post('/tweet/:id/reply', async (req, res, next) => {
  const {
    content, // string
    img_urls, // []
  } = req.body;
  const user_id = req.session.passport.user.id;
  const user_name = req.session.passport.user.username;

  // making sure all required data is valid before creating a user
  if (!content) {
    return res.status(203).json({
      msg: "No content!"
    });
  }
  const reply_tweet = await tweet.create({
    tweetedBy: user_id,
    tweetedByUsername: user_name,
    content: content,
    image: img_urls,
  });
  const update_parent_tweet = await tweet.updateOne({
    _id: req.params.id
  }, {
    $push: { replies: reply_tweet._id }
  });

  if (reply_tweet && update_parent_tweet.modifiedCount) {
    return res.status(200).json({
      msg: "Successfully inserted..",
      data: { ...JSON.parse(JSON.stringify(reply_tweet)), user: [req.session.passport.user] }
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;