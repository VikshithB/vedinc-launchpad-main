"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModuleService = exports.createModuleService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/**
 * ADMIN: Create Module inside Course
 */
const createModuleService = async (data) => {
    return prisma_1.default.module.create({
        data: {
            title: data.title,
            courseId: data.courseId,
            ...(data.order !== undefined && { order: data.order }),
        },
    });
};
exports.createModuleService = createModuleService;
/**
 * ADMIN: Delete Module
 */
const deleteModuleService = async (id) => {
    return prisma_1.default.module.delete({
        where: { id },
    });
};
exports.deleteModuleService = deleteModuleService;
