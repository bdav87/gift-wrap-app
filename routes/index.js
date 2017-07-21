var express = require('express');
var router = express.Router();
var path = require('path');
var BigCommerce = require('node-bigcommerce');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var clientId = process.env.CLIENTID;
var clientSecret = process.env.SECRET;

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
    bigCommerce.access_token = data.access_token;
    checkWebHooks();
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
  })
});

/* GET load page */
router.get('/load', function(req, res, next) {
  bigCommerce.callback(req.query['signed_payload'], function(err, data){
    var stringRef = JSON.stringify(bigCommerce.config);
    console.log("BC Config after Load: " + stringRef);
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
  })
});

/* GET uninstall page. */
router.get('/uninstall', function(req, res, next) {
  res.send('Uninstall');
});

router.post('/status', function(req, res) {

  console.log('req: ' + req.body.status);

  res.send('status updated to ' + req.body.status);
})


function setPreferredStatus(id){
  return order.status_id = id;
}

function checkWebHooks(){
  bigCommerce.get('/hooks', function(err, data, response){
    console.log('Checking existing hooks' + "\n" + "------------");
    console.log('data: ' + data);
    console.log('response: ' + response);
    console.log('err: ' + err);
  })
}

module.exports = router;
