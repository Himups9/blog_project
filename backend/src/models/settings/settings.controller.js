// backend/src/modules/settings/settings.controller.js

import settingsService from "./settings.service.js";

/**
 * Build uploaded image paths.
 *
 * Multer stores uploaded files in req.files.
 */
const getUploadedImages = (files = {}) => {
    const images = {};

    if (files.logo?.[0]) {
        images.logo = `/uploads/setting/original/${files.logo[0].filename}`;
    }

    if (files.favicon?.[0]) {
        images.favicon = `/uploads/setting/original/${files.favicon[0].filename}`;
    }

    return images;
};

/**
 * GET /api/settings
 *
 * Get global site settings.
 */
const getSettings = async (req, res, next) => {
    try {
        const settings = await settingsService.getSettings();

        return res.status(200).json({
            success: true,
            message: "Settings retrieved successfully.",
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/settings
 *
 * Create the initial global settings record.
 */
const createSettings = async (req, res, next) => {
    try {
        const uploadedImages = getUploadedImages(req.files);

        const data = {
            ...req.body,
            ...uploadedImages,
        };

        const settings =
            await settingsService.createSettings(data);

        return res.status(201).json({
            success: true,
            message: "Settings created successfully.",
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT /api/settings
 *
 * Update the global site settings.
 */
const updateSettings = async (req, res, next) => {
    try {
        const uploadedImages = getUploadedImages(req.files);

        const data = {
            ...req.body,
            ...uploadedImages,
        };

        const settings =
            await settingsService.updateSettings(data);

        return res.status(200).json({
            success: true,
            message: "Settings updated successfully.",
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