import PropTypes from "prop-types";
import {
    Calendar,
    FileText,
    Mail,
    MessageSquare,
    User,
    X,
} from "lucide-react";

import CommentStatusBadge from "./CommentStatusBadge";
import CommentActions from "./CommentActions";

const CommentDetailsModal = ({
    isOpen,
    comment,
    onClose,

    onApprove,
    onReject,
    onSpam,
    onRestore,
    onDelete,
}) => {

    if (!isOpen || !comment) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Comment Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review and moderate this comment.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 overflow-y-auto p-6">

                    {/* Status */}

                    <div className="flex items-center justify-between">

                        <CommentStatusBadge
                            status={comment.status}
                        />

                        <CommentActions
                            comment={comment}
                            onApprove={onApprove}
                            onReject={onReject}
                            onSpam={onSpam}
                            onRestore={onRestore}
                            onDelete={onDelete}
                        />

                    </div>

                    {/* Continue in Message 2 */}
                                        {/* ==========================================
                        Author Information
                    =========================================== */}

                    <div className="rounded-xl border border-gray-200 p-5">

                        <h3 className="mb-4 text-lg font-semibold">
                            Author Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div className="flex items-start gap-3">

                                <User
                                    size={20}
                                    className="mt-1 text-blue-600"
                                />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Name
                                    </p>

                                    <p className="font-medium">
                                        {comment.user_name || "Unknown User"}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <Mail
                                    size={20}
                                    className="mt-1 text-green-600"
                                />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-medium break-all">
                                        {comment.user_email || "-"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ==========================================
                        Blog Information
                    =========================================== */}

                    <div className="rounded-xl border border-gray-200 p-5">

                        <h3 className="mb-4 text-lg font-semibold">
                            Blog Information
                        </h3>

                        <div className="flex items-start gap-3">

                            <FileText
                                size={20}
                                className="mt-1 text-purple-600"
                            />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Blog Title
                                </p>

                                <p className="font-medium">
                                    {comment.blog_title || "-"}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ==========================================
                        Comment Content
                    =========================================== */}

                    <div className="rounded-xl border border-gray-200 p-5">

                        <h3 className="mb-4 text-lg font-semibold">
                            Comment
                        </h3>

                        <div className="flex items-start gap-3">

                            <MessageSquare
                                size={20}
                                className="mt-1 text-indigo-600"
                            />

                            <div className="flex-1 rounded-xl bg-gray-50 p-4">

                                <p className="whitespace-pre-wrap break-words leading-7 text-gray-700">
                                    {comment.content}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ==========================================
                        Dates
                    =========================================== */}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div className="rounded-xl border border-gray-200 p-5">

                            <div className="flex items-start gap-3">

                                <Calendar
                                    size={20}
                                    className="mt-1 text-orange-600"
                                />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Created At
                                    </p>

                                    <p className="font-medium">

                                        {comment.created_at
                                            ? new Date(
                                                  comment.created_at
                                              ).toLocaleString()
                                            : "-"}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-xl border border-gray-200 p-5">

                            <div className="flex items-start gap-3">

                                <Calendar
                                    size={20}
                                    className="mt-1 text-blue-600"
                                />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Last Updated
                                    </p>

                                    <p className="font-medium">

                                        {comment.updated_at
                                            ? new Date(
                                                  comment.updated_at
                                              ).toLocaleString()
                                            : "-"}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Continue in Message 3 */}
                                        {/* ==========================================
                        Moderator Reply
                    =========================================== */}

                    {comment.reply && (

                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">

                            <h3 className="mb-4 text-lg font-semibold text-green-700">
                                Moderator Reply
                            </h3>

                            <p className="whitespace-pre-wrap leading-7 text-gray-700">
                                {comment.reply}
                            </p>

                        </div>

                    )}

                    {/* ==========================================
                        Report Information
                    =========================================== */}

                    {comment.report_reason && (

                        <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                            <h3 className="mb-4 text-lg font-semibold text-red-700">
                                Report Information
                            </h3>

                            <div className="space-y-4">

                                <div>

                                    <p className="text-sm font-medium text-gray-500">
                                        Reason
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {comment.report_reason}
                                    </p>

                                </div>

                                {comment.report_description && (

                                    <div>

                                        <p className="text-sm font-medium text-gray-500">
                                            Description
                                        </p>

                                        <p className="mt-1 whitespace-pre-wrap text-gray-700">
                                            {comment.report_description}
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    )}

                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-5">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

};

CommentDetailsModal.propTypes = {

    isOpen: PropTypes.bool.isRequired,

    comment: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        status: PropTypes.string,

        user_name: PropTypes.string,

        user_email: PropTypes.string,

        blog_title: PropTypes.string,

        content: PropTypes.string,

        created_at: PropTypes.string,

        updated_at: PropTypes.string,

        reply: PropTypes.string,

        report_reason: PropTypes.string,

        report_description: PropTypes.string,

    }),

    onClose: PropTypes.func.isRequired,

    onApprove: PropTypes.func,

    onReject: PropTypes.func,

    onSpam: PropTypes.func,

    onRestore: PropTypes.func,

    onDelete: PropTypes.func,

};

export default CommentDetailsModal;