import React, { useState } from "react";
import { X } from "lucide-react";
import useGallery from "../hooks/useGallery";
import PageTransition from "../../pages/shared/components/PageTransition";
import Hero from "../../pages/shared/components/Hero";
import { heroData } from "../../pages/data/heroData";

const API_SERVER_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5001/api"
).replace(/\/api\/?$/, "");

const GalleryPage = () => {
    const {
        galleryItems,
        loading,
        error,
    } = useGallery({
        autoFetch: true,
        initialPage: 1,
        initialLimit: 50,
    });

    const [selectedGallery, setSelectedGallery] =
        useState(null);

    return (
        <PageTransition>
            <Hero {...heroData.gallery} />
            <main className="min-h-screen bg-gray-50 py-12">
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Error */}
                    {error && (
                        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    <div className="aspect-[3/2] animate-pulse bg-gray-200" />

                                    <div className="space-y-3 p-5">
                                        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading &&
                        !error &&
                        galleryItems.length === 0 && (
                            <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
                                <div className="text-center">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        No gallery images
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        There are currently no images available.
                                    </p>
                                </div>
                            </div>
                        )}

                    {/* Gallery */}
                    {!loading && galleryItems.length > 0 && (
                        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                            {galleryItems.map((gallery) => (
                                <article
                                    key={gallery.id}
                                    className="mb-6 break-inside-avoid"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedGallery(gallery)
                                        }
                                        className="group relative block w-full overflow-hidden rounded-xl bg-gray-100 text-left shadow-sm transition hover:shadow-lg"
                                        aria-label={`View ${
                                            gallery.title || "gallery image"
                                        }`}
                                    >
                                        {/* Image */}
                                        <GalleryImage gallery={gallery} />

                                        {/* Dark gradient at bottom */}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-5 pt-16">
                                            {/* Title */}
                                            <h2 className="text-lg font-semibold text-white drop-shadow">
                                                {gallery.title || "Untitled"}
                                            </h2>

                                            {/* Description */}
                                            {gallery.altText && (
                                                <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/85 drop-shadow">
                                                    {gallery.altText}
                                                </p>
                                            )}
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}

                </div>

                {/* =====================================================
                    Image Preview Modal
                ===================================================== */}

                {selectedGallery && (
                    <GalleryLightbox
                        gallery={selectedGallery}
                        onClose={() => setSelectedGallery(null)}
                    />
                )}
            </main>
        </PageTransition>
    );
};

/*
|--------------------------------------------------------------------------
| Gallery Image
|--------------------------------------------------------------------------
*/

const GalleryImage = ({ gallery }) => {
    const imagePath =
        gallery.thumbnailUrl ||
        gallery.imageUrl ||
        gallery.optimizedUrl;

    if (!imagePath) {
        return (
            <div className="flex aspect-[3/2] items-center justify-center text-sm text-gray-400">
                No image
            </div>
        );
    }

    const imageUrl =
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://")
            ? imagePath
            : imagePath.startsWith("/uploads/")
                ? `${API_SERVER_URL}${imagePath}`
                : `${API_SERVER_URL}/uploads/${imagePath.replace(
                      /^\/+/,
                      ""
                  )}`;

    return (
        <img
            src={imageUrl}
            alt={
                gallery.altText ||
                gallery.title ||
                "Gallery image"
            }
            className="block h-auto w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
        />
    );
};

/*
|--------------------------------------------------------------------------
| Public Gallery Lightbox
|--------------------------------------------------------------------------
*/

const GalleryLightbox = ({
    gallery,
    onClose,
}) => {
    const imagePath =
        gallery.imageUrl ||
        gallery.originalUrl ||
        gallery.thumbnailUrl ||
        gallery.optimizedUrl;

    if (!imagePath) {
        return null;
    }

    const imageUrl =
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://")
            ? imagePath
            : imagePath.startsWith("/uploads/")
                ? `${API_SERVER_URL}${imagePath}`
                : `${API_SERVER_URL}/uploads/${imagePath.replace(
                      /^\/+/,
                      ""
                  )}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={gallery.title || "Gallery image preview"}
        >
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                aria-label="Close image preview"
            >
                <X size={22} />
            </button>

            {/* Image container */}
            <div
                className="relative max-h-[95vh] max-w-6xl overflow-hidden rounded-xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Image */}
                <img
                    src={imageUrl}
                    alt={
                        gallery.altText ||
                        gallery.title ||
                        "Gallery image"
                    }
                    className="block max-h-[90vh] max-w-full object-contain"
                />

                {/* Bottom-left title + description */}
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24">
                    <h2 className="text-xl font-semibold text-white drop-shadow-lg sm:text-2xl">
                        {gallery.title || "Untitled"}
                    </h2>

                    {gallery.altText && (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/85 drop-shadow sm:text-base">
                            {gallery.altText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;