"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const env_1 = require("./env");
if (!env_1.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
exports.jwtConfig = {
    secret: env_1.env.JWT_SECRET,
    expiresIn: "7d",
};
