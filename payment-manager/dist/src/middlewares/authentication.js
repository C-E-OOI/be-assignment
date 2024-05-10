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
exports.authMiddleware = void 0;
const supabase_1 = require("../config/supabase");
const status_1 = require("../constants/status");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(status_1.STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
        }
        const { data: user, error } = yield supabase_1.supabase.auth.getUser(token);
        if (error) {
            console.error('Error authenticating user:', error);
            return res.status(status_1.STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
        }
        if (!user) {
            return res.status(status_1.STATUS.AUTHORIZATION_ERROR).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(status_1.STATUS.NETWORK_ERROR).json({ error: 'Internal Server Error' });
    }
});
exports.authMiddleware = authMiddleware;
