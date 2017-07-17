var express = require('express');
var router = express.Router();
var path = require('path');

/* GET uninstall page. */
router.get('/', function(req, res, next) {
  res.send('Uninstall');
});

module.exports = router;