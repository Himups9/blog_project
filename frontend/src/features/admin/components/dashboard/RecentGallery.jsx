// frontend/src/features/admin/components/dashboard/RecentGallery.jsx

import React from "react";
import PropTypes from "prop-types";
import {
    Image as ImageIcon,
    ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const RecentGallery = ({ gallery = [] }) => {
    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://127.0.0.1:5000/api";

    const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return null;
        }

        // Already a complete URL
        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        // Remove leading slash to avoid double slashes
        const cleanPath = imageUrl.replace(/^\/+/, "");

        return `${SERVER_BASE_URL}/${cleanPath}`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Unknown date";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Unknown date";
        }

        return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Gallery
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Recently uploaded gallery images.
                    </p>
                </div>

                <Link
                    to="/admin/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                    View All
                    <ExternalLink
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                </Link>
            </div>

            {/* Empty State */}
            {gallery.length === 0 ? (
                <div className="flex min-h-48 flex-col items-center justify-center px-5 py-8 text-center">
                    <div className="rounded-full bg-gray-100 p-3">
                        <ImageIcon
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-700">
                        No gallery items
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Recently uploaded images will appear here.
                    </p>
                </div>
            ) : (
                /* Gallery Grid */
                <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {gallery.map((item) => {
                        const imageUrl = getImageUrl(
                            item.imageUrl
                        );

                        return (
                            <Link
                                key={item.id}
                                to={`/admin/gallery/${item.id}`}
                                className="group overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition hover:border-gray-300 hover:shadow-sm"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={
                                                item.altText ||
                                                item.title ||
                                                "Gallery image"
                                            }
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            onError={(event) => {
                                                event.currentTarget.style.display =
                                                    "none";

                                                const fallback =
                                                    event
                                                        .currentTarget
                                                        .nextElementSibling;

                                                if (fallback) {
                                                    fallback.classList.remove(
                                                        "hidden"
                                                    );
                                                }
                                            }}
                                        />
                                    ) : null}

                                    {/* Image Fallback */}
                                    <div
                                        className={`${
                                            imageUrl
                                                ? "hidden"
                                                : "flex"
                                        } absolute inset-0 items-center justify-center`}
                                    >
                                        <ImageIcon
                                            className="h-8 w-8 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                        <div className="w-full p-3">
                                            <p className="truncate text-xs font-medium text-white">
                                                {item.title ||
                                                    "Untitled image"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-3">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {item.title ||
                                            "Untitled image"}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {formatDate(
                                            item.createdAt
                                        )}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

RecentGallery.propTypes = {
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            imageUrl: PropTypes.string,
            altText: PropTypes.string,
            createdAt: PropTypes.string,
        })
    ),
};

RecentGallery.defaultProps = {
    gallery: [],
};

export default RecentGallery;