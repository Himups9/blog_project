// src/utils/image.js

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const uploadRoot = path.resolve(
    process.cwd(),
    "src/uploads"
);

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

    if (!folder) {
        const error = new Error(
            "Upload folder is required."
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

    const folderRoot = path.join(
        uploadRoot,
        folder
    );

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
            file.originalname
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
                    fit: height
                        ? "inside"
                        : "inside",
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
                    ? `${folder}/original/${originalFilename}`
                    : null,

            optimizedPath:
                `${folder}/optimized/${optimizedFilename}`,

            thumbnailPath:
                generateThumbnail
                    ? `${folder}/thumbnails/${optimizedFilename}`
                    : null,

        };

    } catch (error) {

        /*
        |--------------------------------------------------------------------------
        | Cleanup
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