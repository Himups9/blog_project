import env from "./env.js";

export const jwtConfig = {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,

    refreshSecret: env.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,

    refreshTokenExpiresMs: env.REFRESH_TOKEN_EXPIRES_MS,
};
