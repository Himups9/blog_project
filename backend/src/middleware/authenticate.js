// backend/src/middleware/authenticate.js

import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import env from "../config/env.js";

const authenticate = async (req, res, next) => {
    try {
        /*
        |--------------------------------------------------------------------------
        | Get Authorization Header
        |--------------------------------------------------------------------------
        */

        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Extract Token
        |--------------------------------------------------------------------------
        */

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Verify JWT
        |--------------------------------------------------------------------------
        */

        let decoded;

        try {
            decoded = jwt.verify(
                token,
                env.JWT_SECRET
            );
        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Authentication token has expired.",
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid authentication token.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Find User
        |--------------------------------------------------------------------------
        */

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Active Account Check
        |--------------------------------------------------------------------------
        */

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is inactive.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Attach User to Request
        |--------------------------------------------------------------------------
        */

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};

export default authenticate;