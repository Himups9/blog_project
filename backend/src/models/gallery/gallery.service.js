import * as galleryRepository from "./gallery.repository.js";

import { deleteUploadedFiles } from "../../utils/file.js";
import { optimizeImage } from "../../utils/image.js";

import {
    validateGalleryData,
    validateGalleryPagination,
    validateGalleryId,
} from "./gallery.validation.js";

import {
    mapGallery,
    mapGalleryList,
} from "./gallery.mapper.js";

/**
 * Create a gallery item.
 */
export const createGallery = async ({
    title,
    altText,
    file,
    uploadedById,
}) => {
    /*
     * Validate gallery metadata.
     */
    const validation =
        validateGalleryData({
            title,
            altText,
        });

    if (!validation.isValid) {
        const error = new Error(
            "Gallery validation failed."
        );

        error.statusCode = 400;
        error.errors =
            validation.errors;

        throw error;
    }

    /*
     * Image is required.
     */
    if (!file) {
        const error = new Error(
            "Image is required."
        );

        error.statusCode = 400;

        throw error;
    }

    /*
     * Uploader is required.
     */
    if (!uploadedById) {
        const error = new Error(
            "Uploader is required."
        );

        error.statusCode = 400;

        throw error;
    }

    /*
     * Process uploaded image.
     */
    const imagePaths =
        await optimizeImage(
            file,
            "gallery",
            {
                width: 1200,
                quality: 80,
                generateThumbnail: true,
                preserveOriginal: true,
                returnPaths: true,
            }
        );

    if (
        !imagePaths ||
        !imagePaths.optimizedPath
    ) {
        const error = new Error(
            "Image processing failed."
        );

        error.statusCode = 500;

        throw error;
    }

    /*
     * Create database record.
     */
    const gallery =
        await galleryRepository.createGallery({
            title: title.trim(),

            altText:
                altText?.trim() || null,

            imageUrl:
                imagePaths.optimizedPath,

            originalUrl:
                imagePaths.originalPath ??
                null,

            thumbnailUrl:
                imagePaths.thumbnailPath ??
                null,

            fileSize:
                file.size ?? null,

            mimeType:
                file.mimetype ?? null,

            uploadedById,
        });

    return mapGallery(gallery);
};

/**
 * Get gallery items.
 */
export const getGallery = async ({
    search,
    page,
    limit,
} = {}) => {
    const pagination =
        validateGalleryPagination({
            page,
            limit,
        });

    if (!pagination.isValid) {
        const error = new Error(
            "Invalid pagination parameters."
        );

        error.statusCode = 400;
        error.errors =
            pagination.errors;

        throw error;
    }

    const result =
        await galleryRepository.findGallery({
            search:
                search?.trim() ||
                undefined,

            page:
                pagination.page,

            limit:
                pagination.limit,
        });

    return {
        data:
            mapGalleryList(
                result.items
            ),

        pagination: {
            page:
                pagination.page,

            limit:
                pagination.limit,

            total:
                result.total,

            totalPages:
                Math.ceil(
                    result.total /
                        pagination.limit
                ),
        },
    };
};

/**
 * Get a gallery item by ID.
 */
export const getGalleryById = async (
    id
) => {
    const validation =
        validateGalleryId(id);

    if (!validation.isValid) {
        const error = new Error(
            "Invalid gallery ID."
        );

        error.statusCode = 400;
        error.errors =
            validation.errors;

        throw error;
    }

    const gallery =
        await galleryRepository.findGalleryById(
            id
        );

    if (!gallery) {
        const error = new Error(
            "Gallery item not found."
        );

        error.statusCode = 404;

        throw error;
    }

    return mapGallery(gallery);
};

/**
 * Update a gallery item.
 *
 * Supports:
 * - title update
 * - altText update
 * - optional image replacement
 */
export const updateGallery = async (
    id,
    {
        title,
        altText,
        file,
    } = {}
) => {
    /*
     * Validate ID.
     */
    const idValidation =
        validateGalleryId(id);

    if (!idValidation.isValid) {
        const error = new Error(
            "Invalid gallery ID."
        );

        error.statusCode = 400;
        error.errors =
            idValidation.errors;

        throw error;
    }

    /*
     * Find existing Gallery item.
     */
    const existingGallery =
        await galleryRepository.findGalleryById(
            id
        );

    if (!existingGallery) {
        const error = new Error(
            "Gallery item not found."
        );

        error.statusCode = 404;

        throw error;
    }

    /*
     * Validate supplied metadata.
     */
    if (
        title !== undefined ||
        altText !== undefined
    ) {
        const validation =
            validateGalleryData({
                title:
                    title !== undefined
                        ? title
                        : existingGallery.title,

                altText:
                    altText !== undefined
                        ? altText
                        : existingGallery.altText,
            });

        if (!validation.isValid) {
            const error = new Error(
                "Gallery validation failed."
            );

            error.statusCode = 400;
            error.errors =
                validation.errors;

            throw error;
        }
    }

    const data = {};

    /*
     * Update title.
     */
    if (title !== undefined) {
        data.title =
            title.trim();
    }

    /*
     * Update alt text.
     */
    if (altText !== undefined) {
        data.altText =
            altText?.trim() || null;
    }

    /*
     * Replace image.
     */
    if (file) {
        const imagePaths =
            await optimizeImage(
                file,
                "gallery",
                {
                    width: 1200,
                    quality: 80,
                    generateThumbnail: true,
                    preserveOriginal: true,
                    returnPaths: true,
                }
            );

        if (
            !imagePaths ||
            !imagePaths.optimizedPath
        ) {
            const error = new Error(
                "Image processing failed."
            );

            error.statusCode = 500;

            throw error;
        }

        data.imageUrl =
            imagePaths.optimizedPath;

        data.originalUrl =
            imagePaths.originalPath ??
            null;

        data.thumbnailUrl =
            imagePaths.thumbnailPath ??
            null;

        data.fileSize =
            file.size ?? null;

        data.mimeType =
            file.mimetype ?? null;
    }

    /*
     * Prevent an empty update.
     */
    if (
        Object.keys(data).length === 0
    ) {
        return mapGallery(
            existingGallery
        );
    }

    /*
     * Update database first.
     */
    const gallery =
        await galleryRepository.updateGallery(
            id,
            data
        );

    /*
     * Delete old image files only after
     * successful database update.
     */
    if (file) {
        await deleteUploadedFiles([
            existingGallery.originalUrl,
            existingGallery.imageUrl,
            existingGallery.thumbnailUrl,
        ]);
    }

    return mapGallery(gallery);
};

/**
 * Delete a gallery item.
 */
export const deleteGallery = async (
    id
) => {
    /*
     * Validate ID.
     */
    const validation =
        validateGalleryId(id);

    if (!validation.isValid) {
        const error = new Error(
            "Invalid gallery ID."
        );

        error.statusCode = 400;
        error.errors =
            validation.errors;

        throw error;
    }

    /*
     * Find existing item.
     */
    const existingGallery =
        await galleryRepository.findGalleryById(
            id
        );

    if (!existingGallery) {
        const error = new Error(
            "Gallery item not found."
        );

        error.statusCode = 404;

        throw error;
    }

    /*
     * Delete database record.
     */
    await galleryRepository.deleteGallery(
        id
    );

    /*
     * Delete physical image files.
     */
    await deleteUploadedFiles([
        existingGallery.originalUrl,
        existingGallery.imageUrl,
        existingGallery.thumbnailUrl,
    ]);

    return {
        message:
            "Gallery item deleted successfully.",
    };
};