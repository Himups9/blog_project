import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
    Calendar,
    Copy,
    Download,
    Image,
    X,
} from "lucide-react";

const ImagePreviewModal = ({
    isOpen,

    media,

    onClose,

    onDownload,

    onDelete,
}) => {

    if (!isOpen || !media) {

        return null;

    }

    const formatFileSize = (bytes) => {

        if (!bytes) return "-";

        if (bytes < 1024) {

            return `${bytes} B`;

        }

        if (bytes < 1024 * 1024) {

            return `${(
                bytes / 1024
            ).toFixed(1)} KB`;

        }

        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(2)} MB`;

    };

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(
                media.file_url
            );

            toast.success(
                "Image URL copied."
            );

        } catch {

            toast.error(
                "Unable to copy image URL."
            );

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Image Preview

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            View image details and available actions.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Continue in Message 2 */}
                                {/* Body */}

                <div className="grid max-h-[calc(90vh-90px)] grid-cols-1 overflow-y-auto lg:grid-cols-2">

                    {/* ==========================================
                        Image Preview
                    =========================================== */}

                    <div className="flex items-center justify-center bg-gray-100 p-6">

                        <img
                            src={media.file_url}
                            alt={media.alt_text || media.file_name}
                            className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-lg"
                        />

                    </div>

                    {/* ==========================================
                        Details
                    =========================================== */}

                    <div className="space-y-6 p-6">

                        <div>

                            <h3
                                className="break-all text-xl font-semibold text-gray-900"
                                title={media.file_name}
                            >
                                {media.file_name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {media.alt_text || "No alt text available"}
                            </p>

                        </div>

                        {/* File Information */}

                        <div className="rounded-xl border border-gray-200">

                            <div className="border-b border-gray-200 px-5 py-4">

                                <h4 className="font-semibold">
                                    File Information
                                </h4>

                            </div>

                            <div className="divide-y divide-gray-200">

                                <div className="flex items-center justify-between px-5 py-4">

                                    <span className="text-gray-500">
                                        File Type
                                    </span>

                                    <span className="font-medium">
                                        {media.mime_type || "-"}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between px-5 py-4">

                                    <span className="text-gray-500">
                                        File Size
                                    </span>

                                    <span className="font-medium">
                                        {formatFileSize(media.file_size)}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between px-5 py-4">

                                    <span className="text-gray-500">
                                        Dimensions
                                    </span>

                                    <span className="font-medium">

                                        {media.width && media.height
                                            ? `${media.width} × ${media.height}`
                                            : "-"}

                                    </span>

                                </div>

                                <div className="flex items-center justify-between px-5 py-4">

                                    <span className="flex items-center gap-2 text-gray-500">

                                        <Calendar size={16} />

                                        Uploaded

                                    </span>

                                    <span className="font-medium">

                                        {media.created_at
                                            ? new Date(
                                                  media.created_at
                                              ).toLocaleString()
                                            : "-"}

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Continue in Message 3 */}
                                                {/* ==========================================
                            Actions
                        =========================================== */}

                        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-6">

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100"
                            >

                                <Copy size={18} />

                                Copy URL

                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    onDownload?.(media)
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >

                                <Download size={18} />

                                Download

                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    onDelete?.(media)
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                            >

                                <Image size={18} />

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

ImagePreviewModal.propTypes = {

    isOpen: PropTypes.bool.isRequired,

    media: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        file_name: PropTypes.string,

        file_url: PropTypes.string,

        alt_text: PropTypes.string,

        mime_type: PropTypes.string,

        file_size: PropTypes.number,

        width: PropTypes.number,

        height: PropTypes.number,

        created_at: PropTypes.string,

    }),

    onClose: PropTypes.func.isRequired,

    onDownload: PropTypes.func,

    onDelete: PropTypes.func,

};

ImagePreviewModal.defaultProps = {

    media: null,

    onDownload: undefined,

    onDelete: undefined,

};

export default ImagePreviewModal;