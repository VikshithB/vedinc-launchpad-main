"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileController = exports.getMyProfileController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const getMyProfileController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;
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
            },
        });
        res.json(user);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};
exports.getMyProfileController = getMyProfileController;
const updateMyProfileController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;
        const { name, bio, title } = req.body;
        let avatarPath;
        if (req.file) {
            avatarPath = `/uploads/${req.file.filename}`;
        }
        const updated = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                name,
                bio,
                title,
                ...(avatarPath && { avatar: avatarPath }),
            },
        });
        res.json(updated);
    }
    catch {
        res.status(500).json({ message: "Failed to update profile" });
    }
};
exports.updateMyProfileController = updateMyProfileController;
