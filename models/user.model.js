const mongoose = require('mongoose');

const userDb = mongoose.createConnection('mongodb://localhost/account-manager', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
});

const User = userDb.model('User', UserSchema);

module.exports = { User, userDb }