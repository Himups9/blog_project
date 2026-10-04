import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import uploadRoot from "./uploadPath.js";

/*
|--------------------------------------------------------------------------
| Optimize Image
|--------------------------------------------------------------------------
|
| Generic image processor used by:
|
| - users
| - gallery
| - blogs
| - categories
| - settings
|
|--------------------------------------------------------------------------
*/

export async function optimizeImage(
    file,
    folder,
    options = {}
) {
    if (!file) {
        return null;
    }

    if (!file.path) {
        const error = new Error(
            "Uploaded file path is missing."
        );

        error.statusCode = 400;

        throw error;
    }

    if (
        typeof folder !== "string" ||
        !folder.trim()
    ) {
        const error = new Error(
            "Upload folder is required."
        );

        error.statusCode = 400;

        throw error;
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Folder
    |--------------------------------------------------------------------------
    */

    const normalizedFolder = folder
        .trim()
        .replace(/\\/g, "/")
        .replace(/^\/+|\/+$/g, "");

    /*
    |--------------------------------------------------------------------------
    | Prevent Path Traversal
    |--------------------------------------------------------------------------
    */

    const folderRoot = path.resolve(
        uploadRoot,
        normalizedFolder
    );

    if (
        folderRoot !== uploadRoot &&
        !folderRoot.startsWith(
            `${path.resolve(uploadRoot)}${path.sep}`
        )
    ) {
        const error = new Error(
            "Invalid upload folder."
        );

        error.statusCode = 400;

        throw error;
    }

    /*
    |--------------------------------------------------------------------------
    | Options
    |--------------------------------------------------------------------------
    */

    const {
        width = 1200,
        height = null,

        quality = 80,

        generateThumbnail = true,

        thumbnailWidth = 400,
        thumbnailHeight = 300,

        preserveOriginal = true,

        thumbnailFit = "cover",
    } = options;

    /*
    |--------------------------------------------------------------------------
    | Folder Paths
    |--------------------------------------------------------------------------
    */

    const originalDir = path.join(
        folderRoot,
        "original"
    );

    const optimizedDir = path.join(
        folderRoot,
        "optimized"
    );

    const thumbnailDir = path.join(
        folderRoot,
        "thumbnails"
    );

    /*
    |--------------------------------------------------------------------------
    | Create Directories
    |--------------------------------------------------------------------------
    */

    await fs.mkdir(
        optimizedDir,
        {
            recursive: true,
        }
    );

    if (preserveOriginal) {
        await fs.mkdir(
            originalDir,
            {
                recursive: true,
            }
        );
    }

    if (generateThumbnail) {
        await fs.mkdir(
            thumbnailDir,
            {
                recursive: true,
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Generate Unique Filename
    |--------------------------------------------------------------------------
    */

    const baseName =
        `${Date.now()}-${crypto.randomUUID()}`;

    /*
    |--------------------------------------------------------------------------
    | Original Extension
    |--------------------------------------------------------------------------
    */

    const originalExtension =
        path.extname(
            file.originalname || ""
        ).toLowerCase() || ".jpg";

    const originalFilename =
        `${baseName}${originalExtension}`;

    const optimizedFilename =
        `${baseName}.webp`;

    /*
    |--------------------------------------------------------------------------
    | Physical Paths
    |--------------------------------------------------------------------------
    */

    const originalPath = path.join(
        originalDir,
        originalFilename
    );

    const optimizedPath = path.join(
        optimizedDir,
        optimizedFilename
    );

    const thumbnailPath = path.join(
        thumbnailDir,
        optimizedFilename
    );

    try {
        /*
        |--------------------------------------------------------------------------
        | Preserve Original
        |--------------------------------------------------------------------------
        */

        if (preserveOriginal) {
            await fs.copyFile(
                file.path,
                originalPath
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Optimized Image
        |--------------------------------------------------------------------------
        */

        const optimizedImage =
            sharp(file.path)
                .rotate()
                .resize({
                    width,
                    height,
                    fit: "inside",
                    withoutEnlargement: true,
                })
                .webp({
                    quality,
                });

        await optimizedImage.toFile(
            optimizedPath
        );

        /*
        |--------------------------------------------------------------------------
        | Thumbnail
        |--------------------------------------------------------------------------
        */

        if (generateThumbnail) {
            await sharp(file.path)
                .rotate()
                .resize({
                    width: thumbnailWidth,
                    height: thumbnailHeight,
                    fit: thumbnailFit,
                    withoutEnlargement: false,
                })
                .webp({
                    quality: 75,
                })
                .toFile(
                    thumbnailPath
                );
        }

        /*
        |--------------------------------------------------------------------------
        | Remove Temporary File
        |--------------------------------------------------------------------------
        */

        await fs.unlink(
            file.path
        );

        /*
        |--------------------------------------------------------------------------
        | Return Relative Paths
        |--------------------------------------------------------------------------
        */

        return {
            originalPath:
                preserveOriginal
                    ? `${normalizedFolder}/original/${originalFilename}`
                    : null,

            optimizedPath:
                `${normalizedFolder}/optimized/${optimizedFilename}`,

            thumbnailPath:
                generateThumbnail
                    ? `${normalizedFolder}/thumbnails/${optimizedFilename}`
                    : null,
        };
    } catch (error) {
        /*
        |--------------------------------------------------------------------------
        | Cleanup Generated Files
        |--------------------------------------------------------------------------
        */

        const filesToDelete = [
            preserveOriginal
                ? originalPath
                : null,

            optimizedPath,

            generateThumbnail
                ? thumbnailPath
                : null,
        ].filter(Boolean);

        await Promise.all(
            filesToDelete.map(
                async (filePath) => {
                    try {
                        await fs.unlink(
                            filePath
                        );
                    } catch {
                        // File may not exist.
                    }
                }
            )
        );

        /*
        |--------------------------------------------------------------------------
        | Remove Temporary File
        |--------------------------------------------------------------------------
        */

        try {
            await fs.unlink(
                file.path
            );
        } catch {
            // Temporary file may already be removed.
        }

        throw error;
    }
}