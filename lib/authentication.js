var mongoose = require('mongoose');
var User = require('../models/User');
var secret = require('../credentials').authSecret;
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

module.exports = function(passport) {
  var jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = secret;

  passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
                              // console.log(jwt_payload);
    User.findById(jwt_payload.userId)
      .then( user => {
        if (user) {
          return done(null, user);  
        } else {
          return done(null, false);
        }
      })
      .catch( err => {
        console.error(err);
      });
  }));
};