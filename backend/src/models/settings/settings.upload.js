// backend/src/models/settings/settings.upload.js

import multer from "multer";

import {
    SETTINGS_IMAGE_MIME_TYPES,
    SETTINGS_IMAGE_MAX_SIZE,
} from "./settings.constants.js";

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
| Memory Storage
|--------------------------------------------------------------------------
|
| Files are kept in memory temporarily.
| They are then uploaded to persistent storage.
|
*/

const storage = multer.memoryStorage();

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

export {
    settingsImageUpload,
};
