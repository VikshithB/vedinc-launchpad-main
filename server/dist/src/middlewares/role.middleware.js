"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const roleHierarchy = {
    USER: 1,
    ADMIN: 2,
    SUPER_ADMIN: 3,
};
const requireRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userLevel = roleHierarchy[req.user.role];
    const allowed = roles.some((role) => userLevel >= roleHierarchy[role]);
    if (!allowed) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports.requireRole = requireRole;
