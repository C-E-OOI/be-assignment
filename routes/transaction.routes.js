const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller.js');


router.post('/transactions', transactionController.sendTransaction);
router.post('/transactions/withdraw', transactionController.withdrawTransaction);
router.get('/transactions', transactionController.getTransactions);

module.exports = router;