const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  hash: { type : String, required: true },
  member: { type: Boolean, required: true },
});
  
module.exports = mongoose.model('User', UserSchema);
