import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

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

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://127.0.0.1:5001";

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

        return `${API_BASE_URL}/uploads/${imagePath}`;
    };

    const formatFileSize = (size) => {
        if (!size) {
            return "N/A";
        }

        if (size < 1024) {
            return `${size} B`;
        }

        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} KB`;
        }

        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const imageSource = getImageUrl(
        thumbnailUrl || imageUrl
    );

    return (
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                {imageSource ? (
                    <img
                        src={imageSource}
                        alt={altText || title || "Gallery image"}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}

                {/* Preview button */}
                <button
                    type="button"
                    onClick={() => onPreview?.(gallery)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    title="Preview image"
                    aria-label="Preview image"
                >
                    <Eye size={17} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3
                    className="truncate text-base font-semibold text-gray-900"
                    title={title}
                >
                    {title || "Untitled Gallery"}
                </h3>

                <p
                    className="mt-1 truncate text-sm text-gray-500"
                    title={altText || ""}
                >
                    {altText || "No alt text"}
                </p>

                {/* Metadata */}
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
                            {uploadedBy.name ||
                                `${uploadedBy.firstName || ""} ${
                                    uploadedBy.lastName || ""
                                }`.trim() ||
                                uploadedBy.email ||
                                "Unknown"}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                    <button
                        type="button"
                        onClick={() => onPreview?.(gallery)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <Eye size={16} />
                        Preview
                    </button>

                    <button
                        type="button"
                        onClick={() => onEdit?.(gallery)}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
                        title="Edit gallery item"
                        aria-label="Edit gallery item"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete?.(gallery)}
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