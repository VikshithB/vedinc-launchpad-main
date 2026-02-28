"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.listCategoriesService = exports.createCategoryService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
/**
 * ADMIN: Create Category
 */
const createCategoryService = async (name) => {
    return prisma_1.default.category.create({
        data: { name },
    });
};
exports.createCategoryService = createCategoryService;
/**
 * PUBLIC: List Categories
 */
const listCategoriesService = async () => {
    return prisma_1.default.category.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.listCategoriesService = listCategoriesService;
/**
 * ADMIN: Delete Category
 */
const deleteCategoryService = async (id) => {
    return prisma_1.default.category.delete({
        where: { id },
    });
};
exports.deleteCategoryService = deleteCategoryService;
