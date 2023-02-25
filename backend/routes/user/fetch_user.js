// this rotue fetches the user with given user id
const express = require('express');
const router = express.Router();
const user = require('../../model/user');

router.get('/user/:id', async (req, res) => {
  const user_data = (await user.find({ _id: req.params.id }).lean())[0];
  if (user_data) {
    // const { password, tmp } = user_data;
    return res.status(200).json({
      msg: "Fetched Successfully",
      data: user_data
    });
  } else {
    return res.status(403).json({
      msg: "User not found!",
    });
  }
});

module.exports = router;