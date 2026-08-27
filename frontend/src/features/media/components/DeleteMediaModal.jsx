import PropTypes from "prop-types";
import {
    AlertTriangle,
    Image,
    Trash2,
    X,
} from "lucide-react";

const DeleteMediaModal = ({
    isOpen,

    media,

    loading = false,

    onClose,

    onConfirm,
}) => {

    if (!isOpen || !media) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* ============================
                    Header
                ============================ */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-3">

                            <AlertTriangle
                                size={24}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">

                                Delete Media

                            </h2>

                            <p className="text-sm text-gray-500">

                                This action cannot be undone.

                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Continue in Message 2 */}
                                {/* ==========================================
                    Body
                =========================================== */}

                <div className="space-y-6 px-6 py-6">

                    {/* Preview */}

                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <img
                            src={media.file_url}
                            alt={media.alt_text || media.file_name}
                            className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                        />

                        <div className="min-w-0 flex-1">

                            <div className="mb-2 flex items-center gap-2">

                                <Image
                                    size={18}
                                    className="text-blue-600"
                                />

                                <h3
                                    className="truncate text-lg font-semibold text-gray-900"
                                    title={media.file_name}
                                >
                                    {media.file_name}
                                </h3>

                            </div>

                            <p className="text-sm text-gray-500">

                                {media.mime_type || "-"}

                            </p>

                            <p className="mt-1 text-sm text-gray-500">

                                {media.file_size
                                    ? `${(
                                          media.file_size /
                                          1024
                                      ).toFixed(1)} KB`
                                    : "-"}

                            </p>

                        </div>

                    </div>

                    {/* Warning */}

                    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                        <div className="flex items-start gap-3">

                            <AlertTriangle
                                size={22}
                                className="mt-0.5 text-red-600"
                            />

                            <div>

                                <h4 className="font-semibold text-red-700">

                                    Permanent Deletion

                                </h4>

                                <p className="mt-2 text-sm leading-6 text-red-600">

                                    This media file will be permanently deleted
                                    from the system. Any blog posts, categories,
                                    or other content currently using this image
                                    may no longer display it correctly.

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Confirmation */}

                    <p className="text-center text-sm text-gray-600">

                        Are you sure you want to delete this media file?

                    </p>

                </div>

                {/* Continue in Message 3 */}
                                {/* ==========================================
                    Footer
                =========================================== */}

                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => onConfirm?.(media)}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <Trash2 size={18} />

                        {loading
                            ? "Deleting..."
                            : "Delete Media"}

                    </button>

                </div>

            </div>

        </div>

    );

};

DeleteMediaModal.propTypes = {

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

    }),

    loading: PropTypes.bool,

    onClose: PropTypes.func.isRequired,

    onConfirm: PropTypes.func.isRequired,

};

DeleteMediaModal.defaultProps = {

    media: null,

    loading: false,

};

export default DeleteMediaModal;