const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.signUpGet = (req, res, next) => { 
  res.render('sign_up', {
    title: 'Sign Up',
  });
};

