// frontend/src/features/dashboard/components/RecentBlogs.jsx

import React from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const RecentBlogs = ({
    blogs = [],
    title = "Recent Blogs",
    description = "Your latest blog posts.",
    viewAllLink = "/dashboard/blogs",
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                {viewAllLink && blogs.length > 0 && (
                    <Link
                        to={viewAllLink}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        View All
                    </Link>
                )}
            </div>

            {/* Empty State */}
            {blogs.length === 0 ? (
                <div className="mt-5 flex min-h-32 items-center justify-center rounded-lg bg-gray-50">
                    <div className="text-center">
                        <FileText className="mx-auto h-6 w-6 text-gray-400" />

                        <p className="mt-2 text-sm text-gray-500">
                            No blog posts found.
                        </p>

                        <Link
                            to="/dashboard/blogs/create"
                            className="mt-3 inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Create your first blog
                        </Link>
                    </div>
                </div>
            ) : (
                /* Blog List */
                <div className="mt-5 divide-y divide-gray-200">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0">
                                <h3 className="truncate font-medium text-gray-900">
                                    {blog.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {blog.createdAt
                                        ? new Date(
                                              blog.createdAt
                                          ).toLocaleDateString()
                                        : "No date available"}
                                </p>
                            </div>

                            <span
                                className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                    blog.status === "PUBLISHED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {blog.status?.toLowerCase() || "draft"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentBlogs;
