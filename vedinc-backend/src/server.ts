import app from "./app";
import { env } from "./config/env";
import { seedAdminUser } from "./modules/auth/user.store";
import prisma from "./lib/prisma";

app.listen(env.PORT, async () => {
    await seedAdminUser();

    console.log(
        `🚀 Server running on port ${env.PORT} (${env.NODE_ENV})`
    );
    (async () => {
        const users = await prisma.user.findMany();
        console.log(users);
    })();
});
