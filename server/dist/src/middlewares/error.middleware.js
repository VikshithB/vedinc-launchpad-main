"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Global Error:", err.message);
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
