import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { getImageUrl } from "../../utils/imageUrl";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const FeaturedImageUpload = ({
    value,
    onChange,
    error,
    label = "Featured Image",
    required = false,
}) => {
    const inputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [localError, setLocalError] = useState("");

    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        if (typeof value === "string") {
            setPreview(getImageUrl(value));
            return;
        }

        const url = URL.createObjectURL(value);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [value]);

    const validateFile = (file) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            return "Only JPG, PNG and WEBP images are allowed.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "Image size must be less than 5MB.";
        }

        return "";
    };

    const handleFile = (file) => {
        if (!file) return;

        const validationError = validateFile(file);

        if (validationError) {
            setLocalError(validationError);
            return;
        }

        setLocalError("");
        onChange(file);
    };

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        handleFile(file);
    };

    const removeImage = () => {
        setPreview(null);
        setLocalError("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange(null);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {!preview ? (
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
                        dragging
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
                    }`}
                >
                    <UploadCloud
                        size={40}
                        className="mx-auto mb-3 text-gray-500"
                    />

                    <h4 className="font-semibold text-gray-700">
                        Click or Drag & Drop
                    </h4>

                    <p className="mt-2 text-sm text-gray-500">
                        JPG, PNG, WEBP (Max 5MB)
                    </p>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-300">
                    <img
                        src={preview}
                        alt="Featured Preview"
                        className="h-72 w-full object-cover"
                    />

                    <div className="flex items-center justify-between border-t bg-white p-4">
                        <div className="flex items-center gap-2">
                            <ImagePlus
                                size={18}
                                className="text-green-600"
                            />
                            <span className="text-sm text-gray-600">
                                Image Selected
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={removeImage}
                            className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                        >
                            <Trash2 size={16} />
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {(localError || error) && (
                <p className="text-sm text-red-600">
                    {localError || error}
                </p>
            )}
        </div>
    );
};

export default FeaturedImageUpload;
