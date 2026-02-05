import { Request, Response } from "express";
import { loginUser } from "./auth.service";
import { signToken } from "../../utils/jwt";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required",
            });
        }

        const user = await loginUser(email, password);

        const token = signToken({
            id: user.id,
            role: user.role,
        });

        return res.json({
            message: "Login successful",
            token,
            user,
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
};
