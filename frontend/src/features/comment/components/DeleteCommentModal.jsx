import PropTypes from "prop-types";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteCommentModal = ({
    isOpen,
    comment,
    loading = false,
    onClose,
    onConfirm,
}) => {

    if (!isOpen) return null;

    const handleConfirm = () => {

        if (comment?.id) {
            onConfirm(comment.id);
        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-3">

                            <AlertTriangle
                                size={26}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Delete Comment
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
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 px-6 py-6">

                    <p className="text-gray-700">
                        Are you sure you want to permanently delete this
                        comment?
                    </p>

                    {comment && (

                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                            <div className="space-y-2">

                                <div>

                                    <span className="text-sm font-semibold text-gray-600">
                                        Author
                                    </span>

                                    <p className="font-medium text-gray-900">
                                        {comment.user_name || "Unknown"}
                                    </p>

                                </div>

                                <div>

                                    <span className="text-sm font-semibold text-gray-600">
                                        Blog
                                    </span>

                                    <p className="font-medium text-gray-900">
                                        {comment.blog_title || "-"}
                                    </p>

                                </div>

                                <div>

                                    <span className="text-sm font-semibold text-gray-600">
                                        Comment
                                    </span>

                                    <p className="mt-1 line-clamp-4 rounded-lg bg-white p-3 text-gray-700">
                                        {comment.content}
                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">

                        <p className="text-sm text-yellow-800">
                            Deleting this comment will permanently remove it
                            from the database. This operation cannot be
                            reversed.
                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-5">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >

                        <Trash2 size={18} />

                        {loading
                            ? "Deleting..."
                            : "Delete Comment"}

                    </button>

                </div>

            </div>

        </div>

    );

};

DeleteCommentModal.propTypes = {

    isOpen: PropTypes.bool.isRequired,

    loading: PropTypes.bool,

    comment: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        user_name: PropTypes.string,

        blog_title: PropTypes.string,

        content: PropTypes.string,

    }),

    onClose: PropTypes.func.isRequired,

    onConfirm: PropTypes.func.isRequired,

};

export default DeleteCommentModal;