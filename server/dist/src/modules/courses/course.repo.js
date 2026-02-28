"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseById = exports.getAllCourses = exports.createCourse = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createCourse = (title, categoryId, description, price, thumbnail, instructorId) => {
    return prisma_1.default.course.create({
        data: {
            title,
            categoryId,
            description,
            price,
            thumbnail,
            instructorId,
        },
    });
};
exports.createCourse = createCourse;
const getAllCourses = () => {
    return prisma_1.default.course.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllCourses = getAllCourses;
const deleteCourseById = (id) => {
    return prisma_1.default.course.delete({
        where: { id },
    });
};
exports.deleteCourseById = deleteCourseById;
