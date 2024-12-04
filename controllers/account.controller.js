const Account = require('../models/account.model');

exports.getAccounts = (req, res) => {
  const userId = req.user.id;
  User.findById(userId, (err, user) => {
    if (err || !user) {
      res.status(404).send('User not found');
    } else {
      res.send(user.accounts);
    }
  });
};

exports.getTransactions = (req, res) => {
  const userId = req.user.id;
  const accountId = req.params.accountId;
  User.findById(userId, (err, user) => {
    if (err || !user) {
      res.status(404).send('User not found');
    } else {
      const account = user.accounts.find((account) => account._id.toString() === accountId);
      if (!account) {
        res.status(404).send('Account not found');
      } else {
        res.send(account.transactions);
      }
    }
  });
};