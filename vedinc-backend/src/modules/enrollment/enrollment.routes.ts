import { Router } from "express";
import {
    initiateEnrollmentController,
    checkEnrollmentController,
    getMyEnrollmentsController,
    deleteEnrollmentController,
} from "./enrollment.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/initiate", authenticate, initiateEnrollmentController);
router.get("/check/:courseId", authenticate, checkEnrollmentController);
router.get("/my", authenticate, getMyEnrollmentsController);

// NEW: Delete enrollment (SUPER_ADMIN only)
router.delete(
    "/:id",
    authenticate,
    requireRole(UserRole.SUPER_ADMIN),
    deleteEnrollmentController
);

export default router;