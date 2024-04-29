const { body, validationResult } = require('express-validator');console.log
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const genPassword = require('../lib/passwordUtils').genPassword;
const passport = require('passport');

exports.logInGet = (req, res, next) => {
  res.render('log_in', {
    title: 'Log In',
  });
}

exports.logOut = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

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
  body('confirmPassword', 'Passwords must match.')
  .custom((value, { req }) => {
    return value === req.body.password;
  }).escape(),
  body('isMember', 'Wrong passcode please try again, or sign up without being a member.').optional({checkFalsy: true})
  .custom(value => {
    if (value) {
    return value === process.env.MEMBER_PASSCODE;
    } 
  }).escape(),

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

      const isMember = req.body.isMember === process.env.MEMBER_PASSCODE;
      const admin = req.body.isAdmin ? true : false

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        hash: hash,
        member: isMember,
        admin: admin,
      });

      // MAKE USER AUTOMATICALLY LOGIN WHEN ACCOUNT IS CREATED
      await newUser.save();
      res.redirect('/');
    }
  }),
];
