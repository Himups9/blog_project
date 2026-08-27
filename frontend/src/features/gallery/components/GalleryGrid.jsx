import React from "react";
import GalleryCard from "./GalleryCard";

const GalleryGrid = ({
    galleryItems = [],
    loading = false,
    onPreview,
    onEdit,
    onDelete,
}) => {
    /*
     * Loading state
     */
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                    >
                        {/* Image skeleton */}
                        <div className="aspect-4/3 animate-pulse bg-gray-200" />

                        {/* Content skeleton */}
                        <div className="space-y-3 p-4">
                            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                            <div className="mt-4 h-9 w-full animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    /*
     * Empty state
     */
    if (!galleryItems.length) {
        return (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-7 w-7 text-gray-400"
                    >
                        <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                    </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                    No gallery items found
                </h3>

                <p className="mt-1 max-w-md text-sm text-gray-500">
                    There are no gallery images to display yet.
                </p>
            </div>
        );
    }

    /*
     * Gallery grid
     */
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryItems.map((gallery) => (
                <GalleryCard
                    key={gallery.id}
                    gallery={gallery}
                    onPreview={onPreview}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default GalleryGrid;