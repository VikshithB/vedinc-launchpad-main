"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileController = exports.getMyProfileController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/* =========================
   GET MY PROFILE
========================= */
const getMyProfileController = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                title: true,
                avatar: true,
                role: true,
                createdAt: true,
            },
        });
        return res.json(user);
    }
    catch {
        return res.status(500).json({
            message: "Failed to fetch profile",
        });
    }
};
exports.getMyProfileController = getMyProfileController;
/* =========================
   UPDATE MY PROFILE
========================= */
const updateMyProfileController = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, bio, title, avatar } = req.body;
        const updated = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                name,
                bio,
                title,
                avatar,
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                title: true,
                avatar: true,
                role: true,
            },
        });
        return res.json(updated);
    }
    catch {
        return res.status(500).json({
            message: "Failed to update profile",
        });
    }
};
exports.updateMyProfileController = updateMyProfileController;
