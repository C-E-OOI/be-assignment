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
exports.registerUserHandler = registerUserHandler;
exports.loginHandler = loginHandler;
exports.getUsersHandler = getUsersHandler;
exports.logoutHandler = logoutHandler;
const user_service_1 = require("./user.service");
const hash_1 = require("../../../utils/hash");
function registerUserHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        try {
            const user = yield (0, user_service_1.createUser)(body);
            return reply.status(201).send(user);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({
                message: "Internal Server Error",
                error: error
            });
        }
    });
}
function loginHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        // Find a user by email 
        const user = yield (0, user_service_1.findUserByEmail)(body.email);
        if (!user) {
            return reply.status(401).send({
                message: "Invalid email address. Try again!"
            });
        }
        ;
        // Verify password
        const isValidPassword = (0, hash_1.verifyPassword)({
            candidatePassword: body.password,
            salt: user.salt,
            hash: user.password
        });
        if (!isValidPassword) {
            return reply.status(401).send({
                message: "Password is incorrect"
            });
        }
        ;
        // Generate access token
        const payload = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            username: user.username,
        };
        const token = request.jwt.sign(payload);
        reply.setCookie('access_token', token, {
            path: '/',
            maxAge: 1000 * 60 * 30, // for 30 minutes
            httpOnly: true,
            secure: true,
        });
        return { accessToken: token };
    });
}
function getUsersHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_service_1.getUsers)();
        return users;
    });
}
function logoutHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        reply.clearCookie('access_token');
        return reply.status(201).send({ message: 'Logout successfully' });
    });
}
