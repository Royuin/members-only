const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, maxLength: 20, required: true },
  message: { type: String, maxlength: 100, required: true },
  dateUploaded: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Message', MessageSchema);
