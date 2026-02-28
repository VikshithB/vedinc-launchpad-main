"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("../config/jwt");
const signToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, jwt_1.jwtConfig.secret, {
        expiresIn: jwt_1.jwtConfig.expiresIn,
    });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, jwt_1.jwtConfig.secret, { algorithms: ["HS256"] });
};
exports.verifyToken = verifyToken;
