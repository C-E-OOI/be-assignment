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
const status_1 = require("../constants/status");
const supabase_1 = require("../config/supabase");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { data: user, error } = yield supabase_1.supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error)
                return res.status(status_1.STATUS.NETWORK_ERROR).json({ error: error.message });
            return (res
                .status(status_1.STATUS.SUCCESS)
                .json({ user }));
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { data: user, error } = yield supabase_1.supabase.auth.signUp({
                email,
                password
            });
            if (error)
                return res.status(status_1.STATUS.BAD_REQ).json({ error: error.message });
            return (res
                .status(status_1.STATUS.SUCCESS)
                .json({ user }));
        });
    }
}
exports.default = AuthController;
