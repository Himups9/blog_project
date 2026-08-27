import PropTypes from "prop-types";
import {
    Calendar,
    Check,
    Copy,
    Download,
    Eye,
    Image,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const MediaCard = ({
    media,

    selectable = false,
    selected = false,

    onSelect,
    onPreview,
    onDownload,
    onDelete,
}) => {

    const handleCopyUrl = async () => {

        try {

            await navigator.clipboard.writeText(
                media.file_url
            );

            toast.success(
                "Image URL copied."
            );

        } catch {

            toast.error(
                "Unable to copy URL."
            );

        }

    };

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

    return (

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            {/* ===========================
                Image
            =========================== */}

            <div className="relative aspect-square overflow-hidden bg-gray-100">

                <img
                    src={media.file_url}
                    alt={media.alt_text || media.file_name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />

                {selectable && (

                    <button
                        type="button"
                        onClick={() =>
                            onSelect?.(media)
                        }
                        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            selected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-white bg-white"
                        }`}
                    >

                        {selected && (
                            <Check size={16} />
                        )}

                    </button>

                )}

            </div>

            {/* Continue in Message 2 */}
                        {/* ===========================
                Content
            =========================== */}

            <div className="space-y-4 p-4">

                {/* File Name */}

                <div>

                    <h3
                        className="truncate text-sm font-semibold text-gray-900"
                        title={media.file_name}
                    >
                        {media.file_name}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">

                        <Image size={14} />

                        {media.mime_type || "Image"}

                    </p>

                </div>

                {/* Metadata */}

                <div className="space-y-2 text-sm text-gray-600">

                    <div className="flex items-center justify-between">

                        <span>Size</span>

                        <span className="font-medium">

                            {formatFileSize(
                                media.file_size
                            )}

                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span>Dimensions</span>

                        <span className="font-medium">

                            {media.width && media.height
                                ? `${media.width} × ${media.height}`
                                : "-"}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <Calendar
                            size={14}
                            className="text-gray-400"
                        />

                        <span>

                            {media.created_at
                                ? new Date(
                                      media.created_at
                                  ).toLocaleDateString()
                                : "-"}

                        </span>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">

                    <button
                        type="button"
                        onClick={() =>
                            onPreview?.(media)
                        }
                        className="rounded-lg p-2 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                        title="Preview"
                    >

                        <Eye size={18} />

                    </button>

                    <button
                        type="button"
                        onClick={handleCopyUrl}
                        className="rounded-lg p-2 text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                        title="Copy URL"
                    >

                        <Copy size={18} />

                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDownload?.(media)
                        }
                        className="rounded-lg p-2 text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                        title="Download"
                    >

                        <Download size={18} />

                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete?.(media)
                        }
                        className="rounded-lg p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                    >

                        <Trash2 size={18} />

                    </button>

                </div>

            </div>

            {/* Continue in Message 3 */}

        </div>

    );
    MediaCard.propTypes = {

    media: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,

        file_name: PropTypes.string.isRequired,

        file_url: PropTypes.string.isRequired,

        mime_type: PropTypes.string,

        file_size: PropTypes.number,

        width: PropTypes.number,

        height: PropTypes.number,

        alt_text: PropTypes.string,

        created_at: PropTypes.string,

    }).isRequired,

    selectable: PropTypes.bool,

    selected: PropTypes.bool,

    onSelect: PropTypes.func,

    onPreview: PropTypes.func,

    onDownload: PropTypes.func,

    onDelete: PropTypes.func,

};

MediaCard.defaultProps = {

    selectable: false,

    selected: false,

    onSelect: undefined,

    onPreview: undefined,

    onDownload: undefined,

    onDelete: undefined,

};
}

export default MediaCard;