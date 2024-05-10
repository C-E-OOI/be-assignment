"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const paymentRoutes = (0, express_1.Router)();
exports.default = paymentRoutes.get('/', paymentController_1.paymentController.getAllPaymentAccounts)
    .get('/:id', paymentController_1.paymentController.getPaymentAccountById)
    .get('/:id/history', paymentController_1.paymentController.getPaymentHistoryByAccountId)
    .post('/', paymentController_1.paymentController.createPaymentAccount);
