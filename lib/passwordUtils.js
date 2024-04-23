const bcrypt = require('bcrypt');

function genPassword(password) {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

function validatePassword(password, hash, salt) {
  const isValid = bcrypt.compare(password, hash, function(err, result) {});
  if (isValid) {
    console.log('YOU HAVE BEEN VALIDATED');
  } else if (!isValid) {
    console.log('YOU HAVE NOT BEEN VALIDATED');
  };
}

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;
