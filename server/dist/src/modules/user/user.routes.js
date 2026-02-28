"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: "uploads/",
});
router.get("/me", auth_middleware_1.authenticate, user_controller_1.getMyProfileController);
router.put("/me", auth_middleware_1.authenticate, upload.single("avatar"), user_controller_1.updateMyProfileController);
exports.default = router;
