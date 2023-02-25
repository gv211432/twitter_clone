// this route creates new session entry on successful login 
// usign user name and password
const express = require('express');
const router = express.Router();
const passport = require("../../middleware/auth_login");

router.post('/auth/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    return res.status(200).json({
      msg: "Login successfull!",
      session: req.session.cookie
    });
  });

module.exports = router;