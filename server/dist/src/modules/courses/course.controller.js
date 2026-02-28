"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseController = exports.updateCourseController = exports.getCourseContentController = exports.listCoursesController = exports.createCourseController = void 0;
const course_service_1 = require("./course.service");
/* =========================
   ADMIN: Create Course
========================= */
const createCourseController = async (req, res) => {
    try {
        const course = await (0, course_service_1.createCourseService)(req.body);
        return res.status(201).json(course);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create course",
        });
    }
};
exports.createCourseController = createCourseController;
/* =========================
   PUBLIC: List Courses
========================= */
const listCoursesController = async (_req, res) => {
    try {
        const courses = await (0, course_service_1.listCoursesService)();
        return res.json(courses);
    }
    catch {
        return res.status(500).json({
            message: "Failed to fetch courses",
        });
    }
};
exports.listCoursesController = listCoursesController;
/* =========================
   AUTH: Get Course Content
========================= */
const getCourseContentController = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await (0, course_service_1.getCourseContentService)(id);
        return res.json(course);
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
exports.getCourseContentController = getCourseContentController;
/* =========================
   ADMIN: Update Course
========================= */
const updateCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await (0, course_service_1.updateCourseService)(id, req.body);
        return res.json(updated);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to update course",
        });
    }
};
exports.updateCourseController = updateCourseController;
/* =========================
   ADMIN: Delete Course
========================= */
const deleteCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, course_service_1.deleteCourseService)(id);
        return res.json({ message: "Course deleted" });
    }
    catch {
        return res.status(500).json({
            message: "Failed to delete course",
        });
    }
};
exports.deleteCourseController = deleteCourseController;
