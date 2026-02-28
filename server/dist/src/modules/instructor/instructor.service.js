"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstructorService = exports.listInstructorsService = exports.updateInstructorService = exports.createInstructorService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const client_1 = require("@prisma/client");
/* =========================
   CREATE INSTRUCTOR (ADMIN USER)
========================= */
const createInstructorService = async (data) => {
    return prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            role: client_1.UserRole.ADMIN,
            bio: data.bio || null,
            title: data.title || null,
            avatar: data.avatar || null,
        },
    });
};
exports.createInstructorService = createInstructorService;
/* =========================
   UPDATE INSTRUCTOR
========================= */
const updateInstructorService = async (id, data) => {
    return prisma_1.default.user.update({
        where: { id },
        data,
    });
};
exports.updateInstructorService = updateInstructorService;
/* =========================
   LIST INSTRUCTORS
========================= */
const listInstructorsService = async () => {
    return prisma_1.default.user.findMany({
        where: {
            role: {
                in: [client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN],
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            title: true,
            avatar: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.listInstructorsService = listInstructorsService;
/* =========================
   DELETE INSTRUCTOR
========================= */
const deleteInstructorService = async (id) => {
    return prisma_1.default.user.delete({
        where: { id },
    });
};
exports.deleteInstructorService = deleteInstructorService;
