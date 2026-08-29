import path from "path";
import { promises as fs } from "fs";

import * as galleryRepository from "./gallery.repository.js";

import { deleteUploadedFiles } from "../../utils/file.js";
import { optimizeImage } from "../../utils/image.js";
import createGalleryImage from "../../utils/createGalleryImage.js";

import {
    validateGalleryData,
    validateGalleryPagination,
    validateGalleryId,
} from "./gallery.validation.js";

import {
    mapGallery,
    mapGalleryList,
} from "./gallery.mapper.js";

/*
|--------------------------------------------------------------------------
| Gallery upload directories
|--------------------------------------------------------------------------
*/

const UPLOADS_DIRECTORY = path.resolve(
    process.cwd(),
    "src/uploads"
);

const COMPOSED_DIRECTORY = path.resolve(
    UPLOADS_DIRECTORY,
    "gallery/composed"
);

/*
|--------------------------------------------------------------------------
| Convert stored image path to absolute filesystem path
|--------------------------------------------------------------------------
|
| Example database path:
|
| gallery/optimized/example.webp
|
| becomes:
|
| src/uploads/gallery/optimized/example.webp
|
*/

const getAbsoluteUploadPath = (imagePath) => {
    if (!imagePath) {
        return null;
    }

    /*
     * If already absolute, use it directly.
     */
    if (path.isAbsolute(imagePath)) {
        return imagePath;
    }

    /*
     * Remove leading slashes.
     */
    const normalizedPath = imagePath.replace(
        /^[/\\]+/,
        ""
    );

    /*
     * If the database contains uploads/...
     * remove uploads because UPLOADS_DIRECTORY
     * already points to src/uploads.
     */
    const relativePath =
        normalizedPath.startsWith("uploads/")
            ? normalizedPath.substring(
                  "uploads/".length
              )
            : normalizedPath;

    return path.resolve(
        UPLOADS_DIRECTORY,
        relativePath
    );
};

/*
|--------------------------------------------------------------------------
| Create composed gallery image
|--------------------------------------------------------------------------
*/

const createComposedGalleryImage = async ({
    sourcePath,
    title,
    description,
    originalImagePath,
}) => {
    if (!sourcePath) {
        throw new Error(
            "Source image path is required for composition."
        );
    }

    /*
     * Ensure composed directory exists.
     */
    await fs.mkdir(COMPOSED_DIRECTORY, {
        recursive: true,
    });

    /*
     * Use the original/optimized filename
     * but always output JPEG because
     * createGalleryImage() generates JPEG.
     */
    const sourceFilename = path.basename(
        sourcePath
    );

    const filenameWithoutExtension =
        path.parse(sourceFilename).name;

    const composedFilename = `${filenameWithoutExtension}-composed.jpg`;

    const outputPath = path.join(
        COMPOSED_DIRECTORY,
        composedFilename
    );

    /*
     * Create image with permanent text overlay.
     */
    await createGalleryImage({
        inputPath: sourcePath,
        outputPath,
        title: title || "",
        description: description || "",
    });

    /*
     * Return database-relative path.
     */
    return `gallery/composed/${composedFilename}`;
};

/*
|--------------------------------------------------------------------------
| Create Gallery
|--------------------------------------------------------------------------
*/

export const createGallery = async ({
    title,
    altText,
    file,
    uploadedById,
}) => {
    /*
     * Validate metadata.
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
        error.errors = validation.errors;

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
     * Convert optimized image path
     * to filesystem path.
     */
    const optimizedAbsolutePath =
        getAbsoluteUploadPath(
            imagePaths.optimizedPath
        );

    /*
     * Create permanent composed image.
     *
     * title     -> gallery.title
     * altText   -> description shown on image
     */
    const composedPath =
        await createComposedGalleryImage({
            sourcePath:
                optimizedAbsolutePath,

            title: title.trim(),

            description:
                altText?.trim() || "",
        });

    /*
     * Create database record.
     */
    const gallery =
        await galleryRepository.createGallery({
            title: title.trim(),

            altText:
                altText?.trim() || null,

            /*
             * IMPORTANT:
             * Public/admin image should use
             * the composed image.
             */
            imageUrl: composedPath,

            /*
             * Keep original image separately.
             */
            originalUrl:
                imagePaths.originalPath ??
                null,

            /*
             * Thumbnail remains the normal thumbnail.
             */
            thumbnailUrl:
                imagePaths.thumbnailPath ??
                null,

            fileSize:
                file.size ?? null,

            mimeType:
                "image/jpeg",

            uploadedById,
        });

    return mapGallery(gallery);
};

