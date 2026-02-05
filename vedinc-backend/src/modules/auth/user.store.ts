import { User } from "./user.model";
import { hashPassword } from "../../utils/hash";
import { randomUUID } from "crypto";

export const users: User[] = [];

export const seedAdminUser = async () => {
    if (users.length > 0) return;

    users.push({
        id: randomUUID(),
        name: "Admin",
        email: "admin@vedinc.in",
        passwordHash: await hashPassword("admin123"),
        role: "ADMIN",
        createdAt: new Date(),
    });
};
