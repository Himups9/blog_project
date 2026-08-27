import PropTypes from "prop-types";
import {
    Calendar,
    FileText,
    Mail,
    MessageSquare,
    User,
} from "lucide-react";

import CommentActions from "./CommentActions";
import CommentStatusBadge from "./CommentStatusBadge";

const CommentCard = ({
    comment,

    onApprove,
    onReject,
    onSpam,
    onRestore,
    onDelete,
}) => {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

            {/* ==========================================
                Header
            =========================================== */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h3 className="flex items-center gap-2 text-lg font-semibold">

                        <User
                            size={18}
                            className="text-blue-600"
                        />

                        {comment.user_name || "Unknown User"}

                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">

                        <Mail size={15} />

                        {comment.user_email || "-"}

                    </p>

                </div>

                <CommentStatusBadge
                    status={comment.status}
                    size="sm"
                />

            </div>

            {/* ==========================================
                Blog
            =========================================== */}

            <div className="mt-5 flex items-start gap-3">

                <FileText
                    size={18}
                    className="mt-1 text-purple-600"
                />

                <div>

                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Blog
                    </p>

                    <p className="font-medium text-gray-900">
                        {comment.blog_title || "-"}
                    </p>

                </div>

            </div>

            {/* ==========================================
                Continue in Message 2
            =========================================== */}
                        {/* ==========================================
                Comment Content
            =========================================== */}

            <div className="mt-5">

                <div className="mb-2 flex items-center gap-2">

                    <MessageSquare
                        size={18}
                        className="text-indigo-600"
                    />

                    <span className="text-sm font-semibold text-gray-700">
                        Comment
                    </span>

                </div>

                <p className="rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">

                    {comment.content}

                </p>

            </div>

            {/* ==========================================
                Dates
            =========================================== */}

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <Calendar
                        size={16}
                        className="text-orange-500"
                    />

                    <span className="font-medium">
                        Created:
                    </span>

                    <span>

                        {comment.created_at
                            ? new Date(
                                  comment.created_at
                              ).toLocaleDateString()
                            : "-"}

                    </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <Calendar
                        size={16}
                        className="text-blue-500"
                    />

                    <span className="font-medium">
                        Updated:
                    </span>

                    <span>

                        {comment.updated_at
                            ? new Date(
                                  comment.updated_at
                              ).toLocaleDateString()
                            : "-"}

                    </span>

                </div>

            </div>

            {/* ==========================================
                Actions
            =========================================== */}

            <div className="mt-6 border-t border-gray-200 pt-5">

                <CommentActions
                    comment={comment}
                    showView
                    showApprove={comment.status !== "approved"}
                    showReject={comment.status === "pending"}
                    showSpam={comment.status !== "spam"}
                    showRestore={comment.status === "spam"}
                    showDelete
                    onApprove={onApprove}
                    onReject={onReject}
                    onSpam={onSpam}
                    onRestore={onRestore}
                    onDelete={onDelete}
                />

            </div>

            {/* ==========================================
                Continue in Message 3
            =========================================== */}

        </div>

    );
};

    CommentCard.propTypes = {

    comment: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,

        user_name: PropTypes.string,

        user_email: PropTypes.string,

        blog_title: PropTypes.string,

        content: PropTypes.string,

        status: PropTypes.oneOf([
            "pending",
            "approved",
            "rejected",
            "spam",
            "reported",
        ]),

        created_at: PropTypes.string,

        updated_at: PropTypes.string,

    }).isRequired,

    onApprove: PropTypes.func,

    onReject: PropTypes.func,

    onSpam: PropTypes.func,

    onRestore: PropTypes.func,

    onDelete: PropTypes.func,

};

CommentCard.defaultProps = {

    onApprove: undefined,

    onReject: undefined,

    onSpam: undefined,

    onRestore: undefined,

    onDelete: undefined,

};

export default CommentCard;
