var express = require('express');
var router = express.Router();
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

module.exports = router;
