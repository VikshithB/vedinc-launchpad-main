"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(5, "Name must be at least 5 characters")
        .max(50, "Name too long")
        .trim(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password too long"),
});
