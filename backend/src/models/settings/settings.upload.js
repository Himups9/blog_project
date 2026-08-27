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
*/

const uploadDirectory = path.resolve(
    process.cwd(),
    "src/uploads/setting/original"
);

/*
|--------------------------------------------------------------------------
| Ensure Upload Directory Exists
|--------------------------------------------------------------------------
*/

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

/*
|--------------------------------------------------------------------------
| File Filter
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
    if (
        !SETTINGS_IMAGE_MIME_TYPES.includes(
            file.mimetype
        )
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
| Storage Configuration
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(
            file.originalname
        );

        const filename =
            `${Date.now()}-${crypto
                .randomBytes(8)
                .toString("hex")}${extension}`;

        cb(null, filename);
    },
});

/*
|--------------------------------------------------------------------------
| Multer Configuration
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
| Settings Image Upload
|--------------------------------------------------------------------------
|
| Accept:
| - logo
| - favicon
|
*/

const settingsImageUpload =
    settingsUpload.fields([
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