/*
|--------------------------------------------------------------------------
| Get Gallery Items
|--------------------------------------------------------------------------
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
        data: mapGalleryList(
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

/*
|--------------------------------------------------------------------------
| Get Gallery By ID
|--------------------------------------------------------------------------
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

/*
|--------------------------------------------------------------------------
| Update Gallery
|--------------------------------------------------------------------------
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
     * Validate metadata.
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

    /*
     * Prepare update data.
     */
    const data = {};

    const finalTitle =
        title !== undefined
            ? title.trim()
            : existingGallery.title;

    const finalAltText =
        altText !== undefined
            ? altText?.trim() || null
            : existingGallery.altText;

    /*
     * Update title.
     */
    if (title !== undefined) {
        data.title = finalTitle;
    }

    /*
     * Update description/alt text.
     */
    if (altText !== undefined) {
        data.altText = finalAltText;
    }

    /*
    |--------------------------------------------------------------------------
    | Recreate composed image
    |--------------------------------------------------------------------------
    |
    | Important:
    |
    | Even if no new file is uploaded, we must recreate
    | the composed image when title or altText changes.
    |
    */

    if (
        file ||
        title !== undefined ||
        altText !== undefined
    ) {
        let sourceImagePath;

        /*
         * New image uploaded.
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

            sourceImagePath =
                getAbsoluteUploadPath(
                    imagePaths.optimizedPath
                );

            /*
             * Store new image paths.
             */
            data.originalUrl =
                imagePaths.originalPath ??
                null;

            data.thumbnailUrl =
                imagePaths.thumbnailPath ??
                null;

            data.fileSize =
                file.size ?? null;

            data.mimeType =
                "image/jpeg";

            /*
             * Create new composed image.
             */
            data.imageUrl =
                await createComposedGalleryImage(
                    {
                        sourcePath:
                            sourceImagePath,

                        title:
                            finalTitle,

                        description:
                            finalAltText || "",
                    }
                );
        } else {
            /*
             * No new image.
             *
             * Reuse the existing original/optimized
             * source image to create a new composed image.
             */
            const existingSource =
                existingGallery.originalUrl ||
                existingGallery.imageUrl;

            sourceImagePath =
                getAbsoluteUploadPath(
                    existingSource
                );

            /*
             * If originalUrl points to the original
             * uploaded image, use it as source.
             *
             * Otherwise use current image.
             */
            data.imageUrl =
                await createComposedGalleryImage(
                    {
                        sourcePath:
                            sourceImagePath,

                        title:
                            finalTitle,

                        description:
                            finalAltText || "",
                    }
                );
        }
    }

    /*
     * Prevent empty update.
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
    |--------------------------------------------------------------------------
    | Delete old generated image
    |--------------------------------------------------------------------------
    |
    | Only delete the old composed image when a new
    | composed image was successfully created.
    |
    */

    if (data.imageUrl) {
        await deleteUploadedFiles([
            existingGallery.imageUrl,
        ]);
    }

    /*
     * If a new uploaded file was supplied,
     * delete the old original + thumbnail.
     */
    if (file) {
        await deleteUploadedFiles([
            existingGallery.originalUrl,
            existingGallery.thumbnailUrl,
        ]);
    }

    return mapGallery(gallery);
};

/*
|--------------------------------------------------------------------------
| Delete Gallery
|--------------------------------------------------------------------------
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
     * Delete all physical files.
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