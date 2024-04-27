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
