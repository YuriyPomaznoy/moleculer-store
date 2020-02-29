const HTTPServer = require("moleculer-web");
const myMiddleware = require('../middlewares/my.middleware');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var secret = require('../credentials').authSecret;
const passport = require('passport');
var authenticationStrategy = require('../lib/authentication');

module.exports = {
  name: "gateway",
  mixins: [HTTPServer],

  settings: {
    
    routes: [{
      
      path: "/",
      //use: [
      //  myMiddleware
      //],
      aliases: {

        "GET /products/:id": [
          function(req, res, next) {
            passport.authenticate('jwt', { session: false }, function(err, user, info) {
                          console.log('errrrrr', err);
                          console.log('USERRRRRRR', user);
                          console.log('INFO', info);
              if(user) next();
            })(req, res, next);
          },
            function (req, res) {
                          console.log(req['$params'], req.query);
                          console.log(req.headers.authorization);
              var params = { name: req.query.name, price: req.query.price };
              this.broker.call("products.listProducts", params)
                .then( result => {
                  res.setHeader('content-type', 'application/json;charset=utf-8');
                  res.end(JSON.stringify(result));
                })
                .catch( err => {
                  console.log(err);
                });
            }
        ],
        "GET /hellomiddl": [
          myMiddleware, 
          function(req, res) {
            this.broker.call("WithMiddl.helloMiddleware", {myname: res.locals.myname})
              .then( result => {
                res.setHeader('content-type', 'text/plain;charset=utf-8');
                res.end(result);
              })
              .catch( err => {
                console.log(err);
              });
          }
        ],
        "POST /login"(req, res) {
          if(req.body.username && req.body.password) {
            var username = req.body.username;
            var password = req.body.password;
          }
          
          User.findOne({ username: username })
            .then( user => {
              if(user.validPassword(password, secret)) {
                var payload = { userId: user.id };
                var token = jwt.sign(payload, secret);
                res.end(token);
              }
            });
        }
      }
    }],

    assets: {
      folder: "public",

      // Options to `server-static` module
      options: {}
    }

  },

  started() {
    authenticationStrategy(passport);
  }
};