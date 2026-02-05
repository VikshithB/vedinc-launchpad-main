import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma";
import { UserRole } from "@prisma/client";

async function main() {
    const email = "admin@vedinc.in";

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        console.log("Admin already exists");
        return;
    }

    const passwordHash = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            name: "Super Admin",
            email,
            passwordHash,
            role: UserRole.ADMIN,
        },
    });

    console.log("Admin user created");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
