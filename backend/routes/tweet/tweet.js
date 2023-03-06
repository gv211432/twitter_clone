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
  const user_name = req.session.passport.user.username;

  // making sure all required data is valid before creating a user
  if (!content && (!img_urls || !img_urls.length)) {
    return res.status(203).json({
      msg: "No content or image!"
    });
  }

  const result = await tweet.create({
    tweetedBy: user_id,
    tweetedByUsername: user_name,
    content: content,
    image: img_urls,
  });
  // console.log(JSON.stringify(result));
  if (result) {
    return res.status(200).json({
      msg: "Successfully inserted..",
      data: { ...JSON.parse(JSON.stringify(result)), user: [req.session.passport.user] }
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;