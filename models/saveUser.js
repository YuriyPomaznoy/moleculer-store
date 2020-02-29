var mongoose = require('mongoose');
var User = require('./User');
//var s = Math.random().toString(36).slice(2);
var options = {
  useNewUrlParser: true
};
mongoose.connect('mongodb://localhost:27017/moleculer-store', options);

var s = require('../credentials').authSecret;

var username = 'Yur';
var pass = 'f,hbrjc';

var user = new User({
  username: username,
  //secretKey: s,
  role: 'Admin',
  isAdmin: true
});

user.password = user.encryptPassword(pass, s);

user.save( err => {
  console.log(err);
  mongoose.disconnect();
});
