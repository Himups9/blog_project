import React, { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import GalleryForm from "../components/GalleryForm";
import useGallery from "../hooks/useGallery";

const EditGallery = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        fetchGalleryById,
        editGallery,
        selectedGallery,
        actionLoading,
        error,
        clearError,
    } = useGallery({
        autoFetch: false,
    });

    const [loadingGallery, setLoadingGallery] =
        useState(true);

    // =========================================================
    // Load Gallery Item
    // =========================================================

    useEffect(() => {
        const loadGallery = async () => {
            try {
                setLoadingGallery(true);
                clearError();

                await fetchGalleryById(id);
            } catch (error) {
                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Failed to load gallery item."
                );
            } finally {
                setLoadingGallery(false);
            }
        };

        if (id) {
            loadGallery();
        }
    }, [
        id,
        fetchGalleryById,
        clearError,
    ]);

    // =========================================================
    // Submit
    // =========================================================

    const handleSubmit = async (data) => {
        try {
            clearError();

            /*
             * If GalleryForm already creates FormData,
             * send it directly.
             *
             * Otherwise create FormData here.
             */
            if (data instanceof FormData) {
                await editGallery(id, data);
            } else {
                const formData = new FormData();

                if (data.title !== undefined) {
                    formData.append(
                        "title",
                        data.title
                    );
                }

                if (data.altText !== undefined) {
                    formData.append(
                        "altText",
                        data.altText || ""
                    );
                }

                if (data.image) {
                    formData.append(
                        "image",
                        data.image
                    );
                }

                await editGallery(
                    id,
                    formData
                );
            }

            toast.success(
                "Gallery item updated successfully."
            );

            navigate("/admin/gallery");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Failed to update gallery item."
            );
        }
    };

    // =========================================================
    // Cancel
    // =========================================================

    const handleCancel = () => {
        navigate("/admin/gallery");
    };

    // =========================================================
    // Loading
    // =========================================================

    if (loadingGallery) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
        );
    }

    // =========================================================
    // Not Found
    // =========================================================

    if (!selectedGallery) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                    Gallery item not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    The gallery image you are trying to edit
                    does not exist.
                </p>

                <button
                    type="button"
                    onClick={handleCancel}
                    className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Back to Gallery
                </button>
            </div>
        );
    }

    // =========================================================
    // Render
    // =========================================================

    return (
        <div className="space-y-6">
            {/* Page Header */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Gallery Image
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update the gallery image information or
                    replace the existing image.
                </p>
            </div>

            {/* Error */}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Form */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <GalleryForm
                    initialData={selectedGallery}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={actionLoading}
                    mode="edit"
                />
            </div>
        </div>
    );
};

export default EditGallery;