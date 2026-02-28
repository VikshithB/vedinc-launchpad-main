"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadPdf = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
/* =========================
   PDF Upload
========================= */
exports.uploadPdf = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf" ||
            path_1.default.extname(file.originalname).toLowerCase() !== ".pdf") {
            return cb(new Error("Only valid PDF files allowed"));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
});
/* =========================
   IMAGE Upload (For Instructor Avatar)
========================= */
exports.uploadImage = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPG, PNG, WEBP images allowed"));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});
