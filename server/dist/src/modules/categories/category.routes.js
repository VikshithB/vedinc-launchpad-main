"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
/**
 * PUBLIC: List Categories
 */
router.get("/", category_controller_1.listCategoriesController);
/**
 * ADMIN: Create Category
 */
router.post("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), category_controller_1.createCategoryController);
/**
 * ADMIN: Delete Category
 */
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), category_controller_1.deleteCategoryController);
exports.default = router;
