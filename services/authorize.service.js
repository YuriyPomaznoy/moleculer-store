const User = require('../models/User')
    , jwt = require('jsonwebtoken')
    , secret = require('../credentials').authSecret
    , DbService = require("moleculer-db")
    , MongooseAdapter = require("moleculer-db-adapter-mongoose");

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

      ctx.meta.$responseType = 'text/plain;charset=utf-8'; //$responseHeaders
          
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