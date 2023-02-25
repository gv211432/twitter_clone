// this route handles the new user registration request.
const express = require('express');
const router = express.Router();
const tweet = require('../../model/tweet');

router.post('/tweet', async (req, res, next) => {
  const {
    content, // string
    img_urls // []
  } = req.body;
  const user_id = req.session.passport.user.id;

  // making sure all required data is valid before creating a user
  if (!content && (!img_urls || !img_urls.length)) {
    return res.status(203).json({
      msg: "No content or image!"
    });
  }

  const result = await tweet.create({
    tweetedBy: user_id,
    content: content,
    image: img_urls,
  });

  if (result) {
    return res.status(200).json({
      msg: "Successfully inserted.."
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;