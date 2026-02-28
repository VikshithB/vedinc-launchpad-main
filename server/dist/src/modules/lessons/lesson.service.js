"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLessonService = exports.createLessonService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/**
 * ADMIN: Create Lesson inside Module
 */
const createLessonService = async (data) => {
    return prisma_1.default.lesson.create({
        data: {
            title: data.title,
            type: data.type,
            contentUrl: data.contentUrl,
            moduleId: data.moduleId,
            duration: data.duration,
        },
    });
};
exports.createLessonService = createLessonService;
/**
 * ADMIN: Delete Lesson
 */
const deleteLessonService = async (id) => {
    return prisma_1.default.lesson.delete({
        where: { id },
    });
};
exports.deleteLessonService = deleteLessonService;
