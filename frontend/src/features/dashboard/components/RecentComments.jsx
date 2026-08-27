// frontend/src/features/dashboard/components/RecentComments.jsx

import React from "react";
import { MessageSquare } from "lucide-react";

const RecentComments = ({ comments = [] }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Comments
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Latest comments from users.
                </p>
            </div>

            {comments.length === 0 ? (
                <div className="mt-5 flex min-h-32 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                        <MessageSquare className="mx-auto h-6 w-6 text-gray-400" />

                        <p className="mt-2 text-sm text-gray-500">
                            No recent comments.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-5 divide-y divide-gray-200">
                    {comments.map((comment) => {
                        const userName =
                            `${comment.user?.firstName || ""} ${
                                comment.user?.lastName || ""
                            }`.trim() || "Unknown User";

                        return (
                            <div
                                key={comment.id}
                                className="py-4"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-medium text-gray-900">
                                        {userName}
                                    </p>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            comment.status === "APPROVED"
                                                ? "bg-green-100 text-green-700"
                                                : comment.status === "REJECTED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {comment.status?.toLowerCase() ||
                                            "pending"}
                                    </span>
                                </div>

                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                    {comment.content}
                                </p>

                                {comment.blog?.title && (
                                    <p className="mt-2 text-xs text-gray-400">
                                        Blog: {comment.blog.title}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentComments;