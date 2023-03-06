// this route handles the user update request.
const express = require('express');
const router = express.Router();
const user = require('../../model/user');

router.post('/edit_user/:id', async (req, res, next) => {
  const {
    name,
    date_of_birth,
    location
  } = req.body;
  const user_id = req.session.passport.user.id;

  console.log({
    name: name,
    date_of_birth: date_of_birth,
    location: location
  });
  // updating a user record
  const update_user = await user.updateOne({ _id: user_id },
    {
      name: name,
      date_of_birth: date_of_birth,
      location: location
    });
  console.log(update_user);

  // updating the current user session data before response
  if (update_user.modifiedCount) {
    req.session.passport.user = {
      ...req.session.passport.user,
      name: name,
      date_of_birth: date_of_birth,
      location: location
    };
    return res.status(200).json({
      msg: "Successfully updated.."
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;