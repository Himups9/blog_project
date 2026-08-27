// backend/src/models/settings/settings.service.js

import settingsRepository from "./settings.repository.js";

import {
    SETTINGS_DEFAULTS,
} from "./settings.constants.js";

import {
    validateCreateSettings,
    validateUpdateSettings,
} from "./settings.validation.js";

/**
 * Get global site settings.
 *
 * If settings don't exist yet, create them
 * using the default values.
 */
const getSettings = async () => {
    let settings = await settingsRepository.findSettings();

    if (!settings) {
        const validation = validateCreateSettings({
            ...SETTINGS_DEFAULTS,
        });

        if (!validation.valid) {
            const error = new Error(
                "Default settings are invalid."
            );

            error.statusCode = 500;
            error.errors = validation.errors;

            throw error;
        }

        settings =
            await settingsRepository.createSettings(
                validation.data
            );
    }

    return settings;
};

/**
 * Create initial settings.
 *
 * Normally getSettings() handles automatic creation,
 * but this method is useful for initialization/testing.
 */
const createSettings = async (data) => {
    const existingSettings =
        await settingsRepository.findSettings();

    if (existingSettings) {
        const error = new Error(
            "Site settings already exist."
        );

        error.statusCode = 409;

        throw error;
    }

    const validation =
        validateCreateSettings(data);

    if (!validation.valid) {
        const error = new Error(
            "Settings validation failed."
        );

        error.statusCode = 400;
        error.errors = validation.errors;

        throw error;
    }

    return settingsRepository.createSettings(
        validation.data
    );
};

/**
 * Update global site settings.
 *
 * If settings don't exist, the record is created
 * using defaults + supplied data.
 */
const updateSettings = async (data) => {
    let settings =
        await settingsRepository.findSettings();

    /**
     * Create settings if they don't exist.
     */
    if (!settings) {
        const validation =
            validateCreateSettings({
                ...SETTINGS_DEFAULTS,
                ...data,
            });

        if (!validation.valid) {
            const error = new Error(
                "Settings validation failed."
            );

            error.statusCode = 400;
            error.errors = validation.errors;

            throw error;
        }

        return settingsRepository.createSettings(
            validation.data
        );
    }

    /**
     * Validate update data.
     */
    const validation =
        validateUpdateSettings(data);

    if (!validation.valid) {
        const error = new Error(
            "Settings validation failed."
        );

        error.statusCode = 400;
        error.errors = validation.errors;

        throw error;
    }

    /**
     * Don't perform an empty update.
     */
    if (
        Object.keys(validation.data).length === 0
    ) {
        const error = new Error(
            "No settings data was provided for update."
        );

        error.statusCode = 400;

        throw error;
    }

    return settingsRepository.updateSettings(
        settings.id,
        validation.data
    );
};

export default {
    getSettings,
    createSettings,
    updateSettings,
};