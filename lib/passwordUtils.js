const bcrypt = require('bcrypt');

function genPassword(password) {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

function validatePassword(password, hash) {
  const result = bcrypt.compareSync(password, hash, function() {
  });
  return result
}

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;
