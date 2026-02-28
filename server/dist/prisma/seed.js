"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../src/lib/prisma"));
const client_1 = require("@prisma/client");
async function main() {
    // 🔐 SUPER ADMIN
    const superAdminEmail = "admin@vedinc.in";
    const superAdminPassword = "admin123";
    const superAdminExists = await prisma_1.default.user.findUnique({
        where: { email: superAdminEmail },
    });
    if (!superAdminExists) {
        const adminHash = await bcrypt_1.default.hash(superAdminPassword, 10);
        await prisma_1.default.user.create({
            data: {
                name: "Super Admin",
                email: superAdminEmail,
                passwordHash: adminHash,
                role: client_1.UserRole.SUPER_ADMIN, // ✅ IMPORTANT
            },
        });
        console.log("✅ Super Admin created");
    }
    else {
        console.log("ℹ️ Super Admin already exists");
    }
    // 👤 NORMAL USER
    const userEmail = "user@vedinc.in";
    const userPassword = "user@123";
    const userExists = await prisma_1.default.user.findUnique({
        where: { email: userEmail },
    });
    if (!userExists) {
        const userHash = await bcrypt_1.default.hash(userPassword, 10);
        await prisma_1.default.user.create({
            data: {
                name: "Test User",
                email: userEmail,
                passwordHash: userHash,
                role: client_1.UserRole.USER,
            },
        });
        console.log("✅ User created");
    }
    else {
        console.log("ℹ️ User already exists");
    }
}
main()
    .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
