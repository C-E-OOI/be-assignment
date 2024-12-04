const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/payment-manager', { useNewUrlParser: true, useUnifiedTopology: true });

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  timestamp: Date,
  toAddress: String,
  status: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);