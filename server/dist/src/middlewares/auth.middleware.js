"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const token = header.split(" ")[1];
        const payload = (0, jwt_1.verifyToken)(token);
        // JWT payload should contain { id, role }
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
