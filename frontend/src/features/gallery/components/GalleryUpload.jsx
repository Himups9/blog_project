import React, { useEffect, useRef, useState } from "react";
import { ImagePlus, X, Upload } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const GalleryUpload = ({
    value = null,
    onChange,
    error = null,
    disabled = false,
    existingImage = null,
}) => {
    const inputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [fileError, setFileError] = useState("");

    /*
     * Create preview whenever a new file is selected.
     */
    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(value);

        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [value]);

    /*
     * Convert backend relative image path
     * into a browser-accessible URL.
     */
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
            "http://127.0.0.1:5001";

        return `${apiBaseUrl}/uploads/${imagePath}`;
    };

    /*
     * Validate selected file.
     */
    const validateFile = (file) => {
        if (!file) {
            return "Please select an image.";
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
     * Handle file selection.
     */
    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;

        setFileError("");

        if (!file) {
            onChange?.(null);
            return;
        }

        const validationError = validateFile(file);

        if (validationError) {
            setFileError(validationError);

            event.target.value = "";
            onChange?.(null);

            return;
        }

        onChange?.(file);
    };

    /*
     * Open file picker.
     */
    const handleSelectImage = () => {
        if (disabled) {
            return;
        }

        inputRef.current?.click();
    };

    /*
     * Remove selected image.
     */
    const handleRemove = () => {
        if (disabled) {
            return;
        }

        setFileError("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange?.(null);
    };

    const displayError =
        fileError ||
        error?.message ||
        error ||
        "";

    const currentImage =
        preview ||
        (!value && existingImage
            ? getImageUrl(existingImage)
            : null);

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
            />

            {currentImage ? (
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <div className="flex min-h-64 items-center justify-center p-4">
                        <img
                            src={currentImage}
                            alt="Gallery preview"
                            className="max-h-80 max-w-full rounded-lg object-contain"
                        />
                    </div>

                    {!disabled && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                            aria-label="Remove image"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <div className="border-t border-gray-200 bg-white px-4 py-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                {value ? (
                                    <>
                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {value.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {(
                                                value.size /
                                                (1024 * 1024)
                                            ).toFixed(2)}{" "}
                                            MB
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        Current gallery image
                                    </p>
                                )}
                            </div>

                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={handleSelectImage}
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <Upload size={16} />
                                    Replace Image
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleSelectImage}
                    disabled={disabled}
                    className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                        <ImagePlus
                            size={26}
                            className="text-gray-500"
                        />
                    </div>

                    <p className="text-sm font-semibold text-gray-800">
                        Click to upload an image
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG or WebP
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Maximum size: 5 MB
                    </p>
                </button>
            )}

            {displayError && (
                <p className="text-sm text-red-600">
                    {displayError}
                </p>
            )}
        </div>
    );
};

export default GalleryUpload;