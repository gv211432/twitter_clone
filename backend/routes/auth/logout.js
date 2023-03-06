// this routes unvalidates the valide user session
// which results in user logout form all routes filtering valid session
var express = require('express');
var router = express.Router();

router.post('/auth/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    return res.status(200).json({
      msg: "Successfully Logout"
    });
  });
});

module.exports = router;