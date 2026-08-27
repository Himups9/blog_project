import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";
import FormFileUpload from "../../pages/shared/forms/FormFileUpload";
import SubmitButton from "../../pages/shared/forms/SubmitButton";

import { gallerySchema } from "../schemas/gallerySchema";

const GalleryForm = ({
    initialData = null,
    onSubmit,
    loading = false,
    mode = "create",
    submitText,
}) => {
    const isEditMode = mode === "edit";

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(gallerySchema),
        defaultValues: {
            title: initialData?.title || "",
            altText: initialData?.altText || "",
            image: null,
        },
    });

    const selectedImage = watch("image");

    // =========================================================
    // Reset when initial data changes
    // =========================================================

    useEffect(() => {
        reset({
            title: initialData?.title || "",
            altText: initialData?.altText || "",
            image: null,
        });
    }, [initialData, reset]);

    // =========================================================
    // Image selection
    // =========================================================

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] || null;

        setValue("image", file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    // =========================================================
    // Submit
    // =========================================================

    const submitHandler = (data) => {
        if (!onSubmit) {
            return;
        }

        /*
         * Create FormData because the backend expects
         * multipart/form-data for gallery uploads.
         */

        const formData = new FormData();

        formData.append("title", data.title);

        if (data.altText) {
            formData.append("altText", data.altText);
        }

        /*
         * Image is required when creating,
         * but optional when editing.
         */

        if (data.image) {
            formData.append("image", data.image);
        }

        onSubmit(formData);
    };

    // =========================================================
    // Submit button text
    // =========================================================

    const buttonText =
        submitText ||
        (isEditMode
            ? "Update Gallery"
            : "Save Gallery");

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-8"
        >
            {/* =================================================
                Gallery Information
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Gallery Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the gallery title and image
                        information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Title */}

                    <FormInput
                        label="Title"
                        name="title"
                        placeholder="Enter gallery title"
                        register={register}
                        errors={errors}
                        required
                    />

                    {/* Alt Text */}

                    <FormTextarea
                        label="Alt Text"
                        name="altText"
                        placeholder="Describe the image for accessibility"
                        register={register}
                        errors={errors}
                        rows={4}
                    />
                </div>
            </div>

            {/* =================================================
                Gallery Image
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Gallery Image
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Upload a JPG, PNG, or WebP image.
                    </p>
                </div>

                <FormFileUpload
                    label="Image"
                    name="image"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    error={errors.image}
                    required={!isEditMode}
                />

                {/* =================================================
                    Selected New Image
                ================================================= */}

                {selectedImage && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-800">
                            Selected image
                        </p>

                        <p className="mt-1 break-all text-sm text-gray-500">
                            {selectedImage.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            {(
                                selectedImage.size /
                                (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                        </p>
                    </div>
                )}

                {/* =================================================
                    Existing Image
                ================================================= */}

                {isEditMode &&
                    initialData?.thumbnailUrl &&
                    !selectedImage && (
                        <div className="mt-5">
                            <p className="mb-2 text-sm font-medium text-gray-700">
                                Current image
                            </p>

                            <img
                                src={getImageUrl(
                                    initialData.thumbnailUrl
                                )}
                                alt={
                                    initialData.altText ||
                                    initialData.title ||
                                    "Current gallery image"
                                }
                                className="h-40 w-40 rounded-lg border border-gray-200 object-cover"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Select a new image above to
                                replace this image.
                            </p>
                        </div>
                    )}
            </div>

            {/* =================================================
                Submit
            ================================================= */}

            <div className="flex justify-end">
                <SubmitButton
                    loading={loading}
                    text={buttonText}
                    type="submit"
                />
            </div>
        </form>
    );
};

// =============================================================
// Build Gallery Image URL
// =============================================================

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

    const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL ||
        "http://127.0.0.1:5001/api";

    /*
     * Remove /api because uploaded files are served
     * from the backend root:
     *
     * http://127.0.0.1:5001/uploads/...
     */

    const serverUrl = apiBaseUrl.replace(/\/api\/?$/, "");

    return `${serverUrl}/uploads/${imagePath}`;
};

export default GalleryForm;
