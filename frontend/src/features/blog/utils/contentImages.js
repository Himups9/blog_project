import { getImageUrl, SERVER_BASE_URL } from "../../utils/imageUrl";

const serverUploadsPrefix = `${SERVER_BASE_URL}/uploads/`;

export const normalizeBlogContentForDisplay = (content = "") =>
    String(content).replace(
        /(<img\b[^>]*\bsrc=["'])(\/uploads\/[^"']+)(["'])/gi,
        (_, prefix, imagePath, suffix) =>
            `${prefix}${getImageUrl(imagePath)}${suffix}`
    );

export const normalizeBlogContentForStorage = (content = "") =>
    String(content).replaceAll(
        serverUploadsPrefix,
        "/uploads/"
    );
