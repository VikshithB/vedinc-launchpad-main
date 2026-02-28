"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.listCategoriesController = exports.createCategoryController = void 0;
const category_service_1 = require("./category.service");
/**
 * ADMIN: Create Category
 */
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category name required",
            });
        }
        const category = await (0, category_service_1.createCategoryService)(name);
        return res.status(201).json(category);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createCategoryController = createCategoryController;
/**
 * PUBLIC: List Categories
 */
const listCategoriesController = async (_req, res) => {
    const categories = await (0, category_service_1.listCategoriesService)();
    return res.json(categories);
};
exports.listCategoriesController = listCategoriesController;
/**
 * ADMIN: Delete Category
 */
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Category ID required",
            });
        }
        await (0, category_service_1.deleteCategoryService)(id);
        return res.json({
            message: "Category deleted",
        });
    }
    catch {
        return res.status(500).json({
            message: "Failed to delete category",
        });
    }
};
exports.deleteCategoryController = deleteCategoryController;
