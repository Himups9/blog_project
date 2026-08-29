// backend/src/models/settings/settings.routes.js

import express from "express";

import {
    getSettings,
    createSettings,
    updateSettings,
} from "../../modules/settings/settings.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

import {
    settingsImageUpload,
} from "./settings.upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET /api/settings
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    getSettings
);

/*
|--------------------------------------------------------------------------
| POST /api/settings
|--------------------------------------------------------------------------
| Admin only
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    settingsImageUpload,
    createSettings
);

/*
|--------------------------------------------------------------------------
| PUT /api/settings
|--------------------------------------------------------------------------
| Admin only
|--------------------------------------------------------------------------
*/

router.put(
    "/",
    authenticate,
    authorize("ADMIN"),
    settingsImageUpload,
    updateSettings
);

export default router;
