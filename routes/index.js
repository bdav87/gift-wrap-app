var express = require('express');
var router = express.Router();
var path = require('path');
var BigCommerce = require('node-bigcommerce');
var bodyParser = require('body-parser');
var http = require('http');

router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var clientId = process.env.CLIENTID;
var clientSecret = process.env.SECRET;
var storeHash = function(str){
  return str.split('/')[1];
};
var hookCreated;

var bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: clientId,
  secret: clientSecret,
  callback: 'https://gift-wrap-app.herokuapp.com/auth',
  responseType: 'json'
});

var order = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

/* GET auth page. */
router.get('/auth', function(req, res) {
  bigCommerce.authorise(req.query, function(err, data){
    var stringRef = JSON.stringify(bigCommerce.config);
    var dataStringRef = JSON.stringify(data);
    console.log("BC Config: " + stringRef + "\n" + "BC Data: " + dataStringRef);

    console.log('access token: ' + data.access_token);
    bigCommerce.config.accessToken = data.access_token;
    bigCommerce.config.storeHash = storeHash(data.context);


    checkWebHooks();
    checkBigConfig(bigCommerce);
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
  })
});

/* GET load page */
router.get('/load', function(req, res, next) {
  checkWebHooks();
  checkBigConfig(bigCommerce.config);
  bigCommerce.callback(req.query['signed_payload'], function(err, data){
    console.log("BC Config after Load: " + checkBigConfig(bigCommerce));
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
  })
});

/* GET uninstall page. */
router.get('/uninstall', function(req, res, next) {
  res.send('Uninstall');
});

router.post('/status', function(req, res, next) {
console.log('from client: ' + JSON.stringify(req.body));
var clientResponse = JSON.stringify(req.body.status_id);
res.send(clientResponse);
});

router.get('/webhook', function(req,res) {
  bigCommerce.get('/hooks', function(err, data, response){
    console.log("gethook data: " + data);
    res.send('test');
});
/*
router.post('/webhook', function(req,res) {
    res.send(req.body);
});
*/

function setPreferredStatus(id){
  return order.status_id = id;
}

function checkWebHooks(){

    bigCommerce.get('/hooks', function(err, data, response){

      console.log('Checking existing hooks' + "\n" + "------------");
      console.log('data: ' + Object.keys(data));
      console.log('response: ' + Object.keys(response));
      console.log('err: ' + err);

      if (!hookCreated || data[0].length < 1){
        createHooks();
      } else {
        console.log(data[0]);
      }

    });

  }

function createHooks(){
  var hook = {
    scope: 'store/order/created',
    destination: 'https://gift-wrap-app.herokuapp.com/webhook'
  }
  bigCommerce.post('/hooks', hook, function(err, data, response) {
    console.log('data returned: ' + Object.keys(data));
    hookCreated = true;
    checkBigConfig(data);
  })
}


function checkBigConfig(config){

  console.log('current BC config object: ' + (function(){
    return JSON.stringify(config);
  }()))
}

module.exports = router;