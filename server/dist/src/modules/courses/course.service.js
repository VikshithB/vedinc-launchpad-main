"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseService = exports.updateCourseService = exports.getCourseContentService = exports.listCoursesService = exports.createCourseService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/* =========================
   ADMIN: Create Course
========================= */
const createCourseService = async (data) => {
    return prisma_1.default.course.create({
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            thumbnail: data.thumbnail,
            instructorId: data.instructorId || null,
            level: data.level || null,
            duration: data.duration || null,
            objectives: data.objectives
                ? {
                    create: data.objectives.map((text) => ({ text })),
                }
                : undefined,
        },
    });
};
exports.createCourseService = createCourseService;
/* =========================
   PUBLIC: List Courses
========================= */
const listCoursesService = async () => {
    return prisma_1.default.course.findMany({
        include: {
            category: true,
            instructor: {
                select: {
                    id: true,
                    name: true,
                    bio: true,
                    avatar: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.listCoursesService = listCoursesService;
/* =========================
   AUTH: Get Course Content
========================= */
const getCourseContentService = async (id) => {
    const course = await prisma_1.default.course.findUnique({
        where: { id },
        include: {
            category: true,
            instructor: {
                select: {
                    id: true,
                    name: true,
                    bio: true,
                    avatar: true,
                },
            },
            objectives: true,
            modules: {
                orderBy: { createdAt: "asc" },
                include: {
                    lessons: {
                        orderBy: { createdAt: "asc" },
                        select: {
                            id: true,
                            title: true,
                            type: true,
                            duration: true,
                            contentUrl: true, // 🔥 IMPORTANT FOR PDF OPEN
                            createdAt: true,
                        },
                    },
                },
            },
        },
    });
    if (!course)
        throw new Error("Course not found");
    return course;
};
exports.getCourseContentService = getCourseContentService;
/* =========================
   ADMIN: Update Course
========================= */
const updateCourseService = async (id, data) => {
    const updated = await prisma_1.default.course.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            thumbnail: data.thumbnail,
            instructorId: data.instructorId,
            level: data.level,
            duration: data.duration,
        },
    });
    if (data.objectives) {
        await prisma_1.default.courseObjective.deleteMany({
            where: { courseId: id },
        });
        await prisma_1.default.courseObjective.createMany({
            data: data.objectives.map((text) => ({
                text,
                courseId: id,
            })),
        });
    }
    return updated;
};
exports.updateCourseService = updateCourseService;
/* =========================
   ADMIN: Delete Course
========================= */
const deleteCourseService = async (id) => {
    await prisma_1.default.course.delete({ where: { id } });
    return { success: true };
};
exports.deleteCourseService = deleteCourseService;
