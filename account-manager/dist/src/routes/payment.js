"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const paymentRoutes = (0, express_1.Router)();
exports.default = paymentRoutes.get('/payment-accounts', paymentController_1.paymentController.paymentHistory)
    .post('/payment-accounts', paymentController_1.paymentController.createPayment);
