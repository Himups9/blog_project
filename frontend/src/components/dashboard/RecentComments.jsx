// src/components/dashboard/RecentComments.jsx

import { Link } from "react-router-dom";
import {
    MessageCircle,
    Calendar,
    User,
    ArrowRight,
} from "lucide-react";

const RecentComments = ({ comments = [] }) => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Recent Comments
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Latest comments on your blog posts.
                    </p>
                </div>

                <Link
                    to="/comments"
                    className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                    View All
                    <ArrowRight size={18} />
                </Link>

            </div>

            {/* Empty State */}

            {comments.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 py-14 text-center">

                    <MessageCircle
                        size={60}
                        className="mx-auto mb-5 text-slate-300"
                    />

                    <h3 className="text-xl font-semibold text-slate-800">
                        No comments yet
                    </h3>

                    <p className="mt-3 text-slate-500">
                        Comments from readers will appear here.
                    </p>

                </div>
            )}

            {/* Comments */}

            {comments.length > 0 && (

                <div className="space-y-5">

                    {comments.map((comment) => (

                        <div
                            key={comment.id}
                            className="rounded-2xl border border-slate-200 p-6 transition hover:border-teal-500 hover:shadow-md"
                        >

                            <div className="flex items-start justify-between gap-6">

                                <div className="flex flex-1 gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-teal-500 to-emerald-600 text-white">

                                        <User size={22} />

                                    </div>

                                    <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h3 className="font-semibold text-slate-900">
                                                {comment.author?.full_name ||
                                                    "Anonymous User"}
                                            </h3>

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                                {comment.blog?.title ||
                                                    "Unknown Blog"}
                                            </span>

                                        </div>

                                        <p className="mt-3 text-slate-600">
                                            {comment.content}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                                            <Calendar size={16} />

                                            {new Date(
                                                comment.created_at
                                            ).toLocaleDateString()}

                                        </div>

                                    </div>

                                </div>

                                <Link
                                    to={`/blog/${comment.blog?.slug}`}
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
                                >
                                    View Post
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecentComments;