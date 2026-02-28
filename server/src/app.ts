import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts from Vite build
}));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
        message: "Too many requests, please try again later.",
    })
);

app.use(express.json());

// 👇 IMPORTANT
app.use("/api/users", userRoutes);

// existing routes
app.use("/api", routes);

// optional: serve uploaded images
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

// 🚀 PRODUCTION: Serve Vite-built frontend
if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../dist");
    app.use(express.static(distPath));

    // SPA fallback: any non-API route → index.html
    app.get("{*path}", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}

export default app;