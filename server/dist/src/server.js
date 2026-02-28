"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = __importDefault(require("./lib/prisma"));
async function startServer() {
    try {
        await prisma_1.default.$connect();
        console.log("✅ Database connected");
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server running on port ${env_1.env.PORT} (${env_1.env.NODE_ENV})`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
