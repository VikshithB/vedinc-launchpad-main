import { users } from "./user.store";
import { comparePassword } from "../../utils/hash";

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValid = await comparePassword(
        password,
        user.passwordHash
    );

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
