import { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Image,
    Upload,
    X,
} from "lucide-react";

const UploadDropzone = ({
    value = null,
    onChange,
    accept = "image/*",
    maxSize = 5 * 1024 * 1024,
    multiple = false,
    disabled = false,
    label = "Upload Image",
    helperText = "Drag & drop an image here or click to browse.",
}) => {

    const inputRef = useRef(null);

    const [dragging, setDragging] = useState(false);

    const [preview, setPreview] = useState(() => {

        if (!value) return null;

        if (typeof value === "string") {
            return value;
        }

        return URL.createObjectURL(value);

    });

    const handleFiles = (files) => {

        const selected = Array.from(files);

        if (!selected.length) return;

        if (!multiple && selected.length > 1) {
            return;
        }

        const invalid = selected.find(
            (file) => file.size > maxSize
        );

        if (invalid) {

            alert(
                `Maximum file size is ${Math.round(
                    maxSize / (1024 * 1024)
                )} MB`
            );

            return;

        }

        if (multiple) {

            onChange(selected);

        } else {

            const file = selected[0];

            setPreview(URL.createObjectURL(file));

            onChange(file);

        }

    };

    const handleDrop = (e) => {

        e.preventDefault();

        setDragging(false);

        if (disabled) return;

        handleFiles(e.dataTransfer.files);

    };

    const removeImage = () => {

        setPreview(null);

        onChange(null);

        if (inputRef.current) {

            inputRef.current.value = "";

        }

    };

        return (

        <div className="space-y-3">

            {/* Label */}

            {label && (

                <label className="block text-sm font-semibold text-gray-700">

                    {label}

                </label>

            )}

            {/* Dropzone */}

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!disabled) {
                        setDragging(true);
                    }
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => {
                    if (!disabled) {
                        inputRef.current?.click();
                    }
                }}
                className={[
                    "cursor-pointer rounded-2xl border-2 border-dashed p-8 transition",
                    dragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-50",
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "hover:border-blue-400 hover:bg-blue-50",
                ].join(" ")}
            >

                {!preview ? (

                    <div className="flex flex-col items-center justify-center text-center">

                        <div className="mb-4 rounded-full bg-blue-100 p-4">

                            <Upload
                                size={36}
                                className="text-blue-600"
                            />

                        </div>

                        <h3 className="text-lg font-semibold text-gray-800">

                            {label}

                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            {helperText}

                        </p>

                        <button
                            type="button"
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            Browse Files
                        </button>

                    </div>

                ) : (

                    <div className="relative">

                        <img
                            src={preview}
                            alt="Preview"
                            className="mx-auto max-h-96 rounded-xl object-contain"
                        />

                        {!disabled && (

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                                className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow transition hover:bg-red-700"
                            >

                                <X size={18} />

                            </button>

                        )}

                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">

                            <Image size={18} />

                            <span className="text-sm">
                                Click anywhere to replace this image.
                            </span>

                        </div>

                    </div>

                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    className="hidden"
                    onChange={(e) =>
                        handleFiles(e.target.files)
                    }
                />

            </div>

            <p className="text-xs text-gray-500">

                Supported formats: JPG, JPEG, PNG, GIF, WEBP

            </p>

            <p className="text-xs text-gray-500">

                Maximum file size:{" "}
                {Math.round(maxSize / (1024 * 1024))} MB

            </p>

        </div>

    );

    UploadDropzone.propTypes = {

    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(File),
    ]),

    onChange: PropTypes.func.isRequired,

    accept: PropTypes.string,

    maxSize: PropTypes.number,

    multiple: PropTypes.bool,

    disabled: PropTypes.bool,

    label: PropTypes.string,

    helperText: PropTypes.string,

};

UploadDropzone.defaultProps = {

    value: null,

    accept: "image/*",

    maxSize: 5 * 1024 * 1024,

    multiple: false,

    disabled: false,

    label: "Upload Image",

    helperText:
        "Drag & drop an image here or click to browse.",

};}

export default UploadDropzone;