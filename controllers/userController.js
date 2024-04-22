const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const genPassword = require('../lib/passwordUtils').genPassword;

exports.signUpGet = (req, res, next) => { 
  res.render('sign_up', {
    title: 'Sign Up',
  });
};

exports.signUpPost =  [
  body('firstName', 'First name must not be empty.').trim().escape(),
  body('lastName', 'Last name must not be empty.').trim().escape(),
  body('username', 'Username must not be empty and be at least 4 characters long.').trim().isLength({min: 4}).escape(),
  body('password', 'Password must not be empty and be at least 4 characters long.').trim().isLength({min: 4}).escape(),
  
  asyncHandler( async (req, res, next) => {
   const errors = validationResult(req);
   const hash = await genPassword(req.body.password);
  
   const newUser = new User({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     username: req.body.username,
     hash: hash,
     member: false,
     });

    await newUser.save();
    res.redirect('/sign-up');
  }),
];
