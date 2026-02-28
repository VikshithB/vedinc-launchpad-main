"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const findUserByEmail = (email) => {
    return prisma_1.default.user.findUnique({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const createUser = (name, email, passwordHash, role) => {
    return prisma_1.default.user.create({
        data: {
            name,
            email,
            passwordHash,
            role,
        },
    });
};
exports.createUser = createUser;
