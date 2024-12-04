const express = require('express');
const router = express.Router();
const recurringPaymentController = require('../controllers/recurringPayment.controller.js');

router.post('/recurring-payments', recurringPaymentController.createRecurringPayment);
router.get('/recurring-payments', recurringPaymentController.getRecurringPayments);

module.exports = router;
