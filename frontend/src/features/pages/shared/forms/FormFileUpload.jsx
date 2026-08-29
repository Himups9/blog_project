import React, { useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const FormFileUpload = ({
    label,
    name,
    register,
    errors = {},
    watch,
    onChange,
    disabled = false,
    currentImage = null,
    required = false,
    accept = "image/jpeg,image/png,image/webp",
    previewClassName = "h-24 w-24 rounded-full",
}) => {
    const inputRef = useRef(null);

    const [preview, setPreview] = useState(
        currentImage || null
    );

    const [fileError, setFileError] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Watch React Hook Form value
    |--------------------------------------------------------------------------
    */

    const fileValue = watch
        ? watch(name)
        : null;

    /*
    |--------------------------------------------------------------------------
    | Preview
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        let objectUrl = null;

        let file = null;

        if (fileValue instanceof FileList) {
            file = fileValue[0] || null;
        } else if (fileValue instanceof File) {
            file = fileValue;
        }

        if (file) {
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

    /*
    |--------------------------------------------------------------------------
    | Validate File
    |--------------------------------------------------------------------------
    */

    const validateFile = (file) => {
        if (!file) {
            return "";
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return "Only JPG, PNG, and WebP images are allowed.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "Image must not exceed 5 MB.";
        }

        return "";
    };

    /*
    |--------------------------------------------------------------------------
    | Handle Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {
        const file =
            event.target.files?.[0] || null;

        setFileError("");

        if (file) {
            const validationError =
                validateFile(file);

            if (validationError) {
                setFileError(validationError);

                event.target.value = "";

                onChange?.(null);

                return;
            }
        }

        /*
         * Allow parent component to receive File.
         */
        onChange?.(file);
    };

    /*
    |--------------------------------------------------------------------------
    | React Hook Form registration
    |--------------------------------------------------------------------------
    */

    const registration = register
        ? register(name)
        : {};

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    const fieldError =
        fileError ||
        errors?.[name]?.message ||
        "";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-3">

            {/* =====================================================
                Label
            ===================================================== */}

            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>
            )}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* =================================================
                    Preview
                ================================================= */}

                <div
                    className={`relative shrink-0 overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-sm ${previewClassName}`}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt={
                                label ||
                                "Image preview"
                            }
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* =================================================
                    Upload
                ================================================= */}

                <div className="flex-1">

                    <input
                        ref={inputRef}
                        id={name}
                        type="file"
                        accept={accept}
                        disabled={disabled}
                        required={required}
                        {...registration}
                        onChange={(event) => {
                            registration.onChange?.(
                                event
                            );

                            handleChange(event);
                        }}
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
                                fieldError
                                    ? "border-red-500"
                                    : "border-slate-300"
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        `}
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        JPG, JPEG, PNG or WEBP.
                        Maximum size: 5 MB.
                    </p>

                    {fieldError && (
                        <p className="mt-1 text-sm text-red-500">
                            {fieldError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormFileUpload;