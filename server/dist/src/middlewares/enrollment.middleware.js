"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEnrollment = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const requireEnrollment = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId || Array.isArray(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID",
            });
        }
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: req.user.id,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            return res.status(403).json({
                message: "Access denied. Not enrolled.",
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Enrollment validation failed",
        });
    }
};
exports.requireEnrollment = requireEnrollment;
