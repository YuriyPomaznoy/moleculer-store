const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../credentials').authSecret;
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");

module.exports = {
  name: "authorization",
  mixins: [DbService],
  adapter: new MongooseAdapter(process.env.MONGO_URI || 'mongodb://localhost:27017/moleculer-store',
  { useNewUrlParser: true, useUnifiedTopology: true }),
  model: User,

  actions: {
    validUser(ctx) {
      if(ctx.params.username && ctx.params.password) {
        var username = ctx.params.username;
        var password = ctx.params.password;
      }

      ctx.meta.$responseHeaders = {
        'Content-Type': 'text/plain'
      };
          
      return this.adapter.find({query: { username: username }})
        .then( users => {
          if(users[0].validPassword(password, secret)) {
            var payload = { userId: users[0].id };
            var token = jwt.sign(payload, secret);
            return token;
          }
        });
    }
  }
};