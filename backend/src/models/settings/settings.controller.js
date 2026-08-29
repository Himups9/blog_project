// backend/src/modules/settings/settings.controller.js

import { put } from "@vercel/blob";
import crypto from "crypto";

import settingsService from "./settings.service.js";

/*
|--------------------------------------------------------------------------
| Upload Image to Vercel Blob
|--------------------------------------------------------------------------
*/

const uploadImage = async (file, folder) => {
    if (!file) {
        return null;
    }

    const extension =
        file.originalname
            ?.split(".")
            .pop()
            ?.toLowerCase() || "bin";

    const filename =
        `${folder}/${crypto.randomUUID()}.${extension}`;

    const blob = await put(
        filename,
        file.buffer,
        {
            access: "public",
            contentType: file.mimetype,
        }
    );

    return blob.url;
};

/*
|--------------------------------------------------------------------------
| Upload Settings Images
|--------------------------------------------------------------------------
*/

const getUploadedImages = async (files = {}) => {
    const images = {};

    if (files.logo?.[0]) {
        images.logo = await uploadImage(
            files.logo[0],
            "settings/logo"
        );
    }

    if (files.favicon?.[0]) {
        images.favicon = await uploadImage(
            files.favicon[0],
            "settings/favicon"
        );
    }

    return images;
};

/*
|--------------------------------------------------------------------------
| GET /api/settings
|--------------------------------------------------------------------------
*/

const getSettings = async (req, res, next) => {
    try {
        const settings =
            await settingsService.getSettings();

        return res.status(200).json({
            success: true,
            message:
                "Settings retrieved successfully.",
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

/*
|--------------------------------------------------------------------------
| POST /api/settings
|--------------------------------------------------------------------------
*/

const createSettings = async (req, res, next) => {
    try {
        const uploadedImages =
            await getUploadedImages(req.files);

        const data = {
            ...req.body,
            ...uploadedImages,
        };

        const settings =
            await settingsService.createSettings(data);

        return res.status(201).json({
            success: true,
            message:
                "Settings created successfully.",
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

/*
|--------------------------------------------------------------------------
| PUT /api/settings
|--------------------------------------------------------------------------
*/

const updateSettings = async (req, res, next) => {
    try {
        const uploadedImages =
            await getUploadedImages(req.files);

        const data = {
            ...req.body,
            ...uploadedImages,
        };

        const settings =
            await settingsService.updateSettings(data);

        return res.status(200).json({
            success: true,
            message:
                "Settings updated successfully.",
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

export {
    getSettings,
    createSettings,
    updateSettings,
};
