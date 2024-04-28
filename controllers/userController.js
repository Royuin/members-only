const { body, validationResult } = require('express-validator');console.log
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const genPassword = require('../lib/passwordUtils').genPassword;

exports.logInGet = (req, res, next) => {
  res.render('log_in', {
    title: 'Log In',
  });
}

exports.signUpGet = (req, res, next) => { 
  res.render('sign_up', {
    title: 'Sign Up',
  });
};

exports.signUpPost =  [
  body('firstName', 'First name must not be empty.').trim().notEmpty().escape(),
  body('lastName', 'Last name must not be empty.').trim().notEmpty().escape(),
  body('username', 'Username must not be empty and be at least 4 characters long.').trim().isLength({min: 4}).escape(),
  body('password', 'Password must not be empty and be at least 4 characters long.').trim().isLength({min: 4}).escape(),
  body('confirmPassword', 'Passwords must match.').custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    const userExists = await User.findOne({username: req.body.username});
    
    if (!errors.isEmpty()) {
      res.render('sign_up', {
        title: 'Sign Up',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        errors: errors.array(),
      });
      return;
    } else if (userExists) {
      res.render('sign_up', {
        title: 'Sign Up',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        userExists: userExists, 
      });
      return;
    } else {
      const hash = await genPassword(req.body.password);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        hash: hash,
        member: false,
      });

      await newUser.save();
      res.redirect('/');
    }
  }),
];
