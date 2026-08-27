// frontend/src/features/dashboard/components/RecentUsers.jsx

import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const RecentUsers = ({
    users = [],
    title = "Recent Users",
    description = "Recently registered users.",
    viewAllLink = "/admin/users",
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                {users.length > 0 && (
                    <Link
                        to={viewAllLink}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        View All
                    </Link>
                )}
            </div>

            {users.length === 0 ? (
                <div className="mt-5 flex min-h-32 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                        <User className="mx-auto h-6 w-6 text-gray-400" />

                        <p className="mt-2 text-sm text-gray-500">
                            No users found.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-5 divide-y divide-gray-200">
                    {users.map((user) => {
                        const fullName =
                            `${user.firstName || ""} ${
                                user.lastName || ""
                            }`.trim() || "Unknown User";

                        return (
                            <div
                                key={user.id}
                                className="flex items-center justify-between gap-4 py-4"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                        <User className="h-5 w-5 text-gray-500" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-gray-900">
                                            {fullName}
                                        </p>

                                        <p className="truncate text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <p className="shrink-0 text-xs text-gray-400">
                                    {user.createdAt
                                        ? new Date(
                                              user.createdAt
                                          ).toLocaleDateString()
                                        : ""}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentUsers;