import api from "../../api/axios";

/**
 * Settings Service
 * ----------------------------------------
 * Centralized API service for the Settings module.
 *
 * Backend endpoints:
 *
 * GET  /api/settings
 * POST /api/settings
 * PUT  /api/settings
 */

const BASE_URL = "/settings";

const settingsService = {
    /*
    |--------------------------------------------------------------------------
    | Get Settings
    |--------------------------------------------------------------------------
    */

    getSettings: async () => {
        const response = await api.get(BASE_URL);

        return response.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Create Settings
    |--------------------------------------------------------------------------
    */

    createSettings: async (data) => {
        const response = await api.post(
            BASE_URL,
            data
        );

        return response.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Update Settings
    |--------------------------------------------------------------------------
    |
    | data can be:
    |
    | - FormData
    | - JSON object
    |
    | FormData is required when uploading:
    | - logo
    | - favicon
    |
    */

    updateSettings: async (data) => {
        const response = await api.put(
            BASE_URL,
            data
        );

        return response.data;
    },
};

export default settingsService;