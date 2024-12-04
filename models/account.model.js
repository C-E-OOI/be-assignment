const mongoose = require('mongoose');

const accountDb = mongoose.createConnection('mongodb://localhost/account-manager', { useNewUrlParser: true, useUnifiedTopology: true });
const paymentDb = mongoose.createConnection('mongodb://localhost/payment-manager', { useNewUrlParser: true, useUnifiedTopology: true });

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  timestamp: Date,
  toAddress: String,
  status: String
});

const Transaction = paymentDb.model('Transaction', TransactionSchema);

const AccountSchema = new mongoose.Schema({
  type: String,
  balance: Number,
  transactions: [{ type: mongoose.Schema.Types.ObjectId }]
});

const Account = accountDb.model('Account', AccountSchema);

module.exports = { Account, accountDb, paymentDb, Transaction }