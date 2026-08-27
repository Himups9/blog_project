// backend/src/models/settings/settings.routes.js

import express from "express";

import {
    getSettings,
    createSettings,
    updateSettings,
} from "./settings.controller.js";

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
|
| Retrieve the global site settings.
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
|
| Create the initial global settings record.
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
|
| Update global settings.
| Supports:
| - normal settings fields
| - logo upload
| - favicon upload
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