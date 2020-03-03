const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const secretKey = require('../credentials').authSecret;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: String,
  role: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { usePushEach: true });

userSchema.methods.encryptPassword = function(password, secretKey) {
  return crypto.createHmac('sha1', secretKey)
               .update(password)
               .digest('base64');
};

userSchema.methods.validPassword = function(password, secretKey) {
  //return password === this.pass;
  return this.encryptPassword(password, secretKey) === this.password;
};

var User = mongoose.model('User', userSchema);
module.exports = User;