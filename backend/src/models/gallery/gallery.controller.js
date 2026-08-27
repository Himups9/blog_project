import * as galleryService from "./gallery.service.js";

/**
 * Create a gallery item.
 */
export const createGallery = async (
    req,
    res,
    next
) => {
    try {
        const {
            title,
            altText,
        } = req.body;

        const file = req.file;

        const gallery =
            await galleryService.createGallery({
                title,
                altText,
                file,
                uploadedById:
                    req.user.id,
            });

        return res.status(201).json({
            success: true,
            message:
                "Gallery item created successfully.",
            data: gallery,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all gallery items.
 */
export const getGallery = async (
    req,
    res,
    next
) => {
    try {
        const {
            search,
            page,
            limit,
        } = req.query;

        const result =
            await galleryService.getGallery({
                search,
                page,
                limit,
            });

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get a single gallery item.
 */
export const getGalleryById = async (
    req,
    res,
    next
) => {
    try {
        const { id } = req.params;

        const gallery =
            await galleryService.getGalleryById(
                id
            );

        return res.status(200).json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        next(error);
    }
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
    req,
    res,
    next
) => {
    try {
        const { id } =
            req.params;

        const {
            title,
            altText,
        } = req.body;

        const file = req.file;

        const gallery =
            await galleryService.updateGallery(
                id,
                {
                    title,
                    altText,
                    file,
                }
            );

        return res.status(200).json({
            success: true,
            message:
                "Gallery item updated successfully.",
            data: gallery,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a gallery item.
 */
export const deleteGallery = async (
    req,
    res,
    next
) => {
    try {
        const { id } =
            req.params;

        const result =
            await galleryService.deleteGallery(
                id
            );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};