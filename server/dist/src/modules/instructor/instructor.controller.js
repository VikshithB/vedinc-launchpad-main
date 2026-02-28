"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstructorController = exports.listInstructorsController = exports.updateInstructorController = exports.createInstructorController = void 0;
const instructor_service_1 = require("./instructor.service");
const supabase_1 = require("../../lib/supabase");
const uuid_1 = require("uuid");
const hash_1 = require("../../utils/hash");
const createInstructorController = async (req, res) => {
    try {
        const { name, email, password, title, bio } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }
        let avatarUrl = "";
        if (req.file) {
            const fileExt = req.file.originalname.split(".").pop();
            const fileName = `${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_1.supabase.storage
                .from("instructor-avatars")
                .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });
            if (error)
                throw new Error("Failed to upload image");
            const { data } = supabase_1.supabase.storage
                .from("instructor-avatars")
                .getPublicUrl(fileName);
            avatarUrl = data.publicUrl;
        }
        const passwordHash = await (0, hash_1.hashPassword)(password);
        const instructor = await (0, instructor_service_1.createInstructorService)({
            name,
            email,
            passwordHash,
            bio,
            title,
            avatar: avatarUrl,
        });
        return res.status(201).json(instructor);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.createInstructorController = createInstructorController;
const updateInstructorController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, bio } = req.body;
        let data = {
            name,
            title,
            bio,
        };
        if (req.file) {
            const fileExt = req.file.originalname.split(".").pop();
            const fileName = `${(0, uuid_1.v4)()}.${fileExt}`;
            const { error } = await supabase_1.supabase.storage
                .from("instructor-avatars")
                .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });
            if (error)
                throw new Error("Failed to upload image");
            const { data: publicData } = supabase_1.supabase.storage
                .from("instructor-avatars")
                .getPublicUrl(fileName);
            data.avatar = publicData.publicUrl;
        }
        const instructor = await (0, instructor_service_1.updateInstructorService)(id, data);
        return res.json(instructor);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateInstructorController = updateInstructorController;
const listInstructorsController = async (_req, res) => {
    const instructors = await (0, instructor_service_1.listInstructorsService)();
    return res.json(instructors);
};
exports.listInstructorsController = listInstructorsController;
const deleteInstructorController = async (req, res) => {
    const { id } = req.params;
    await (0, instructor_service_1.deleteInstructorService)(id);
    return res.json({ message: "Instructor deleted" });
};
exports.deleteInstructorController = deleteInstructorController;
