"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const auth_service_1 = require("./auth.service");
const jwt_1 = require("../../utils/jwt");
const auth_repo_1 = require("./auth.repo");
const hash_1 = require("../../utils/hash");
const client_1 = require("@prisma/client");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required",
            });
        }
        const user = await (0, auth_service_1.loginUser)(email, password);
        const token = (0, jwt_1.signToken)({
            id: user.id,
            role: user.role,
        });
        return res.json({
            message: "Login successful",
            token,
            user,
        });
    }
    catch {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
};
exports.login = login;
// ✅ NEW: SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }
        // prevent duplicate emails
        const exists = await (0, auth_repo_1.findUserByEmail)(email);
        if (exists) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }
        const passwordHash = await (0, hash_1.hashPassword)(password);
        const user = await (0, auth_repo_1.createUser)(name, email, passwordHash, client_1.UserRole.USER // 🔒 force USER role
        );
        const token = (0, jwt_1.signToken)({
            id: user.id,
            role: user.role,
        });
        return res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Signup failed",
        });
    }
};
exports.signup = signup;
