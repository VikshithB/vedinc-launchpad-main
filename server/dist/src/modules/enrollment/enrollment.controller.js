"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollmentController = exports.checkEnrollmentController = exports.initiateEnrollmentController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const client_1 = require("@prisma/client");
/* =========================
   INITIATE ENROLLMENT
========================= */
const initiateEnrollmentController = async (req, res) => {
    try {
        const { courseId, fullName, email, phone } = req.body;
        if (!courseId || !fullName || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const course = await prisma_1.default.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        // 🔥 Auto-create user if not exists
        let user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    name: fullName,
                    email,
                    passwordHash: "PUBLIC_USER_NO_LOGIN",
                    role: client_1.UserRole.USER,
                },
            });
        }
        // Prevent duplicate enrollment
        const existing = await prisma_1.default.enrollment.findFirst({
            where: {
                userId: user.id,
                courseId,
            },
        });
        if (existing) {
            return res.json({
                message: "Already enrolled",
            });
        }
        const enrollment = await prisma_1.default.enrollment.create({
            data: {
                userId: user.id,
                courseId,
                fullName,
                email,
                phone,
            },
        });
        // Optional email notification
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Enrollment Confirmation - ${course.title}`,
                html: `
                    <h2>Enrollment Successful 🎉</h2>
                    <p>Hi ${fullName},</p>
                    <p>You have successfully enrolled in <b>${course.title}</b>.</p>
                `,
            });
        }
        return res.status(201).json({
            message: "Enrollment successful",
        });
    }
    catch (error) {
        console.error("Enrollment Error:", error);
        return res.status(400).json({
            message: error.message || "Enrollment failed",
        });
    }
};
exports.initiateEnrollmentController = initiateEnrollmentController;
/* =========================
   CHECK ENROLLMENT (EMAIL BASED)
========================= */
const checkEnrollmentController = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const email = req.query.email;
        if (!courseId || !email) {
            return res.json({ enrolled: false });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.json({ enrolled: false });
        }
        const enrollment = await prisma_1.default.enrollment.findFirst({
            where: {
                userId: user.id,
                courseId: courseId, // ✅ now strictly string
            },
        });
        return res.json({ enrolled: !!enrollment });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to check enrollment",
        });
    }
};
exports.checkEnrollmentController = checkEnrollmentController;
/* =========================
   DELETE ENROLLMENT
========================= */
const deleteEnrollmentController = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.enrollment.delete({
            where: { id },
        });
        return res.json({
            message: "Enrollment deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete enrollment",
        });
    }
};
exports.deleteEnrollmentController = deleteEnrollmentController;
