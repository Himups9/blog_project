// backend/src/models/settings/settings.repository.js

import prisma from "../../config/prisma.js";

/**
 * Find the global site settings.
 *
 * Since SiteSetting is a single global record,
 * we always retrieve the first record.
 */
const findSettings = async () => {
    return prisma.siteSetting.findFirst({
        orderBy: {
            id: "asc",
        },
    });
};

/**
 * Create the initial site settings record.
 */
const createSettings = async (data) => {
    return prisma.siteSetting.create({
        data,
    });
};

/**
 * Update the existing site settings record.
 */
const updateSettings = async (id, data) => {
    return prisma.siteSetting.update({
        where: {
            id,
        },
        data,
    });
};

/**
 * Find settings by ID.
 */
const findSettingsById = async (id) => {
    return prisma.siteSetting.findUnique({
        where: {
            id,
        },
    });
};

/**
 * Delete settings.
 *
 * Normally the global settings record should not be deleted.
 * This method is mainly useful for development/testing.
 */
const deleteSettings = async (id) => {
    return prisma.siteSetting.delete({
        where: {
            id,
        },
    });
};

export default {
    findSettings,
    findSettingsById,
    createSettings,
    updateSettings,
    deleteSettings,
};