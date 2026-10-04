import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

import uploadRoot from "./utils/uploadPath.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

/*
 * CORS
 *
 * Allowed frontend origins:
 * - Local development
 * - Vercel frontend
 * - Production custom domain
 */
const allowedOrigins = [
    "http://localhost:5173",
    "https://blog-project-p1q6.vercel.app",
    "https://www.himalayatech.com.np",
    "https://himalayatech.com.np",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an Origin header
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(
                    `CORS blocked origin: ${origin}`
                )
            );
        },

        credentials: true,
    })
);

/*
|--------------------------------------------------------------------------
| JSON Requests
|--------------------------------------------------------------------------
*/

app.use(
    express.json()
);

/*
|--------------------------------------------------------------------------
| URL Encoded Requests
|--------------------------------------------------------------------------
*/

app.use(
    express.urlencoded({
        extended: true,
    })
);

/*
|--------------------------------------------------------------------------
| Cookies
|--------------------------------------------------------------------------
*/

app.use(
    cookieParser()
);

/*
|--------------------------------------------------------------------------
| Static Uploaded Files
|--------------------------------------------------------------------------
|
| Local:
|   src/uploads
|
| Vercel:
|   /tmp/blog-uploads
|
| Note:
| Vercel's /tmp filesystem is temporary.
| Permanent production image storage should use
| object storage such as Cloudinary, S3, R2, etc.
|--------------------------------------------------------------------------
*/

app.use(
    "/uploads",
    express.static(uploadRoot)
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/api",
    routes
);

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the Blog CMS API",
    });
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running successfully",
        timestamp: new Date().toISOString(),
    });
});

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(
    notFoundMiddleware
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(
    errorMiddleware
);

export default app;