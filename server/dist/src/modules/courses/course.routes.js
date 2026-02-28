"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const course_controller_1 = require("./course.controller");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
/* PUBLIC */
router.get("/", course_controller_1.listCoursesController);
/* AUTH */
router.get("/:id", course_controller_1.getCourseContentController);
/* ADMIN */
router.post("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.ADMIN), course_controller_1.createCourseController);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.ADMIN), course_controller_1.updateCourseController);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.ADMIN), course_controller_1.deleteCourseController);
exports.default = router;
