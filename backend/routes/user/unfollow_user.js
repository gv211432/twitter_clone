// this route unfollows user which is already followed
const express = require('express');
const router = express.Router();
const user = require('../../model/user');

router.post('/user/:id/unfollow', async (req, res) => {
  // console.log(req.session);
  const user_id = req.session.passport.user.id;
  const followers = await user.updateOne({
    _id: req.params.id,
    followers: { $in: [user_id] }
  }, {
    $pull: { followers: user_id }
  });
  const following = await user.updateOne({
    _id: user_id,
    following: { $in: [user_id] }
  }, {
    $pull: { following: user_id }
  });
  // console.log(user_data);

  if (followers.modifiedCount && following.modifiedCount) {
    // const { password, tmp } = user_data;
    return res.status(200).json({
      msg: "Updated Successfully",
    });
  } else {
    return res.status(403).json({
      msg: "Unable to update",
    });
  }
});

module.exports = router;