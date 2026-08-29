import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import useGallery from "../hooks/useGallery";

const AdminGalleryPreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        selectedGallery,
        fetchGalleryById,
        actionLoading,
        error,
    } = useGallery({
        autoFetch: false,
    });

    /*
    |--------------------------------------------------------------------------
    | Fetch Gallery Item
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!id) {
            return;
        }

        fetchGalleryById(id);
    }, [id, fetchGalleryById]);

    /*
    |--------------------------------------------------------------------------
    | Image URL
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

        const serverUrl = (
            import.meta.env.VITE_API_URL ||
            "http://127.0.0.1:5001/api"
        ).replace(/\/api\/?$/, "");

        const normalizedPath = imagePath.startsWith("/")
            ? imagePath
            : `/${imagePath}`;

        if (normalizedPath.startsWith("/uploads/")) {
            return `${serverUrl}${normalizedPath}`;
        }

        return `${serverUrl}/uploads${normalizedPath}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (actionLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-sm text-gray-500">
                    Loading gallery image...
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {
        return (
            <div className="space-y-6">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/gallery")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={16} />
                    Back to Gallery
                </button>

                <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Not Found
    |--------------------------------------------------------------------------
    */

    if (!selectedGallery) {
        return (
            <div className="space-y-6">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/gallery")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={16} />
                    Back to Gallery
                </button>

                <div className="flex min-h-80 items-center justify-center rounded-xl border border-gray-200 bg-white">
                    <p className="text-sm text-gray-500">
                        Gallery image not found.
                    </p>
                </div>
            </div>
        );
    }

    const gallery = selectedGallery;

    const imagePath =
        gallery.imageUrl ||
        gallery.thumbnailUrl ||
        gallery.optimizedUrl ||
        gallery.originalUrl;

    const imageUrl = getImageUrl(imagePath);

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-6">

            {/* =====================================================
                Header
            ===================================================== */}

            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gallery Preview
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Preview gallery image and information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/gallery")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            </div>

            {/* =====================================================
                Preview
            ===================================================== */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Image */}

                <div className="flex min-h-100 items-center justify-center bg-gray-100 p-6 lg:min-h-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={
                                gallery.altText ||
                                gallery.title ||
                                "Gallery image"
                            }
                            className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-sm"
                        />
                    ) : (
                        <p className="text-sm text-gray-500">
                            Image unavailable
                        </p>
                    )}
                </div>

                {/* Information */}

                <div className="border-t border-gray-200 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Title */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Title
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.title ||
                                    "Untitled"}
                            </p>
                        </div>

                        {/* Alt Text */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Alt Text
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.altText ||
                                    "No alt text"}
                            </p>
                        </div>

                        {/* MIME Type */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                File Type
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.mimeType ||
                                    "Unknown"}
                            </p>
                        </div>

                        {/* File Size */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                File Size
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.fileSize
                                    ? `${(
                                          Number(
                                              gallery.fileSize
                                          ) /
                                          (1024 * 1024)
                                      ).toFixed(2)} MB`
                                    : "N/A"}
                            </p>
                        </div>

                        {/* Uploaded By */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Uploaded By
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.uploadedBy?.name ||
                                    [
                                        gallery
                                            .uploadedBy
                                            ?.firstName,
                                        gallery
                                            .uploadedBy
                                            ?.lastName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ") ||
                                    gallery.uploadedBy?.email ||
                                    "Unknown"}
                            </p>
                        </div>

                        {/* Created */}

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Uploaded
                            </p>

                            <p className="mt-1 text-sm text-gray-900">
                                {gallery.createdAt
                                    ? new Date(
                                          gallery.createdAt
                                      ).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-5">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/admin/gallery/edit/${gallery.id}`
                                )
                            }
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Edit Gallery
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/gallery"
                                )
                            }
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Back to Gallery
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminGalleryPreview;