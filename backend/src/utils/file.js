import fs from "fs/promises";
import path from "path";
import uploadRoot from "./uploadPath.js";

/**
 * Delete an uploaded file.
 *
 * The path should be relative to the configured upload root.
 *
 * @param {string|null} relativePath
 * @returns {Promise<boolean>}
 */
export const deleteUploadedFile = async (
    relativePath
) => {
    if (
        typeof relativePath !== "string" ||
        !relativePath.trim()
    ) {
        return false;
    }

    const cleanPath = relativePath
        .trim()
        .replace(/^[/\\]+/, "");

    const filePath = path.resolve(
        uploadRoot,
        cleanPath
    );

    // Prevent path traversal.
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
        if (error.code === "ENOENT") {
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

    for (const filePath of filePaths) {
        if (!filePath) {
            continue;
        }

        await deleteUploadedFile(filePath);
    }
};