import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    UploadCloud,
    Image as ImageIcon,
    RefreshCcw,
    Trash2,
} from "lucide-react";

const FaviconUploader = ({
    value,
    onChange,
    label = "Favicon",
    disabled = false,
    maxSize = 1024 * 1024,
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

        if (!file) {

            return false;

        }

        if (file.size > maxSize) {

            alert("Favicon must be smaller than 1 MB.");

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

    const removeFile = () => {

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
                onDragOver={(event) => {

                    event.preventDefault();

                    setDragging(true);

                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => {

                    if (!disabled) {

                        inputRef.current?.click();

                    }

                }}
                className={[
                    "rounded-2xl border-2 border-dashed transition-all",
                    dragging
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300",
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-blue-500",
                ].join(" ")}
            >

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept=".ico,image/png,image/svg+xml,image/webp"
                    disabled={disabled}
                    onChange={handleInputChange}
                />

                {preview ? (

                    <div className="flex flex-col items-center p-8">

                        <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-white shadow">

                            <img
                                src={preview}
                                alt="Favicon Preview"
                                className="h-10 w-10 object-contain"
                            />

                        </div>

                        <div className="mt-6 flex gap-3">

                            <button
                                type="button"
                                onClick={(event) => {

                                    event.stopPropagation();

                                    inputRef.current?.click();

                                }}
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                            >

                                <RefreshCcw size={16} />

                                Replace

                            </button>

                            <button
                                type="button"
                                onClick={(event) => {

                                    event.stopPropagation();

                                    removeFile();

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

                            Upload Favicon

                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            Drag & drop your favicon here
                            <br />
                            or click to browse

                        </p>

                        <div className="mt-5 rounded-xl bg-gray-100 px-4 py-3 text-xs text-gray-600">

                            <div className="flex items-center justify-center gap-2">

                                <ImageIcon size={14} />

                                ICO, PNG, SVG or WEBP

                            </div>

                            <div className="mt-2">

                                Recommended: 32×32 or 48×48 px

                            </div>

                            <div>

                                Maximum size: 1 MB

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};

FaviconUploader.propTypes = {

    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),

    onChange: PropTypes.func.isRequired,

    label: PropTypes.string,

    disabled: PropTypes.bool,

    maxSize: PropTypes.number,

};

export default FaviconUploader;