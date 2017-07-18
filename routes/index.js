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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

/* GET auth page. */
router.get('/auth', function(req, res) {
  bigCommerce.authorise(req.query, function(err, data){
    console.log(bigCommerce.config);
    res.render('index', {data: data});
  })
});

/* GET load page */
router.get('/load', function(req, res, next) {
  bigCommerce.callback(req.query['signed_payload'], function(err, data){
    res.render('index', { title: 'Welcome!', data: data });
  })
});

/* GET uninstall page. */
router.get('/uninstall', function(req, res, next) {
  res.send('Uninstall');
});

module.exports = router;
