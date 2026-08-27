import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    UploadCloud,
    Image as ImageIcon,
    Trash2,
    RefreshCcw,
} from "lucide-react";

const LogoUploader = ({
    value,
    onChange,
    label = "Logo",
    accept = "image/png,image/jpeg,image/webp,image/svg+xml",
    maxSize = 2 * 1024 * 1024,
    disabled = false,
    helperText = "PNG, JPG, WEBP or SVG (Max 2MB)",
}) => {

    const inputRef = useRef(null);

    const [preview, setPreview] = useState("");

    const [dragging, setDragging] = useState(false);

    useEffect(() => {

        if (!value) {

            setPreview("");

            return;

        }

        if (typeof value === "string") {

            setPreview(value);

            return;

        }

        const url = URL.createObjectURL(value);

        setPreview(url);

        return () => URL.revokeObjectURL(url);

    }, [value]);

    const validateFile = (file) => {

        if (!file) return false;

        if (file.size > maxSize) {

            alert("Selected file exceeds the maximum size.");

            return false;

        }

        return true;

    };

    const handleFile = (file) => {

        if (!validateFile(file)) {

            return;

        }

        onChange(file);

    };

    const handleInputChange = (event) => {

        const file = event.target.files?.[0];

        if (file) {

            handleFile(file);

        }

    };

    const handleDrop = (event) => {

        event.preventDefault();

        setDragging(false);

        const file = event.dataTransfer.files?.[0];

        if (file) {

            handleFile(file);

        }

    };

    const removeImage = () => {

        onChange(null);

        if (inputRef.current) {

            inputRef.current.value = "";

        }

    };

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                {label}

            </label>

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={[
                    "rounded-2xl border-2 border-dashed transition-all",
                    dragging
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300",
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-blue-500",
                ].join(" ")}
                onClick={() => {

                    if (!disabled) {

                        inputRef.current?.click();

                    }

                }}
            >

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={accept}
                    onChange={handleInputChange}
                    disabled={disabled}
                />

                {preview ? (

                    <div className="p-6">

                        <img
                            src={preview}
                            alt="Logo Preview"
                            className="mx-auto h-32 object-contain"
                        />

                        <div className="mt-5 flex justify-center gap-3">

                            <button
                                type="button"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    inputRef.current?.click();

                                }}
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                            >
                                <RefreshCcw size={16} />

                                Replace

                            </button>

                            <button
                                type="button"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    removeImage();

                                }}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                <Trash2 size={16} />

                                Remove

                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="flex flex-col items-center px-6 py-12 text-center">

                        <div className="mb-4 rounded-full bg-gray-100 p-4">

                            <UploadCloud
                                size={34}
                                className="text-gray-500"
                            />

                        </div>

                        <h3 className="font-semibold text-gray-900">

                            Upload {label}

                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            Drag & drop your image here
                            <br />
                            or click to browse

                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600">

                            <ImageIcon size={14} />

                            {helperText}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

LogoUploader.propTypes = {

    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),

    onChange: PropTypes.func.isRequired,

    label: PropTypes.string,

    accept: PropTypes.string,

    maxSize: PropTypes.number,

    disabled: PropTypes.bool,

    helperText: PropTypes.string,

};

export default LogoUploader;