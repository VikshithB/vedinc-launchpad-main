import { sign, verify, Secret } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { UserRole } from "../modules/auth/auth.types";

type Payload = {
    id: string;
    role: UserRole;
};

export const signToken = (payload: Payload) => {
    return sign(
        payload as object,
        jwtConfig.secret as Secret,
        {
            expiresIn: jwtConfig.expiresIn,
        }
    );
};

export const verifyToken = (token: string) => {
    return verify(
        token,
        jwtConfig.secret as Secret
    ) as Payload;
};
