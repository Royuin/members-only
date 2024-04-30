const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');

exports.createMessageGet = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('create_message_form', {
      title: 'Create Message',
    });
  } else {
    res.render('not_logged_in', {
      title: 'Not Logged In',
    });
  };
};

exports.createMessagePost = [
  body('title', 'Title must not be empty.').notEmpty().trim().isLength({ max: 20 }).escape(),
  body('message', 'Message must not be empty.').notEmpty().trim().isLength({ max: 100 }).escape(),

  asyncHandler ( async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('create_message_form', {
        title: 'Create Message',
        errors: errors,
      });
    } else {
      const newMessage = new Message({ title: req.body.title, message: req.body.message, author: req.user });
      await newMessage.save();
      res.redirect('/');
    }
  }),
];

exports.deleteMessage = asyncHandler ( async (req, res, next) => {
  const message = await Message.findById(req.body.messageDelete);
  await message.deleteOne();
  res.redirect('/');
});
