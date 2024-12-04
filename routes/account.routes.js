const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller.js');

router.get('/accounts', accountController.getAccounts);
router.get('/accounts/:accountId/transactions', accountController.getTransactions);

module.exports = router;