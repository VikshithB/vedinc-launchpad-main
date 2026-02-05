import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";
import { requireRole } from "./middlewares/role.middleware";

const router = Router();

router.get(
    "/admin/test",
    authenticate,
    requireRole("ADMIN"),
    (_req, res) => {
        res.json({ message: "Admin access granted" });
    }
);

router.use("/auth", authRoutes);

export default router;
