import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
    ImagePlus,
    UploadCloud,
    Trash2,
    RefreshCw,
    Image as ImageIcon,
} from "lucide-react";

import { getImageUrl } from "../../utils/imageUrl";

const MAX_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const FeaturedImageUpload = ({
    control,
    name = "featuredImage",
    error,
    disabled = false,
    label = "Featured Image",
    description = "Upload an optional featured image for this category.",
}) => {
    const inputRef = useRef(null);

    return (
        <div className="w-full">
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                    {label}
                </label>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <FeaturedImageField
                        field={field}
                        inputRef={inputRef}
                        error={error}
                        disabled={disabled}
                    />
                )}
            />
        </div>
    );
};

const FeaturedImageField = ({
    field,
    inputRef,
    error,
    disabled,
}) => {
    const [preview, setPreview] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Preview
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const value = field.value;

        if (!value) {
            setPreview(null);
            setFileInfo(null);
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Existing backend image
        |--------------------------------------------------------------------------
        */

        if (typeof value === "string") {
            setPreview(getImageUrl(value));
            setFileInfo(null);
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Newly selected File
        |--------------------------------------------------------------------------
        */

        if (value instanceof File) {
            const objectUrl =
                URL.createObjectURL(value);

            setPreview(objectUrl);

            setFileInfo({
                name: value.name,
                size: value.size,
                type: value.type,
            });

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        setPreview(null);
        setFileInfo(null);
    }, [field.value]);

    /*
    |--------------------------------------------------------------------------
    | File Size
    |--------------------------------------------------------------------------
    */

    const formatFileSize = (bytes) => {
        if (!bytes) return "";

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    /*
    |--------------------------------------------------------------------------
    | Select File
    |--------------------------------------------------------------------------
    */

    const selectFile = (file) => {
        if (!file || disabled) {
            return;
        }

        if (!ACCEPTED_TYPES.includes(file.type)) {
            field.onChange(null);

            window.alert(
                "Only JPG, PNG and WEBP images are allowed."
            );

            return;
        }

        if (file.size > MAX_SIZE) {
            field.onChange(null);

            window.alert(
                "Featured image must be smaller than 5 MB."
            );

            return;
        }

        field.onChange(file);
    };

    /*
    |--------------------------------------------------------------------------
    | Remove
    |--------------------------------------------------------------------------
    */

    const removeImage = () => {
        field.onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Replace
    |--------------------------------------------------------------------------
    */

    const replaceImage = () => {
        if (disabled) {
            return;
        }

        inputRef.current?.click();
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                hidden
                disabled={disabled}
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(event) => {
                    selectFile(
                        event.target.files?.[0]
                    );

                    /*
                    * Allows selecting the same file
                    * again after removing it.
                    */
                    event.target.value = "";
                }}
            />

            {!preview ? (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={replaceImage}
                    className={`
                        group
                        flex
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border-2
                        border-dashed
                        px-6
                        py-12
                        text-center
                        transition

                        ${
                            disabled
                                ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                                : "cursor-pointer border-gray-300 bg-gray-50 hover:border-amber-400 hover:bg-amber-50/40"
                        }
                    `}
                >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm ring-1 ring-gray-200 transition group-hover:scale-105">
                        <UploadCloud className="h-7 w-7" />
                    </div>

                    <span className="text-sm font-semibold text-gray-900">
                        Upload featured image
                    </span>

                    <span className="mt-1 text-sm text-gray-500">
                        Click to browse
                    </span>

                    <span className="mt-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
                        JPG · PNG · WEBP · Max 5 MB
                    </span>
                </button>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Image */}
                    <div className="relative aspect-1200/630 overflow-hidden bg-gray-100">
                        <img
                            src={preview}
                            alt="Featured image preview"
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                console.error(
                                    "Featured image failed to load:",
                                    preview
                                );

                                event.currentTarget.style.display =
                                    "none";
                            }}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5">
                            <div className="flex items-center gap-2 text-white">
                                <ImageIcon className="h-4 w-4" />

                                <span className="text-sm font-semibold">
                                    Featured image
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <ImagePlus className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {fileInfo?.name ||
                                        "Current featured image"}
                                </p>

                                {fileInfo && (
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {formatFileSize(
                                            fileInfo.size
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={replaceImage}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <RefreshCw className="h-4 w-4" />

                                Replace
                            </button>

                            <button
                                type="button"
                                disabled={disabled}
                                onClick={removeImage}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Trash2 className="h-4 w-4" />

                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error?.message && (
                <p className="text-sm font-medium text-red-600">
                    {error.message}
                </p>
            )}

            <div className="flex items-start gap-2 text-xs text-gray-500">
                <ImageIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <p>
                    Recommended size:
                    <span className="ml-1 font-medium text-gray-700">
                        1200 × 630 px
                    </span>
                    . JPG, PNG and WEBP up to 5 MB.
                </p>
            </div>
        </div>
    );
};

export default FeaturedImageUpload;