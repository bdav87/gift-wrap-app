var express = require('express');
var router = express.Router();
var path = require('path');

/* GET load page */
router.get('/', function(req, res, next) {
  res.send('Load');
});

module.exports = router;