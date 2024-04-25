const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const  { validatePassword }  = require('../lib/passwordUtils');

async function verifyCallback (username, password, done) {
  const user = await User.findOne({ username: username })
  if (!user) {return done(null, false) }

  const isValid = validatePassword(password, user.hash);

  if (isValid) {
    return done(null, user);
  } else if (!isValid) {
    return done(null, false);
  }

  if (err) {
    done(err);
  };
}

const strategy = new LocalStrategy(verifyCallback);

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, {
      id: user.id,
      username: user.username,
    });
  });
  // done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
  // User.findById(userId)
  //   .then((user) => {
  //     done(null, user);
  //   })
  //   .catch(err => done(err))
});

passport.use(strategy);  
