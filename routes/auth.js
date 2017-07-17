var express = require('express');
var router = express.Router();
var path = require('path');

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.send('Auth');
});

module.exports = router;