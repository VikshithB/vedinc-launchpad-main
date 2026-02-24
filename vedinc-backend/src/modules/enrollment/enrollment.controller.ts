import { Request, Response } from "express";
import nodemailer from "nodemailer";
import prisma from "../../lib/prisma";
import {
    createEnrollmentService,
    checkEnrollmentService,
    getUserEnrollmentsService,
} from "./enrollment.service";

/* =========================
   INITIATE ENROLLMENT
========================= */
export const initiateEnrollmentController = async (
    req: Request,
    res: Response
) => {
    try {
        const { courseId, fullName, email, phone } = req.body;

        if (!courseId || !fullName || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userId = req.user!.id;

        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        const enrollment = await createEnrollmentService({
            userId,
            courseId,
            fullName,
            email,
            phone,
        });

        const transporter = nodemailer.createTransport({
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
                <p>Status: <b>${enrollment.status}</b></p>
            `,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Enrollment - ${course.title}`,
            html: `
                <h3>New Enrollment Notification</h3>
                <p><b>Name:</b> ${fullName}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Course:</b> ${course.title}</p>
                <p><b>Status:</b> ${enrollment.status}</p>
            `,
        });

        return res.status(201).json({
            message: "Enrollment successful",
            enrollment,
        });
    } catch (error: any) {
        console.error("Enrollment Error:", error);

        return res.status(400).json({
            message: error.message || "Enrollment failed",
        });
    }
};

/* =========================
   GET MY ENROLLMENTS
========================= */
export const getMyEnrollmentsController = async (
    req: Request,
    res: Response
) => {
    try {
        const enrollments = await getUserEnrollmentsService(req.user!.id);
        return res.status(200).json(enrollments);
    } catch {
        return res.status(500).json({
            message: "Unable to fetch enrollments",
        });
    }
};

/* =========================
   CHECK ENROLLMENT
========================= */
export const checkEnrollmentController = async (
    req: Request,
    res: Response
) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                message: "Invalid course ID",
            });
        }

        const enrolled = await checkEnrollmentService(
            req.user!.id,
            courseId as string
        );

        return res.status(200).json({ enrolled });
    } catch {
        return res.status(500).json({
            message: "Unable to check enrollment",
        });
    }
};

/* =========================
   DELETE ENROLLMENT (NEW)
========================= */
export const deleteEnrollmentController = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        await prisma.enrollment.delete({
            where: { id },
        });

        return res.json({
            message: "Enrollment deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete enrollment",
        });
    }
};