// frontend/src/features/dashboard/components/RecentGallery.jsx

import React from "react";
import { Image as ImageIcon } from "lucide-react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api";

const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "");

    return `${baseUrl}/uploads/${imageUrl}`;
};

const RecentGallery = ({ gallery = [] }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Gallery
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Recently uploaded gallery images.
                </p>
            </div>

            {gallery.length === 0 ? (
                <div className="mt-5 flex min-h-32 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                        <ImageIcon className="mx-auto h-6 w-6 text-gray-400" />

                        <p className="mt-2 text-sm text-gray-500">
                            No gallery items found.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {gallery.map((item) => {
                        const imageUrl = getImageUrl(
                            item.thumbnailUrl || item.imageUrl
                        );

                        return (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-lg border border-gray-200"
                            >
                                <div className="aspect-square bg-gray-100">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={item.title || "Gallery image"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <ImageIcon className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-3">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentGallery;