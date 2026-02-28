"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const course_controller_1 = require("./course.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticate, course_controller_1.listCoursesController);
router.get("/:id", auth_middleware_1.authenticate, course_controller_1.getCourseContentController);
exports.default = router;
