import PropTypes from "prop-types";
import {
    Calendar,
    FileImage,
    HardDrive,
    Image,
    Info,
    Ruler,
    X,
} from "lucide-react";

const MediaDetailsDrawer = ({
    isOpen,

    media,

    onClose,
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

    return (

        <>

            {/* Backdrop */}

            <div
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/40"
            />

            {/* Drawer */}

            <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">

                            Media Details

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            View complete information about this media file.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Continue in Message 2 */}
                                {/* ==========================================
                    Body
                =========================================== */}

                <div className="flex-1 space-y-6 overflow-y-auto p-6">

                    {/* Preview */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">

                        <img
                            src={media.file_url}
                            alt={media.alt_text || media.file_name}
                            className="h-64 w-full object-contain"
                        />

                    </div>

                    {/* File Name */}

                    <div>

                        <h3
                            className="break-all text-lg font-semibold text-gray-900"
                            title={media.file_name}
                        >
                            {media.file_name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">

                            {media.alt_text || "No alt text available"}

                        </p>

                    </div>

                    {/* Information */}

                    <div className="space-y-3 rounded-2xl border border-gray-200">

                        <div className="border-b border-gray-200 px-5 py-4">

                            <h4 className="flex items-center gap-2 font-semibold">

                                <Info size={18} />

                                File Information

                            </h4>

                        </div>

                        <div className="space-y-4 p-5">

                            <div className="flex items-center justify-between">

                                <span className="flex items-center gap-2 text-gray-500">

                                    <FileImage size={16} />

                                    Type

                                </span>

                                <span className="font-medium">

                                    {media.mime_type || "-"}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="flex items-center gap-2 text-gray-500">

                                    <HardDrive size={16} />

                                    Size

                                </span>

                                <span className="font-medium">

                                    {formatFileSize(media.file_size)}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="flex items-center gap-2 text-gray-500">

                                    <Ruler size={16} />

                                    Dimensions

                                </span>

                                <span className="font-medium">

                                    {media.width && media.height
                                        ? `${media.width} × ${media.height}`
                                        : "-"}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="flex items-center gap-2 text-gray-500">

                                    <Calendar size={16} />

                                    Uploaded

                                </span>

                                <span className="text-right font-medium">

                                    {media.created_at
                                        ? new Date(
                                              media.created_at
                                          ).toLocaleString()
                                        : "-"}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="flex items-center gap-2 text-gray-500">

                                    <Image size={16} />

                                    Alt Text

                                </span>

                                <span className="max-w-[180px] break-words text-right font-medium">

                                    {media.alt_text || "-"}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Continue in Message 3 */}
                                {/* ==========================================
                    Footer
                =========================================== */}

                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-5">

                    <button
                        type="button"
                        onClick={async () => {

                            try {

                                await navigator.clipboard.writeText(
                                    media.file_url
                                );

                            } catch (error) {

                                console.error(error);

                            }

                        }}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                    >

                        Copy URL

                    </button>

                    <div className="flex items-center gap-3">

                        <a
                            href={media.file_url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                        >

                            Download

                        </a>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-gray-800 px-5 py-2.5 font-medium text-white transition hover:bg-gray-900"
                        >

                            Close

                        </button>

                    </div>

                </div>

            </aside>

        </>

    );

};

MediaDetailsDrawer.propTypes = {

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

};

MediaDetailsDrawer.defaultProps = {

    media: null,

};

export default MediaDetailsDrawer;