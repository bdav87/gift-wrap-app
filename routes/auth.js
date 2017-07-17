var express = require('express');
var router = express.Router();
var path = require('path');
var BigCommerce = require('node-bigcommerce');

var clientId = process.env.CLIENTID;
var clientSecret = process.env.SECRET;

var bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: clientId,
  secret: clientSecret,
  callback: '/auth',
  responseType: 'json'
});

/* GET auth page. */
router.get('/', function(req, res) {
  bigCommerce.authorise(req.query, function(err, data){
    res.render('index', { title: 'Authorised!', data: data });
  })
});

module.exports = router;