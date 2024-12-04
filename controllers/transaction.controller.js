const Transaction = require('../models/transaction.model');

exports.sendTransaction = (req, res) => {
  const { amount, toAddress } = req.body;
  const transaction = new Transaction({ amount, toAddress, status: 'pending' });
  transaction.save((err) => {
    if (err) {
      res.status(500).send('Error sending transaction');
    } else {
      res.send('Transaction sent successfully');
    }
  });
};

exports.withdrawTransaction = (req, res) => {
  const { amount } = req.body;
  const transaction = new Transaction({ amount, status: 'withdrawn' });
  transaction.save((err) => {
    if (err) {
      res.status(500).send('Error withdrawing transaction');
    } else {
      res.send('Transaction withdrawn successfully');
    }
  });
};

exports.getTransactions = (req, res) => {
  Transaction.find({}, (err, transactions) => {
    if (err) {
      res.status(500).send('Error getting transactions');
    } else {
      res.send(transactions);
    }
  });
};