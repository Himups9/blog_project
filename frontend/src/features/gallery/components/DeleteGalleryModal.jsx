import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

const DeleteGalleryModal = ({
    gallery,
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) => {
    if (!isOpen || !gallery) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Delete Gallery Image
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <AlertTriangle size={22} />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-medium text-gray-900">
                                Are you sure?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                You are about to permanently delete
                                this gallery image. This action cannot
                                be undone.
                            </p>
                        </div>
                    </div>

                    {/* Gallery item */}
                    <div className="mt-5 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                        {gallery.thumbnailUrl && (
                            <img
                                src={gallery.thumbnailUrl}
                                alt={
                                    gallery.altText ||
                                    gallery.title ||
                                    "Gallery image"
                                }
                                className="h-14 w-14 shrink-0 rounded-lg object-cover"
                            />
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                                {gallery.title ||
                                    "Untitled Gallery"}
                            </p>

                            {gallery.altText && (
                                <p className="mt-1 truncate text-xs text-gray-500">
                                    {gallery.altText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        )}

                        {loading
                            ? "Deleting..."
                            : "Delete Gallery"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteGalleryModal;