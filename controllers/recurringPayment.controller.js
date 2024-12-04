const RecurringPayment = require('../models/recurringPayment.model');

exports.createRecurringPayment = (req, res) => {
  const { userId, accountId, amount, interval } = req.body;
  const recurringPayment = new RecurringPayment({ userId, accountId, amount, interval });
  recurringPayment.save((err) => {
    if (err) {
      res.status(500).send('Error creating recurring payment');
    } else {
      res.send('Recurring payment created successfully');
    }
  });
};

exports.getRecurringPayments = (req, res) => {
  RecurringPayment.find({}, (err, recurringPayments) => {
    if (err) {
      res.status(500).send('Error getting recurring payments');
    } else {
      res.send(recurringPayments);
    }
  });
};