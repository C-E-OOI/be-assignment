"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const paymentRoutes = (0, express_1.Router)();
exports.default = paymentRoutes.get('/accounts', paymentController_1.paymentController.getAllPaymentAccounts)
    .get('/accounts/:id', paymentController_1.paymentController.getPaymentAccountById)
    .get('/accounts/:id/history', paymentController_1.paymentController.getPaymentHistoryByAccountId)
    .post('/accounts', paymentController_1.paymentController.createPaymentAccount);
