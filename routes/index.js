var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs = monk('localhost:27017/3dclikx');
var clikx = dbs.get("usersignin"); ///sign up data base
var cutomeOrder = dbs.get("customeorder");  //custome order
var email   = require('emailjs/email');
var nodemailer = require('nodemailer'); 
// const xoauth2 = require('xoauth2');   // email package for sending email
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
    return res.render('single',{ user : req.session.user, error:req.session.error, success:req.session.success });
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

router.post("/forgotpassword", function(req, res){
  clikx.findOne({useremail : req.body.email}, function(err, doc){
    if(doc)
    {

            
             var transporter =  nodemailer.createTransport({
                                service: 'gmail',
                                 host: 'smtp.gmail.com',
                                port: 465,
                                secure: true, // use SSL
                                auth: {
                                    user: '',
                                    pass: ''
                                }
                            });
            var msg = "<html><body class=\"\" style=\"\/* background-color: #7acbee; *\/font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color: #7acbee;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><td class=\"container\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;\"><div class=\"content\" style=\"box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;\"><!-- START CENTERED WHITE CONTAINER --><span class=\"preheader\" style=\"color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;\"><\/span><table class=\"main\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;\"><tbody><tr><td class=\"wrapper\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;margin-left: 210px;\"><img src='http:\/\/www.digitalgujarat.gov.in\/images\/logo.png' width=\"80px\"><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Hi "+req.body.email+", <br><br>Your Account Has Been Created successfully<\/b><\/p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;\"><tbody><tr><td align=\"left\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><center><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;\"><\/td><\/tr><\/tbody><\/table><\/center><\/td><\/tr><\/tbody><\/table><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;\"><\/p><center><b><\/b><\/center><p><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Thanks &amp; Regards,<br>Team#Six.<\/p><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><!-- START FOOTER --><div class=\"footer\" style=\"clear:both;padding-top:10px;text-align:center;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td class=\"content-block\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: #000000;font-size:12px;text-align:center;\"><span class=\"apple-link\" style=\"color: #000000;font-size:12px;text-align:center;\">Govt of Gujarat<\/span><br>This email is system generated, please do not respond to this email.<\/td><\/tr><tr><td class=\"content-block powered-by\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: black;font-size:12px;text-align:center;\">Powered by Team#six. <br><a href='#' target=\"_blank\" style=\"color:white;\" ><\/a><\/td><\/tr><\/tbody><\/table><\/div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --><\/div><\/td><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><\/tr><\/tbody><\/table><\/body><\/html>";            
            var mailOptions = {
            from: '"SIH " <myhub@aditya.ac.in>', // sender address
            to:"airrakeshkumarsharma@gmail.com", // list of receivers
            subject: 'Caste Verification',
            //text: msg // plaintext body
            html: msg // html body
            }

            // send the message and get a callback with an error or details of the message that was sent
            transporter.sendMail(mailOptions, function(error, response){
            if(error){
            console.log("Email could not sent due to error: "+error);
            }else{
            console.log("Email has been sent successfully");
            }
            });
    }
  });
    
});

// ==============================Fogot password ===============================


// ==============================End Password =================================
module.exports = router;
