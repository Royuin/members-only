var express = require('express');
const expressAsyncHandler = require('express-async-handler');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/log-in', userController.logInGet);
router.post('/log-in', passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/' }), );

router.get('/sign-up', userController.signUpGet); 
router.post('/sign-up', userController.signUpPost);

module.exports = router;
