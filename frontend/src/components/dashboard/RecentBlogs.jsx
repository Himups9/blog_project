// src/components/dashboard/RecentBlogs.jsx

import { Link } from "react-router-dom";
import {
    Calendar,
    Eye,
    PenSquare,
    PlusCircle,
    FileText,
} from "lucide-react";

const StatusBadge = ({ published }) => (
    <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
            published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
        }`}
    >
        {published ? "Published" : "Draft"}
    </span>
);

const RecentBlogs = ({ blogs = [] }) => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Recent Blogs
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Manage your latest blog posts.
                    </p>

                </div>

                <Link
                    to="/blog/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                >
                    <PlusCircle size={18} />
                    New Blog
                </Link>

            </div>

            {/* Empty State */}

            {blogs.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">

                    <FileText
                        size={60}
                        className="mx-auto mb-5 text-slate-300"
                    />

                    <h3 className="text-xl font-semibold text-slate-800">
                        No blogs yet
                    </h3>

                    <p className="mt-3 text-slate-500">
                        Start sharing your ideas by creating your first blog.
                    </p>

                    <Link
                        to="/blog/create"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-6 py-3 font-semibold text-white"
                    >
                        <PlusCircle size={18} />
                        Create Blog
                    </Link>

                </div>
            )}

            {/* Blog List */}

            {blogs.length > 0 && (
                <div className="space-y-5">

                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="rounded-2xl border border-slate-200 p-6 transition hover:border-teal-500 hover:shadow-md"
                        >

                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex-1">

                                    <div className="mb-3 flex items-center gap-3">

                                        <StatusBadge
                                            published={blog.is_published}
                                        />

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                            {blog.category?.name ||
                                                "Uncategorized"}
                                        </span>

                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {blog.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-2 text-slate-600">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">

                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleDateString()}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Eye size={16} />
                                            {blog.views_count ?? 0} Views
                                        </div>

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <Link
                                        to={`/blogs/${blog.slug}`}
                                        className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/blog/edit/${blog.id}`}
                                        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                                    >
                                        <PenSquare size={18} />
                                        Edit
                                    </Link>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default RecentBlogs;
