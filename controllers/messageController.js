const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');

exports.createMessageGet = (req, res, next) => {
  res.render('create_message_form', {
    title: 'Create Message',
  });
};
