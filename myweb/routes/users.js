var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* login */
router.get('/login', function (req, res, next) {
  res.render('pages/login');
})
/* regist */
router.get('/regist', function (req, res, next) {
  res.render('pages/regist');
})
/**logout */
router.get('/logout', function (req, res, next) {
  res.render('pages/logout');
})


module.exports = router;
