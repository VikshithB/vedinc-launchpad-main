"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollment_controller_1 = require("./enrollment.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
/* PUBLIC */
router.post("/initiate", enrollment_controller_1.initiateEnrollmentController);
router.get("/check/:courseId", enrollment_controller_1.checkEnrollmentController);
/* ADMIN */
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)(client_1.UserRole.SUPER_ADMIN), enrollment_controller_1.deleteEnrollmentController);
exports.default = router;
