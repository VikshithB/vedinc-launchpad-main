"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const client_1 = require("@prisma/client");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const admin_controller_1 = require("./admin.controller");
const admin_controller_2 = require("./admin.controller");
const router = (0, express_1.Router)();
/* =========================
   CREATE INSTRUCTOR
========================= */
router.post("/create-admin", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), upload_middleware_1.uploadImage.single("avatar"), admin_controller_2.createAdmin);
/* =========================
   USER MANAGEMENT (SUPER_ADMIN ONLY)
========================= */
// List all users
router.get("/users", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), admin_controller_2.listAllUsers);
// Update role
router.patch("/users/:id/role", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), admin_controller_2.updateUserRole);
// Delete user
router.delete("/users/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), admin_controller_2.deleteUser);
// Get Enrollments
router.get("/enrollments", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), admin_controller_1.listAllEnrollments);
exports.default = router;
