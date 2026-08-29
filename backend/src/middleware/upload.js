// src/middleware/upload.js

import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import os from "os";

// Vercel/serverless functions provide a temporary writable directory.
// Locally, this also works correctly.
const tempDir = path.join(os.tmpdir(), "blog-uploads");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, tempDir);
    },

    filename: (_req, file, cb) => {
        const extension =
            path.extname(file.originalname).toLowerCase();

        const filename =
            `${Date.now()}-${crypto.randomUUID()}${extension}`;

        cb(null, filename);
    },
});

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const fileFilter = (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
            new Error(
                "Only JPG, JPEG, PNG, and WebP images are allowed."
            ),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;