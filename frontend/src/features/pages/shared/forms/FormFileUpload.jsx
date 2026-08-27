import React, { useEffect, useState } from "react";

const FormFileUpload = ({
    label,
    name,
    register,
    errors = {},
    watch,
    disabled = false,
    currentImage = null,
}) => {
    const [preview, setPreview] = useState(null);

    const fileValue = watch ? watch(name) : null;

    useEffect(() => {
        let objectUrl = null;

        if (
            fileValue instanceof FileList &&
            fileValue.length > 0
        ) {
            const file = fileValue[0];

            objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else {
            setPreview(currentImage || null);
        }

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [fileValue, currentImage]);

    return (
        <div className="space-y-3">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Preview */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-sm">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Upload */}
                <div className="flex-1">
                    <input
                        id={name}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={disabled}
                        {...register(name)}
                        className={`block w-full cursor-pointer rounded-lg border bg-white p-2 text-sm text-slate-600 transition
                            file:mr-4
                            file:rounded-md
                            file:border-0
                            file:bg-teal-50
                            file:px-4
                            file:py-2
                            file:font-medium
                            file:text-teal-700
                            hover:file:bg-teal-100
                            ${
                                errors[name]
                                    ? "border-red-500"
                                    : "border-slate-300"
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        `}
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        JPG, JPEG, PNG or WEBP. Maximum size: 5 MB.
                    </p>

                    {errors[name] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors[name].message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormFileUpload;