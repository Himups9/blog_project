import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import GalleryForm from "../components/GalleryForm";
import useGallery from "../hooks/useGallery";

const CreateGallery = () => {
    const navigate = useNavigate();

    const {
        addGallery,
        actionLoading,
        error,
        clearError,
    } = useGallery({
        autoFetch: false,
    });

    // =========================================================
    // Submit
    // =========================================================

    const handleSubmit = async (formData) => {
        try {
            clearError();

            await addGallery(formData);

            toast.success(
                "Gallery item created successfully."
            );

            navigate("/admin/gallery");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Failed to create gallery item."
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
    // Render
    // =========================================================

    return (
        <div className="space-y-6">
            {/* =================================================
                Page Header
            ================================================= */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Add Gallery Image
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Upload a new image to the website gallery.
                </p>
            </div>

            {/* =================================================
                Error
            ================================================= */}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* =================================================
                Form
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <GalleryForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={actionLoading}
                    mode="create"
                />
            </div>
        </div>
    );
};

export default CreateGallery;