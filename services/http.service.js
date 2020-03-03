const HTTPServer = require("moleculer-web");
const myMiddleware = require('../middlewares/my.middleware');
const passport = require('passport');
const authenticationStrategy = require('../lib/authentication');

module.exports = {
  name: "gateway",
  mixins: [HTTPServer],

  settings: {
    
    routes: [{
      
      path: "/",

      aliases: {

        "GET /products/:id": [
            passport.authenticate('jwt', { session: false }),
            function (req, res) {
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
        "POST /login": "authorization.validUser"
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