"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const module_controller_1 = require("./module.controller");
const router = (0, express_1.Router)();
/**
 * ADMIN: Create Module
 */
router.post("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), module_controller_1.createModuleController);
/**
 * ADMIN: Delete Module
 */
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.requireRole)("ADMIN"), module_controller_1.deleteModuleController);
exports.default = router;
