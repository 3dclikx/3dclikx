var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs = monk('localhost:27017/3dclikx');
var clikx = dbs.get("usersignin"); ///sign up data base
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/3dproduct', function(req, res, next) {
  res.render('product');
});
router.get('/robotics', function(req, res, next) {
  res.render('product2');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/help', function(req, res, next) {
  res.render('help');
});
router.get('/terms', function(req, res, next) {
  res.render('terms');
});
router.get('/faqs', function(req, res, next) {
  res.render('faqs');
});
router.get('/privacy', function(req, res, next) {
  res.render('privacy');
});
router.get('/single', function(req, res, next) {
  res.render('single');
});
router.get("/custome", function(req, res, next){
	res.render('custome');
})
router.get("/keychain", function(req, res, next){
	res.render('keychain');
})
router.get("/view", function(req, res, next){
	res.render('single');
});



//Signup part from to register the image
router.post("/usersignup", function(req, res, next){
  var data={
    username: req.body.username,
    useremail: req.body.userEmail,
    userAddress: req.body.useraddress,
    userpasswrod: req.body.password,
    status : '0'
  }
  clikx.findOne({username : req.body.username}, function(err, doc){
  if(err)
  {
    throw err;
  }
  else if(!doc)
  {
      clikx.insert(data, function(err, doc){
      if(!doc){
        res.render('index');
      }
      else
      {
        res.send("<html><script>alert('Thank you! For your Registration'); location.href='index';</script></html>");
      }
    });
  }
  else
  {
    res.send("<html><script>alert('Your are already registered'); location.href='index';</script></html>");
  }
  });
});
// =================== END OF SIGNUP ===========================



// ====================USER LOGIN PART STARTED =================
router.post("/userlogin", function(req, res){
  var data = {
    useremail : req.body.loginemail,
    userpassword : req.body.loginPassword
  }
  clikx.findOne(data, function(err, doc){
    if(!doc){
      res.send("<html><script>alert('Email or password is wrong'); location.href='index';</script></html>");
    }
    else
    {
      res.send("<html><script>alert('You are signed in ');location.href='index';</script></html>");
    }
  });

});
module.exports = router;
