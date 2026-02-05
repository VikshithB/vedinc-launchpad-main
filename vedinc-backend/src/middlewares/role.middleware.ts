import { Request, Response, NextFunction } from "express";
import { UserRole } from "../modules/auth/auth.types";

export const requireRole =
    (...roles: UserRole[]) =>
        (req: Request, res: Response, next: NextFunction) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        };
