var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/moleculer-store',
  { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;