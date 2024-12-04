const mongoose = require('mongoose');

const recurringPaymentDb = mongoose.createConnection('mongodb://localhost/payment-manager', { useNewUrlParser: true, useUnifiedTopology: true });

const RecurringPaymentSchema = new mongoose.Schema({
  userId: String,
  accountId: String,
  amount: Number,
  interval: String // e.g. daily, weekly, monthly
});

const RecurringPayment = recurringPaymentDb.model('RecurringPayment', RecurringPaymentSchema);

module.exports = {RecurringPayment, recurringPaymentDb}