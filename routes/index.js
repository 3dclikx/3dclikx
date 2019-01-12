var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs = monk('localhost:27017/3dclikx');
var clikx = dbs.get("usersignin"); ///sign up data base
var cutomeOrder = dbs.get("customeorder");  //custome order
var email   = require('emailjs/email');
var nodemailer = require('nodemailer');    // email package for sending email
//var upload = require('express-fileupload');    // multipart request taking by the servervar 
var multer = require('multer');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user)
  {
    console.log(req.session.error);
     return res.render('index',{ user : req.session.user, error:req.session.error, success:req.session.success });
      req.session.error = null;
  }
  else
  {
    
   return res.render('index', {user : req.session.user});
  }
  
});
router.get('/index', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('index',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('index', {user : req.session.user});
  }
  
});
router.get('/3dproduct', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('product',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('product', {user : req.session.user});
  }
  
});
router.get('/robotics', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('product2',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('product2', {user : req.session.user});
  }
  
});
router.get('/about', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('about',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('about', {user : req.session.user});
  }
  
});
router.get('/contact', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('contact',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('contact', {user : req.session.user});
  }
  
});
router.get('/help', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('help',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('help', {user : req.session.user});
  }
  
});
router.get('/terms', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('terms',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('terms', {user : req.session.user});
  }
  
});
router.get('/faqs', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('faqs',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('faqs', {user : req.session.user});
  }
  
});
router.get('/privacy', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('privacy',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('privacy', {user : req.session.user});
  }
  
});
router.get('/single', function(req, res, next) {
  if(req.session.user)
  {
    return res.render('custome',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    return res.render('single', {user : req.session.user});
  }
 
  
});
router.get("/custome", function(req, res, next){
  if(req.session.user)
  {
    
	  return res.render('custome',{ user : req.session.user, error:req.session.error, success:req.session.success });
    req.session.error = null;
  }
  else
  {
    res.send("<html><script>alert('please login First'); location.href='index';</script></html>");
    
  }

})
router.get("/keychain", function(req, res, next){
	res.render('keychain', {user : req.session.user});
})
router.get("/view", function(req, res, next){
	res.render('single', {user : req.session.user});
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
    userpasswrod : req.body.loginPassword
  }
  clikx.findOne(data, function(err, doc){
    if(!doc){
      var error = err;
      req.session.error = error;
      req.session.success = false;
      res.send("<html><script>alert('Email or password is wrong'); location.href='index';</script></html>");
    }
    else
    {
      delete doc.userpasswrod;
      delete doc._id;
      req.session.user = doc;
      req.session.error=null;
      req.session.success = true;
      res.send("<html><script>alert('You are signed in ');location.href='index';</script></html>");
    }
  });

});
// ===============================END of login================================


// =============================== LOG OUT ===================================
router.get("/logout", function(req, res){

  req.session.destroy();
  req.session.user = false;
  return res.redirect("..");

});

// ==============================LOG END======================================


// ==============================custome input================================
var upload = multer({ dest: 'uploads/' })
router.post('/customepost', upload.single('originalname'), function (req, res, next) {
  var data = {
      customename : req.body.customename,
      customeEmail : req.body.customeEmail,
      originalname : req.file.originalname,
      Message : req.body.Message,
      userData : req.session.user  
  }

  cutomeOrder.insert(data, function(err, doc){
    if(doc){
      res.send("<html><script>alert('Thank you for order we will get touch you soon ');location.href='index';</script></html>");
    }
    else{
      res.send("<html><script>alert(' Something went wrong.<br> please Try again ');location.href='index';</script></html>");
    }
  });
  console.log(data);
});
// ==============================custome end  ================================



// ==============================Fogot password ===============================


module.exports = router;
