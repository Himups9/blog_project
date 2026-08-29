import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useGallery from "../hooks/useGallery";
import GalleryGrid from "../components/GalleryGrid";
import DeleteGalleryModal from "../components/DeleteGalleryModal";

const Gallery = () => {
    const navigate = useNavigate();

    const {
        galleryItems,
        pagination,
        page,
        limit,
        search,
        loading,
        actionLoading,
        error,
        handleSearch,
        handlePageChange,
        handleLimitChange,
        removeGallery,
        clearError,
    } = useGallery();

    const [deleteItem, setDeleteItem] =
        useState(null);

    // =========================================================
    // Delete
    // =========================================================

    const handleDeleteConfirm = async () => {
        if (!deleteItem) {
            return;
        }

        try {
            await removeGallery(deleteItem.id);

            toast.success(
                "Gallery item deleted successfully."
            );

            setDeleteItem(null);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Failed to delete gallery item."
            );
        }
    };

    // =========================================================
    // Search
    // =========================================================

    const handleSearchChange = (event) => {
        handleSearch(event.target.value);
    };

    const clearSearch = () => {
        handleSearch("");
    };

    // =========================================================
    // Pagination
    // =========================================================

    const totalPages =
        pagination?.totalPages || 0;

    const total =
        pagination?.total || 0;

    // =========================================================
    // Render
    // =========================================================

    return (
        <div className="space-y-6">
            {/* =================================================
                Page Header
            ================================================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gallery
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your website gallery images.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/gallery/create")
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Add Gallery
                </button>
            </div>

            {/* =================================================
                Error
            ================================================= */}

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={clearError}
                        className="ml-4 text-red-500 hover:text-red-700"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* =================================================
                Toolbar
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search */}
                    <div className="relative w-full lg:max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={
                                handleSearchChange
                            }
                            placeholder="Search gallery..."
                            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                aria-label="Clear search"
                            >
                                <X size={17} />
                            </button>
                        )}
                    </div>

                    {/* Total */}
                    <div className="text-sm text-gray-500">
                        Total Images:{" "}
                        <span className="font-semibold text-gray-900">
                            {total}
                        </span>
                    </div>
                </div>
            </div>

            {/* =================================================
                Gallery Grid
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <GalleryGrid
                    galleryItems={galleryItems}
                    loading={loading}
                    onDelete={setDeleteItem}
                    onEdit={(item) =>
                        navigate(
                            `/admin/gallery/edit/${item.id}`
                        )
                    }
                    onPreview={(item) =>
                        navigate(
                            `/admin/gallery/${item.id}`
                        )
                    }
                />
            </div>

            {/* =================================================
                Pagination
            ================================================= */}

            {!loading &&
                galleryItems.length > 0 &&
                totalPages > 0 && (
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        {/* Page information */}
                        <div className="text-sm text-gray-500">
                            Page{" "}
                            <span className="font-semibold text-gray-900">
                                {page}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900">
                                {totalPages}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    handlePageChange(
                                        page - 1
                                    )
                                }
                                disabled={
                                    page <= 1 ||
                                    loading
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handlePageChange(
                                        page + 1
                                    )
                                }
                                disabled={
                                    page >=
                                        totalPages ||
                                    loading
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                        {/* Limit */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Show</span>

                            <select
                                value={limit}
                                onChange={(event) =>
                                    handleLimitChange(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    loading ||
                                    actionLoading
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                            >
                                <option value={10}>
                                    10
                                </option>

                                <option value={20}>
                                    20
                                </option>

                                <option value={50}>
                                    50
                                </option>

                                <option value={100}>
                                    100
                                </option>
                            </select>

                            <span>per page</span>
                        </div>
                    </div>
                )}

            {/* =================================================
                Delete Modal
            ================================================= */}

            <DeleteGalleryModal
                gallery={deleteItem}
                isOpen={Boolean(deleteItem)}
                onClose={() => {
                    if (!actionLoading) {
                        setDeleteItem(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                loading={actionLoading}
            />
        </div>
    );
};

export default Gallery;