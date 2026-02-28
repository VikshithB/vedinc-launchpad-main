"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModuleController = exports.createModuleController = void 0;
const module_service_1 = require("./module.service");
/**
 * ADMIN: Create Module
 */
const createModuleController = async (req, res) => {
    try {
        const { title, courseId, order } = req.body;
        if (!title || !courseId) {
            return res.status(400).json({
                message: "Title and courseId are required",
            });
        }
        const module = await (0, module_service_1.createModuleService)({
            title,
            courseId,
            order,
        });
        return res.status(201).json(module);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create module",
        });
    }
};
exports.createModuleController = createModuleController;
/**
 * ADMIN: Delete Module
 */
const deleteModuleController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Module ID required",
            });
        }
        await (0, module_service_1.deleteModuleService)(id);
        return res.json({
            message: "Module deleted",
        });
    }
    catch {
        return res.status(500).json({
            message: "Failed to delete module",
        });
    }
};
exports.deleteModuleController = deleteModuleController;
