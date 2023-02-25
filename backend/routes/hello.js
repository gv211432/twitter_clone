var router = require('express').Router();

router.post('/hello', function (req, res, next) {
  res.send('Hello Gaurav' + req.body.data);
});

module.exports = router;
