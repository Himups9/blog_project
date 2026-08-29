import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../../pages/shared/forms/FormInput";
import FormTextarea from "../../pages/shared/forms/formTextarea";
import SubmitButton from "../../pages/shared/forms/SubmitButton";
import GalleryUpload from "./GalleryUpload";

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
            title: "",
            altText: "",
            image: null,
        },
    });

    const selectedImage = watch("image");

    /*
    |--------------------------------------------------------------------------
    | Reset form when initialData changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        reset({
            title: initialData?.title || "",
            altText: initialData?.altText || "",
            image: null,
        });
    }, [initialData, reset]);

    /*
    |--------------------------------------------------------------------------
    | Image Change
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (file) => {
        setValue("image", file || null, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submitHandler = async (data) => {
        if (!onSubmit) {
            return;
        }

        const formData = new FormData();

        formData.append("title", data.title.trim());

        if (data.altText?.trim()) {
            formData.append("altText", data.altText.trim());
        }

        /*
        |--------------------------------------------------------------------------
        | Image
        |--------------------------------------------------------------------------
        |
        | Create:
        |   Image is required by gallerySchema.
        |
        | Edit:
        |   Image is optional. If no new image is selected,
        |   the existing image remains unchanged.
        |
        */

        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        await onSubmit(formData);
    };

    /*
    |--------------------------------------------------------------------------
    | Button Text
    |--------------------------------------------------------------------------
    */

    const buttonText =
        submitText ||
        (isEditMode
            ? "Update Gallery"
            : "Save Gallery");

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-8"
            noValidate
        >
            {/* =========================================================
                Gallery Information
            ========================================================= */}

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

            {/* =========================================================
                Gallery Image
            ========================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Gallery Image
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Upload a JPG, PNG, or WebP image.
                        Maximum size: 5 MB.
                    </p>
                </div>

                <GalleryUpload
                    value={selectedImage}
                    onChange={handleImageChange}
                    error={errors.image}
                    disabled={loading}
                    existingImage={
                        isEditMode
                            ? initialData?.thumbnailUrl ||
                              initialData?.image ||
                              initialData?.imageUrl
                            : null
                    }
                />
            </div>

            {/* =========================================================
                Submit
            ========================================================= */}

            <div className="flex justify-end gap-3">
                <SubmitButton
                    loading={loading}
                    text={buttonText}
                    type="submit"
                />
            </div>
        </form>
    );
};

export default GalleryForm;