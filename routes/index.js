var express = require('express');
const expressAsyncHandler = require('express-async-handler');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/sign-up', userController.signUpGet); 
router.post('/sign-up', userController.signUpPost);

module.exports = router;
