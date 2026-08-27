import PropTypes from "prop-types";
import {
    Calendar,
    FileText,
    Mail,
    User,
} from "lucide-react";

import CommentActions from "./CommentActions";
import CommentStatusBadge from "./CommentStatusBadge";

const CommentTable = ({
    comments = [],

    selectedComments = [],

    onSelect,

    onSelectAll,

    onApprove,

    onReject,

    onSpam,

    onRestore,

    onDelete,
}) => {

    const isAllSelected =
        comments.length > 0 &&
        comments.every((comment) =>
            selectedComments.includes(comment.id)
        );

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    {/* ============================
                        Table Head
                    ============================ */}

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="w-14 px-4 py-4">

                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={(e) =>
                                        onSelectAll?.(
                                            e.target.checked
                                        )
                                    }
                                    className="h-4 w-4 rounded"
                                />

                            </th>

                            <th className="px-6 py-4 text-left">
                                Author
                            </th>

                            <th className="px-6 py-4 text-left">
                                Blog
                            </th>

                            <th className="px-6 py-4 text-left">
                                Comment
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Date
                            </th>

                            <th className="px-6 py-4 text-right">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {/* Continue in Message 2 */}

                                                {comments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No comments found.
                                </td>

                            </tr>

                        ) : (

                            comments.map((comment) => (

                                <tr
                                    key={comment.id}
                                    className="border-t transition hover:bg-gray-50"
                                >

                                    {/* Checkbox */}

                                    <td className="px-4 py-5">

                                        <input
                                            type="checkbox"
                                            checked={selectedComments.includes(
                                                comment.id
                                            )}
                                            onChange={() =>
                                                onSelect?.(comment.id)
                                            }
                                            className="h-4 w-4 rounded"
                                        />

                                    </td>

                                    {/* Author */}

                                    <td className="px-6 py-5">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2">

                                                <User
                                                    size={16}
                                                    className="text-blue-600"
                                                />

                                                <span className="font-semibold">
                                                    {comment.user_name ||
                                                        "Unknown User"}
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-500">

                                                <Mail size={15} />

                                                <span>
                                                    {comment.user_email || "-"}
                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Blog */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-start gap-2">

                                            <FileText
                                                size={16}
                                                className="mt-1 text-purple-600"
                                            />

                                            <span className="max-w-[220px] truncate font-medium">

                                                {comment.blog_title || "-"}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Comment */}

                                    <td className="px-6 py-5">

                                        <p className="max-w-sm line-clamp-2 text-sm text-gray-700">

                                            {comment.content}

                                        </p>

                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-5">

                                        <CommentStatusBadge
                                            status={comment.status}
                                            size="sm"
                                        />

                                    </td>

                                    {/* Date */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-2 text-sm text-gray-600">

                                            <Calendar
                                                size={16}
                                                className="text-orange-500"
                                            />

                                            <span>

                                                {comment.created_at
                                                    ? new Date(
                                                          comment.created_at
                                                      ).toLocaleDateString()
                                                    : "-"}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Actions */}

                                    <td className="px-6 py-5 text-right">

                                        <CommentActions
                                            comment={comment}
                                            showView
                                            showApprove={
                                                comment.status !== "approved"
                                            }
                                            showReject={
                                                comment.status === "pending"
                                            }
                                            showSpam={
                                                comment.status !== "spam"
                                            }
                                            showRestore={
                                                comment.status === "spam"
                                            }
                                            showDelete
                                            onApprove={onApprove}
                                            onReject={onReject}
                                            onSpam={onSpam}
                                            onRestore={onRestore}
                                            onDelete={onDelete}
                                        />

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {/* Continue in Message 3 */}
                    </div>

    );

};

CommentTable.propTypes = {

    comments: PropTypes.arrayOf(

        PropTypes.shape({

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

        })

    ),

    selectedComments: PropTypes.arrayOf(

        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])

    ),

    onSelect: PropTypes.func,

    onSelectAll: PropTypes.func,

    onApprove: PropTypes.func,

    onReject: PropTypes.func,

    onSpam: PropTypes.func,

    onRestore: PropTypes.func,

    onDelete: PropTypes.func,

};

CommentTable.defaultProps = {

    comments: [],

    selectedComments: [],

    onSelect: undefined,

    onSelectAll: undefined,

    onApprove: undefined,

    onReject: undefined,

    onSpam: undefined,

    onRestore: undefined,

    onDelete: undefined,

};

export default CommentTable;