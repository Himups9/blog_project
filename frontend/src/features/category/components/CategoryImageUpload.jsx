import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
    ImagePlus,
    Image as ImageIcon,
    RefreshCw,
    UploadCloud,
    X,
} from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const CategoryImageField = ({
    value,
    onChange,
    error,
    disabled,
    inputRef,
}) => {
    const [preview, setPreview] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (!value) {
            setPreview(null);
            setFileInfo(null);
            return;
        }

        if (typeof value === "string") {
            setPreview(value);
            setFileInfo(null);
            return;
        }

        if (value instanceof File) {
            const url = URL.createObjectURL(value);

            setPreview(url);

            setFileInfo({
                name: value.name,
                size: value.size,
                type: value.type,
            });

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [value]);

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

    const selectFile = (file) => {
        if (!file || disabled) return;

        if (!ACCEPTED_TYPES.includes(file.type)) {
            alert(
                "Only JPG, PNG and WEBP images are allowed."
            );
            return;
        }

        if (file.size > MAX_SIZE) {
            alert(
                "Image size must be less than 5 MB."
            );
            return;
        }

        onChange(file);
    };

    const removeImage = () => {
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                disabled={disabled}
                onChange={(event) =>
                    selectFile(
                        event.target.files?.[0]
                    )
                }
            />

            {!preview ? (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={(event) => {
                        event.preventDefault();
                        setDragActive(false);
                    }}
                    onDrop={(event) => {
                        event.preventDefault();
                        setDragActive(false);

                        selectFile(
                            event.dataTransfer.files?.[0]
                        );
                    }}
                    className={[
                        "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition",
                        dragActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50",
                        disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer",
                    ].join(" ")}
                >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-gray-200">
                        <UploadCloud className="h-7 w-7" />
                    </div>

                    <p className="font-semibold text-gray-900">
                        {dragActive
                            ? "Drop image here"
                            : "Upload category image"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Drag & drop or{" "}
                        <span className="font-medium text-blue-600">
                            browse
                        </span>
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                        JPG, PNG or WEBP • Maximum 5 MB
                    </p>
                </button>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="relative aspect-1200/630 overflow-hidden bg-gray-100">
                        <img
                            src={preview}
                            alt="Category preview"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4">
                            <span className="text-sm font-medium text-white">
                                Category image
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <ImagePlus className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {fileInfo?.name ||
                                        "Current image"}
                                </p>

                                {fileInfo && (
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(
                                            fileInfo.size
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                    inputRef.current?.click()
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Replace
                            </button>

                            <button
                                type="button"
                                disabled={disabled}
                                onClick={removeImage}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                            >
                                <X className="h-4 w-4" />
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
                    Recommended:{" "}
                    <span className="font-medium text-gray-700">
                        1200 × 630 px
                    </span>
                    . JPG, PNG and WEBP up to 5 MB.
                </p>
            </div>
        </div>
    );
};

const CategoryImageUpload = ({
    control,
    name = "image",
    error,
    label = "Category Image",
    description = "Upload an optional image for this category.",
    disabled = false,
}) => {
    const inputRef = useRef(null);

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                    {label}
                </label>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <CategoryImageField
                        value={field.value}
                        onChange={field.onChange}
                        error={error}
                        disabled={disabled}
                        inputRef={inputRef}
                    />
                )}
            />
        </div>
    );
};

export default CategoryImageUpload;