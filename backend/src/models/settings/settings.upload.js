// backend/src/models/settings/settings.upload.js

import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

import {
    SETTINGS_IMAGE_MIME_TYPES,
    SETTINGS_IMAGE_MAX_SIZE,
} from "./settings.constants.js";

/*
|--------------------------------------------------------------------------
| Upload Directory
|--------------------------------------------------------------------------
|
| Vercel only provides a writable temporary filesystem at /tmp.
| Do NOT write uploads into /var/task or the project source directory.
|
*/

const uploadDirectory = "/tmp/uploads/setting/original";

/*
|--------------------------------------------------------------------------
| Ensure Upload Directory Exists
|--------------------------------------------------------------------------
*/

fs.mkdirSync(uploadDirectory, {
    recursive: true,
});

/*
|--------------------------------------------------------------------------
| File Filter
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
    if (
        !SETTINGS_IMAGE_MIME_TYPES.includes(file.mimetype)
    ) {
        return cb(
            new Error(
                "Invalid image type. Only JPEG, PNG, WebP and ICO files are allowed."
            ),
            false
        );
    }

    cb(null, true);
};

/*
|--------------------------------------------------------------------------
| Storage
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        const filename = `${Date.now()}-${crypto
            .randomBytes(8)
            .toString("hex")}${extension}`;

        cb(null, filename);
    },
});

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
*/

const settingsUpload = multer({
    storage,

    limits: {
        fileSize: SETTINGS_IMAGE_MAX_SIZE,
        files: 2,
    },

    fileFilter,
});

/*
|--------------------------------------------------------------------------
| Fields
|--------------------------------------------------------------------------
*/

const settingsImageUpload = settingsUpload.fields([
    {
        name: "logo",
        maxCount: 1,
    },
    {
        name: "favicon",
        maxCount: 1,
    },
]);

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export {
    settingsImageUpload,
};
