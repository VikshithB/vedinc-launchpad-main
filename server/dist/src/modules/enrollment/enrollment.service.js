"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnrollmentService = exports.getUserEnrollmentsService = exports.createEnrollmentService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createEnrollmentService = async ({ userId, courseId, fullName, email, phone, }) => {
    const existing = await prisma_1.default.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });
    if (existing) {
        throw new Error("You are already enrolled in this course");
    }
    return prisma_1.default.enrollment.create({
        data: {
            userId,
            courseId,
            fullName,
            email,
            phone,
            status: "ACTIVE",
        },
    });
};
exports.createEnrollmentService = createEnrollmentService;
const getUserEnrollmentsService = async (userId) => {
    return prisma_1.default.enrollment.findMany({
        where: { userId },
        include: {
            course: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getUserEnrollmentsService = getUserEnrollmentsService;
const checkEnrollmentService = async (userId, courseId) => {
    const enrollment = await prisma_1.default.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });
    return !!enrollment;
};
exports.checkEnrollmentService = checkEnrollmentService;
