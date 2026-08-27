import React from "react";
import { X, ExternalLink } from "lucide-react";

const GalleryPreview = ({
    gallery,
    isOpen,
    onClose,
}) => {
    if (!isOpen || !gallery) {
        return null;
    }

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://127.0.0.1:5001";

    // =========================================================
    // Build image URL
    // =========================================================

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

        return `${API_BASE_URL}/uploads/${imagePath.replace(
            /^\/+/,
            ""
        )}`;
    };

    // =========================================================
    // Format file size
    // =========================================================

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

        return `${(bytes / (1024 * 1024)).toFixed(
            2
        )} MB`;
    };

    // =========================================================
    // Image URLs
    // =========================================================

    const imageUrl = getImageUrl(
        gallery.imageUrl
    );

    const originalUrl = getImageUrl(
        gallery.originalUrl || gallery.imageUrl
    );

    // =========================================================
    // Uploader
    // =========================================================

    const uploaderName =
        gallery.uploadedBy?.name ||
        [
            gallery.uploadedBy?.firstName,
            gallery.uploadedBy?.lastName,
        ]
            .filter(Boolean)
            .join(" ") ||
        gallery.uploadedBy?.email ||
        "Unknown";

    // =========================================================
    // Render
    // =========================================================

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-preview-title"
        >
            <div
                className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =================================================
                    Header
                ================================================= */}

                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <div className="min-w-0">
                        <h2
                            id="gallery-preview-title"
                            className="truncate text-lg font-semibold text-gray-900"
                        >
                            {gallery.title ||
                                "Gallery Preview"}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Gallery image preview
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                        aria-label="Close preview"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* =================================================
                    Main Content
                ================================================= */}

                <div className="grid min-h-0 flex-1 overflow-auto lg:grid-cols-[minmax(0,1fr)_280px]">
                    {/* Image */}

                    <div className="flex min-h-87.5 items-center justify-center bg-gray-100 p-4 lg:min-h-137.5">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={
                                    gallery.altText ||
                                    gallery.title ||
                                    "Gallery image"
                                }
                                className="max-h-[70vh] max-w-full rounded-lg object-contain"
                            />
                        ) : (
                            <p className="text-sm text-gray-500">
                                Image unavailable
                            </p>
                        )}
                    </div>

                    {/* Information */}

                    <div className="border-t border-gray-200 bg-white p-5 lg:border-l lg:border-t-0">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Image Information
                        </h3>

                        <div className="space-y-4">
                            {/* Title */}

                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    Title
                                </p>

                                <p className="mt-1 text-sm text-gray-900">
                                    {gallery.title ||
                                        "Untitled"}
                                </p>
                            </div>

                            {/* Alt text */}

                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    Alt Text
                                </p>

                                <p className="mt-1 text-sm text-gray-900">
                                    {gallery.altText ||
                                        "No alt text"}
                                </p>
                            </div>

                            {/* File type */}

                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    File Type
                                </p>

                                <p className="mt-1 text-sm text-gray-900">
                                    {gallery.mimeType ||
                                        "Unknown"}
                                </p>
                            </div>

                            {/* File size */}

                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    File Size
                                </p>

                                <p className="mt-1 text-sm text-gray-900">
                                    {formatFileSize(
                                        gallery.fileSize
                                    )}
                                </p>
                            </div>

                            {/* Uploaded by */}

                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    Uploaded By
                                </p>

                                <p className="mt-1 wrap-break-words text-sm text-gray-900">
                                    {uploaderName}
                                </p>
                            </div>

                            {/* Created date */}

                            {gallery.createdAt && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Uploaded
                                    </p>

                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(
                                            gallery.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {/* Original image */}

                            {originalUrl && (
                                <a
                                    href={originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    <ExternalLink
                                        size={16}
                                    />

                                    Open Original
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    Footer
                ================================================= */}

                <div className="flex justify-end border-t border-gray-200 px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryPreview;