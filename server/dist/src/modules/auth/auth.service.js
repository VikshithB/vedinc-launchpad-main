"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const auth_repo_1 = require("./auth.repo");
const hash_1 = require("../../utils/hash");
const loginUser = async (email, password) => {
    const user = await (0, auth_repo_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = await (0, hash_1.comparePassword)(password, user.passwordHash);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
exports.loginUser = loginUser;
