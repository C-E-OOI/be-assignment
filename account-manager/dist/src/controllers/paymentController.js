"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const status_1 = require("../constants/status");
const paymentService_1 = require("../services/paymentService");
exports.paymentController = {
    paymentHistory: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paymentAccounts = yield paymentService_1.paymentService.getAllPaymentAccounts();
            res
                .status(status_1.STATUS.SUCCESS)
                .json(paymentAccounts);
        }
        catch (error) {
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    }),
    createPayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPaymentAccount = yield paymentService_1.paymentService.createPaymentAccount(req.body);
            res.status(status_1.STATUS.CREATED).json(newPaymentAccount);
        }
        catch (error) {
            console.error('Error creating payment account:', error);
            res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
        }
    })
};
