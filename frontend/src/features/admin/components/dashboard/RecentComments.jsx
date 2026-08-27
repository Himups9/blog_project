// frontend/src/features/admin/components/dashboard/RecentComments.jsx

import React from "react";
import PropTypes from "prop-types";
import {
    MessageSquare,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";

const RecentComments = ({ comments = [] }) => {
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
            case "APPROVED":
                return "bg-green-100 text-green-700";

            case "REJECTED":
                return "bg-red-100 text-red-700";

            case "SPAM":
                return "bg-orange-100 text-orange-700";

            case "PENDING":
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case "APPROVED":
                return CheckCircle;

            case "REJECTED":
            case "SPAM":
                return XCircle;

            case "PENDING":
            default:
                return Clock;
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "Unknown date";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Unknown date";
        }

        return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Comments
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Latest comments submitted by users.
                    </p>
                </div>

                <div className="rounded-lg bg-gray-100 p-2">
                    <MessageSquare
                        className="h-5 w-5 text-gray-600"
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Content */}
            {comments.length === 0 ? (
                <div className="flex min-h-40 flex-col items-center justify-center px-5 py-8 text-center">
                    <div className="rounded-full bg-gray-100 p-3">
                        <MessageSquare
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-700">
                        No recent comments
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        New comments will appear here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {comments.map((comment) => {
                        const StatusIcon = getStatusIcon(
                            comment.status
                        );

                        return (
                            <div
                                key={comment.id}
                                className="px-5 py-4 transition hover:bg-gray-50"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                        <MessageSquare
                                            className="h-5 w-5 text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    {/* Comment */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {comment.user
                                                        ?.firstName ||
                                                        comment.userName ||
                                                        "Unknown User"}
                                                    {comment.user
                                                        ?.lastName
                                                        ? ` ${comment.user.lastName}`
                                                        : ""}
                                                </p>

                                                {comment.user
                                                    ?.email && (
                                                    <p className="mt-0.5 truncate text-xs text-gray-500">
                                                        {
                                                            comment
                                                                .user
                                                                .email
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Status */}
                                            <span
                                                className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                                                    comment.status
                                                )}`}
                                            >
                                                <StatusIcon
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />

                                                {comment.status ||
                                                    "PENDING"}
                                            </span>
                                        </div>

                                        {/* Comment Content */}
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                                            {comment.content ||
                                                "No comment content available."}
                                        </p>

                                        {/* Meta */}
                                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                                            <span>
                                                {formatDate(
                                                    comment.createdAt
                                                )}
                                            </span>

                                            {comment.blog?.title && (
                                                <span className="truncate">
                                                    Blog:{" "}
                                                    {
                                                        comment.blog
                                                            .title
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

RecentComments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            content: PropTypes.string,
            status: PropTypes.string,
            createdAt: PropTypes.string,
            userName: PropTypes.string,
            user: PropTypes.shape({
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                email: PropTypes.string,
            }),
            blog: PropTypes.shape({
                title: PropTypes.string,
            }),
        })
    ),
};

RecentComments.defaultProps = {
    comments: [],
};

export default RecentComments;