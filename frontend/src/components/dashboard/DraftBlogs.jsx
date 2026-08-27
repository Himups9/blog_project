// src/components/dashboard/DraftBlogs.jsx

import { Link } from "react-router-dom";
import {
    FileEdit,
    Calendar,
    Clock,
    PenSquare,
    PlusCircle,
    ArrowRight,
} from "lucide-react";

const DraftBlogs = ({ drafts = [] }) => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Draft Blogs
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Continue writing and publish your drafts.
                    </p>
                </div>

                <Link
                    to="/my-blogs?status=draft"
                    className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                    View All
                    <ArrowRight size={18} />
                </Link>

            </div>

            {/* Empty State */}

            {drafts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">

                    <FileEdit
                        size={60}
                        className="mx-auto mb-5 text-slate-300"
                    />

                    <h3 className="text-xl font-semibold text-slate-800">
                        No Drafts Available
                    </h3>

                    <p className="mt-3 text-slate-500">
                        Start writing your next article today.
                    </p>

                    <Link
                        to="/blog/create"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg"
                    >
                        <PlusCircle size={18} />
                        Create Blog
                    </Link>

                </div>
            )}

            {/* Draft List */}

            {drafts.length > 0 && (

                <div className="space-y-5">

                    {drafts.map((draft) => (

                        <div
                            key={draft.id}
                            className="rounded-2xl border border-slate-200 p-6 transition hover:border-amber-500 hover:shadow-md"
                        >

                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex-1">

                                    <div className="mb-3 flex items-center gap-3">

                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                            Draft
                                        </span>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                            {draft.category?.name || "Uncategorized"}
                                        </span>

                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {draft.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-2 text-slate-600">
                                        {draft.excerpt || "No description available."}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">

                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            Created{" "}
                                            {new Date(
                                                draft.created_at
                                            ).toLocaleDateString()}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            Updated{" "}
                                            {new Date(
                                                draft.updated_at
                                            ).toLocaleDateString()}
                                        </div>

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <Link
                                        to={`/blog/edit/${draft.id}`}
                                        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                                    >
                                        <PenSquare size={18} />
                                        Continue Writing
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

export default DraftBlogs;