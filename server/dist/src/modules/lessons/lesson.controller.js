"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLessonController = exports.getLessonByIdController = exports.createLessonController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const lesson_service_1 = require("./lesson.service");
const uploadPdf_1 = require("../../utils/uploadPdf");
/**
 * ADMIN: Create Lesson
 */
const createLessonController = async (req, res) => {
    try {
        const { title, type, moduleId, duration, videoUrl } = req.body;
        if (!title || !type || !moduleId) {
            return res.status(400).json({
                message: "Title, type and moduleId are required",
            });
        }
        let contentUrl = "";
        if (type === "PDF") {
            if (!req.file) {
                return res.status(400).json({
                    message: "PDF file required",
                });
            }
            contentUrl = await (0, uploadPdf_1.uploadPdfToSupabase)(req.file);
        }
        if (type === "VIDEO") {
            if (!videoUrl) {
                return res.status(400).json({
                    message: "Video URL required",
                });
            }
            contentUrl = videoUrl;
        }
        const lesson = await (0, lesson_service_1.createLessonService)({
            title,
            type,
            contentUrl,
            moduleId,
            duration,
        });
        return res.status(201).json(lesson);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create lesson",
        });
    }
};
exports.createLessonController = createLessonController;
/**
 * USER: Get Lesson (Enrollment Protected)
 */
const getLessonByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await prisma_1.default.lesson.findUnique({
            where: { id: id },
            include: {
                module: {
                    include: {
                        course: true,
                    },
                },
            },
        });
        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }
        // 🔐 Check enrollment in parent course
        const enrollment = await prisma_1.default.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: req.user.id,
                    courseId: lesson.module.course.id,
                },
            },
        });
        if (!enrollment || enrollment.status !== "ACTIVE") {
            return res.status(403).json({
                message: "You are not enrolled in this course",
            });
        }
        return res.status(200).json({
            id: lesson.id,
            title: lesson.title,
            type: lesson.type,
            duration: lesson.duration,
            contentUrl: lesson.contentUrl,
        });
    }
    catch {
        return res.status(500).json({
            message: "Unable to fetch lesson",
        });
    }
};
exports.getLessonByIdController = getLessonByIdController;
/**
 * ADMIN: Delete Lesson
 */
const deleteLessonController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Lesson ID required",
            });
        }
        await (0, lesson_service_1.deleteLessonService)(id);
        return res.json({
            message: "Lesson deleted",
        });
    }
    catch {
        return res.status(500).json({
            message: "Failed to delete lesson",
        });
    }
};
exports.deleteLessonController = deleteLessonController;
