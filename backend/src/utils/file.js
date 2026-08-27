import fs from "fs/promises";
import path from "path";

const uploadRoot = path.resolve(
    process.cwd(),
    "src/uploads"
);

/**
 * Delete a file from the upload directory.
 *
 * @param {string|null} relativePath
 * @returns {Promise<boolean>}
 */
export const deleteUploadedFile = async (
    relativePath
) => {
    /*
     * Nothing to delete.
     */
    if (
        typeof relativePath !== "string" ||
        !relativePath.trim()
    ) {
        return false;
    }

    /*
     * Remove leading slashes.
     *
     * Supports database values such as:
     *
     * /gallery/optimized/image.webp
     *
     * and:
     *
     * gallery/optimized/image.webp
     */
    const cleanPath =
        relativePath
            .trim()
            .replace(/^[/\\]+/, "");

    /*
     * Resolve the final path inside uploads.
     */
    const filePath = path.resolve(
        uploadRoot,
        cleanPath
    );

    /*
     * Prevent path traversal.
     *
     * Examples that must be rejected:
     *
     * ../../some-file
     * ../../../etc/passwd
     */
    if (
        filePath === uploadRoot ||
        !filePath.startsWith(
            `${uploadRoot}${path.sep}`
        )
    ) {
        throw new Error(
            "Invalid upload file path."
        );
    }

    try {
        await fs.unlink(filePath);

        return true;
    } catch (error) {
        /*
         * File has already been deleted
         * or does not exist.
         *
         * This should not break Gallery
         * deletion.
         */
        if (
            error.code === "ENOENT"
        ) {
            return false;
        }

        throw error;
    }
};

/**
 * Delete multiple uploaded files.
 *
 * @param {Array<string|null>} filePaths
 * @returns {Promise<void>}
 */
export const deleteUploadedFiles = async (
    filePaths = []
) => {
    if (!Array.isArray(filePaths)) {
        return;
    }

    for (
        const filePath of filePaths
    ) {
        if (!filePath) {
            continue;
        }

        await deleteUploadedFile(
            filePath
        );
    }
};