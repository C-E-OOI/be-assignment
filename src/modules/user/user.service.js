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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.getUsers = getUsers;
const prisma_1 = require("../../../utils/prisma");
const hash_1 = require("../../../utils/hash");
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = input, rest = __rest(input, ["password"]);
        const { hash, salt } = (0, hash_1.hashPassword)(password);
        const user = yield prisma_1.db.users.create({
            data: Object.assign(Object.assign({}, rest), { salt, password: hash })
        });
        return user;
    });
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.db.users.findUnique({
            where: {
                email
            }
        });
    });
}
;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.db.users.findMany({
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
            }
        });
    });
}
