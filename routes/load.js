var express = require('express');
var router = express.Router();
var path = require('path');
var BigCommerce = require('node-bigcommerce');

var bigCommerce = new BigCommerce({
  secret: 'acbd18db4cc2f85cedef654fccc4a4d8',
  responseType: 'json'
});

/* GET load page */
router.get('/', function(req, res, next) {
  res.send('Load');
});

module.exports = router;