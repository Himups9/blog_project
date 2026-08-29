import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const API_SERVER_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5001/api"
).replace(/\/api\/?$/, "");

const GalleryCard = ({
    gallery,
    onPreview,
    onEdit,
    onDelete,
}) => {
    if (!gallery) {
        return null;
    }

    const {
        id,
        title,
        thumbnailUrl,
        imageUrl,
        altText,
        mimeType,
        fileSize,
        uploadedBy,
    } = gallery;

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Build Image URL
    |--------------------------------------------------------------------------
    */

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "";
        }

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {
            return imagePath;
        }

        const normalizedPath = imagePath.startsWith("/")
            ? imagePath
            : `/${imagePath}`;

        /*
         * Backend serves uploaded files from:
         *
         * http://127.0.0.1:5001/uploads/...
         *
         * API routes use:
         *
         * http://127.0.0.1:5001/api/...
         */

        if (normalizedPath.startsWith("/uploads/")) {
            return `${API_SERVER_URL}${normalizedPath}`;
        }

        return `${API_SERVER_URL}/uploads${normalizedPath}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Image
    |--------------------------------------------------------------------------
    */

    const imageSource = getImageUrl(
        thumbnailUrl || imageUrl
    );

    /*
    |--------------------------------------------------------------------------
    | File Size
    |--------------------------------------------------------------------------
    */

    const formatFileSize = (size) => {
        if (
            size === null ||
            size === undefined ||
            Number.isNaN(Number(size))
        ) {
            return "N/A";
        }

        const bytes = Number(size);

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    /*
    |--------------------------------------------------------------------------
    | Uploader
    |--------------------------------------------------------------------------
    */

    const uploaderName =
        uploadedBy?.name ||
        [
            uploadedBy?.firstName,
            uploadedBy?.lastName,
        ]
            .filter(Boolean)
            .join(" ") ||
        uploadedBy?.email ||
        "Unknown";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">

            {/* =====================================================
                Image
            ===================================================== */}

            <div className="relative overflow-hidden bg-gray-100">

                {imageSource && !imageError ? (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-gray-200" />
                        )}

                        <img
                            src={imageSource}
                            alt={
                                altText ||
                                title ||
                                "Gallery image"
                            }
                            onLoad={() =>
                                setImageLoaded(true)
                            }
                            onError={() =>
                                setImageError(true)
                            }
                            className={`block h-auto max-h-125 w-full object-contain transition duration-300 ${
                                imageLoaded
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        />
                    </>
                ) : (
                    <div className="flex aspect-3/2 items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}

                {/* Preview */}

                <button
                    type="button"
                    onClick={() =>
                        onPreview?.(gallery)
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    title="Preview image"
                    aria-label="Preview image"
                >
                    <Eye size={17} />
                </button>
            </div>

            {/* =====================================================
                Content
            ===================================================== */}

            <div className="p-4">

                <h3
                    className="truncate text-base font-semibold text-gray-900"
                    title={title || ""}
                >
                    {title || "Untitled Gallery"}
                </h3>

                <p
                    className="mt-1 truncate text-sm text-gray-500"
                    title={altText || ""}
                >
                    {altText || "No alt text"}
                </p>

                {/* =================================================
                    Metadata
                ================================================= */}

                <div className="mt-3 space-y-1 text-xs text-gray-500">

                    {mimeType && (
                        <p>
                            <span className="font-medium text-gray-700">
                                Type:
                            </span>{" "}
                            {mimeType}
                        </p>
                    )}

                    <p>
                        <span className="font-medium text-gray-700">
                            Size:
                        </span>{" "}
                        {formatFileSize(fileSize)}
                    </p>

                    {uploadedBy && (
                        <p className="truncate">
                            <span className="font-medium text-gray-700">
                                Uploaded by:
                            </span>{" "}
                            {uploaderName}
                        </p>
                    )}
                </div>

                {/* =================================================
                    Actions
                ================================================= */}

                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">

                    <button
                        type="button"
                        onClick={() =>
                            onPreview?.(gallery)
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <Eye size={16} />
                        Preview
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onEdit?.(gallery)
                        }
                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
                        title="Edit gallery item"
                        aria-label="Edit gallery item"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete?.(gallery)
                        }
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        title="Delete gallery item"
                        aria-label="Delete gallery item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default GalleryCard;