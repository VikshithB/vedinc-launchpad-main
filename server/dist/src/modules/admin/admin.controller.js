"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllEnrollments = exports.deleteUser = exports.updateUserRole = exports.listAllUsers = exports.createAdmin = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const hash_1 = require("../../utils/hash");
const client_1 = require("@prisma/client");
const supabase_1 = require("../../lib/supabase");
const uuid_1 = require("uuid");
/* =========================
   CREATE ADMIN (INSTRUCTOR)
========================= */
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, bio, title } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email and password are required" });
        }
        const exists = await prisma_1.default.user.findUnique({ where: { email } });
        if (exists) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const passwordHash = await (0, hash_1.hashPassword)(password);
        let avatarUrl = null;
        if (req.file) {
            const fileExt = req.file.originalname.split(".").pop();
            const fileName = `${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_1.supabase.storage
                .from("instructor-avatars")
                .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });
            if (error)
                throw new Error("Failed to upload avatar");
            const { data } = supabase_1.supabase.storage
                .from("instructor-avatars")
                .getPublicUrl(fileName);
            avatarUrl = data.publicUrl;
        }
        const admin = await prisma_1.default.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: client_1.UserRole.ADMIN,
                bio: bio || null,
                title: title || null,
                avatar: avatarUrl || null,
            },
        });
        return res.status(201).json({
            message: "Instructor created successfully",
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to create admin",
        });
    }
};
exports.createAdmin = createAdmin;
/* =========================
   LIST ONLY ADMINS (FIXED)
========================= */
const listAllUsers = async (_req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            where: {
                role: {
                    in: [client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN],
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                bio: true,
                title: true,
                avatar: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(users);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch users",
        });
    }
};
exports.listAllUsers = listAllUsers;
/* =========================
   UPDATE USER ROLE
========================= */
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role || !Object.values(client_1.UserRole).includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (req.user?.id === id) {
            return res.status(400).json({
                message: "You cannot modify your own role",
            });
        }
        if (user.role === client_1.UserRole.SUPER_ADMIN &&
            role !== client_1.UserRole.SUPER_ADMIN) {
            const superAdminCount = await prisma_1.default.user.count({
                where: { role: client_1.UserRole.SUPER_ADMIN },
            });
            if (superAdminCount <= 1) {
                return res.status(400).json({
                    message: "Cannot demote the last SUPER_ADMIN",
                });
            }
        }
        const updated = await prisma_1.default.user.update({
            where: { id },
            data: { role },
        });
        return res.json({
            message: "Role updated successfully",
            user: {
                id: updated.id,
                name: updated.name,
                email: updated.email,
                role: updated.role,
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to update role",
        });
    }
};
exports.updateUserRole = updateUserRole;
/* =========================
   DELETE USER (SAFE)
========================= */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findUnique({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (req.user?.id === id) {
            return res.status(400).json({
                message: "You cannot delete your own account",
            });
        }
        if (user.role === client_1.UserRole.SUPER_ADMIN) {
            const superAdminCount = await prisma_1.default.user.count({
                where: { role: client_1.UserRole.SUPER_ADMIN },
            });
            if (superAdminCount <= 1) {
                return res.status(400).json({
                    message: "Cannot delete the last SUPER_ADMIN",
                });
            }
        }
        const courseCount = await prisma_1.default.course.count({
            where: { instructorId: id },
        });
        if (courseCount > 0) {
            return res.status(400).json({
                message: "Cannot delete instructor with assigned courses. Reassign courses first.",
            });
        }
        await prisma_1.default.user.delete({
            where: { id },
        });
        return res.json({
            message: "User deleted successfully",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
/* =========================
   LIST ALL ENROLLMENTS (SUPER_ADMIN)
========================= */
const listAllEnrollments = async (_req, res) => {
    try {
        const enrollments = await prisma_1.default.enrollment.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                status: true,
                createdAt: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(enrollments);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch enrollments",
        });
    }
};
exports.listAllEnrollments = listAllEnrollments;
