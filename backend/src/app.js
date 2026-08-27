// backend/src/app.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import routes from "./routes/index.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

/*
 * CORS
 */
app.use(
    cors({
        origin:
            process.env.FRONTEND_URL ||
            "http://localhost:5173",

        credentials: true,
    })
);


/*
 * JSON Requests
 *
 * Used for:
 * application/json
 */
app.use(
    express.json()
);


/*
 * URL Encoded Requests
 */
app.use(
    express.urlencoded({
        extended: true,
    })
);


/*
 * Cookies
 */
app.use(
    cookieParser()
);


/*
|--------------------------------------------------------------------------
| Static Uploaded Files
|--------------------------------------------------------------------------
|
| Physical directory:
|
| src/uploads/
|
| Public URL:
|
| http://localhost:5000/uploads/...
|
| Examples:
|
| /uploads/users/optimized/profile.webp
| /uploads/users/thumbnails/profile.webp
| /uploads/gallery/optimized/image.webp
| /uploads/blogs/optimized/blog.webp
|
*/

const uploadDirectory = path.resolve(
    process.cwd(),
    "src/uploads"
);

app.use(
    "/uploads",
    express.static(uploadDirectory)
);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| All application API routes:
|
| /api/auth
| /api/users
| /api/categories
| /api/tags
| /api/blogs
| /api/comments
| /api/gallery
| /api/settings
|
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