"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const lesson_controller_1 = require("./lesson.controller");
const router = (0, express_1.Router)();
/**
 * ADMIN: Create Lesson
 * For PDF → send file
 * For VIDEO → send videoUrl in body
 */
router.post("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), upload_middleware_1.uploadPdf.single("file"), lesson_controller_1.createLessonController);
/**
 * ADMIN: Delete Lesson
 */
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), lesson_controller_1.deleteLessonController);
exports.default = router;
