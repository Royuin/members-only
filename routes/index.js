var express = require('express');
const asyncHandler = require('express-async-handler');
var router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const passport = require('passport');
const Message = require('../models/message');
const User = require('../models/user');

/* GET home page. */
router.get('/',  asyncHandler ( async (req, res, next) => {
  const messages = await Message.find();
  const newMessages = await Promise.all (messages.map (async (message) => {
    const author = await User.findById(message.author);
    const newMessage = {
      id: message._id,
      title: message.title,
      message: message.message,
      author: message.author,
      dateUploaded: message.dateUploaded,
      authorUsername: author.username,
    }
    return newMessage;
  }));

  res.render('index', {
    title: 'Members Only',
    messages: newMessages,
    user: req.user,
  });
}));

router.post('/', messageController.deleteMessage);

router.get('/log-in', userController.logInGet);
router.post('/log-in', passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/' }), );

router.get('/logout', userController.logOut);

router.get('/sign-up', userController.signUpGet); 
router.post('/sign-up', userController.signUpPost);

router.get('/create-message', messageController.createMessageGet);
router.post('/create-message', messageController.createMessagePost);


module.exports = router;
