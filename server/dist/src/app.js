"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false, // Allow inline scripts from Vite build
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests, please try again later.",
}));
app.use(express_1.default.json());
// 👇 IMPORTANT
app.use("/api/users", user_routes_1.default);
// existing routes
app.use("/api", routes_1.default);
// optional: serve uploaded images
app.use("/uploads", express_1.default.static("uploads"));
app.use(error_middleware_1.errorHandler);
// 🚀 PRODUCTION: Serve Vite-built frontend
if (process.env.NODE_ENV === "production") {
    const distPath = path_1.default.join(__dirname, "../../dist");
    app.use(express_1.default.static(distPath));
    // SPA fallback: any non-API route → index.html
    app.get("{*path}", (_req, res) => {
        res.sendFile(path_1.default.join(distPath, "index.html"));
    });
}
exports.default = app;
