import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
    "DATABASE_URL",
    "JWT_SECRET",
    "REFRESH_TOKEN_SECRET",
];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: Number(process.env.PORT) || 5001,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRES_IN:
        process.env.JWT_EXPIRES_IN || "1d",

    REFRESH_TOKEN_SECRET:
        process.env.REFRESH_TOKEN_SECRET,

    REFRESH_TOKEN_EXPIRES_IN:
        process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

    REFRESH_TOKEN_EXPIRES_MS:
        Number(process.env.REFRESH_TOKEN_EXPIRES_MS) ||
        7 * 24 * 60 * 60 * 1000,

    FRONTEND_URL:
        process.env.FRONTEND_URL ||
        "http://localhost:5173",
};

export default env;
