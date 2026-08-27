import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Edit,
    Eye,
    EyeOff,
    Plus,
    Search,
    Star,
    Trash2,
} from "lucide-react";

import tagService from "../../services/tagService";

const TagManagement = () => {

    /*
    |--------------------------------------------------------------------------
    | States
    |--------------------------------------------------------------------------
    */

    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    /*
    |--------------------------------------------------------------------------
    | Load Tags
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadTags();
    }, [page, search]);

    const loadTags = async () => {

        try {

            setLoading(true);

            const response =
                await tagService.getAdminTags({
                    page,
                    search,
                });

            const data = response.data.data || {};
            const pageData = data.pagination || {};

            setTags(data.items || []);

            setPagination({
                count: pageData.total || 0,
                next:
                    page < (pageData.totalPages || 1)
                        ? page + 1
                        : null,
                previous: page > 1 ? page - 1 : null,
            });

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to load tags."
            );

        } finally {

            setLoading(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this tag?"
            )
        ) {
            return;
        }

        try {

            await tagService.deleteTag(id);

            toast.success(
                "Tag deleted successfully."
            );

            loadTags();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete tag."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Activate / Deactivate
    |--------------------------------------------------------------------------
    */

    const toggleStatus = async (
        id,
        isActive
    ) => {

        try {

            if (isActive) {

                await tagService.deactivateTag(id);

            } else {

                await tagService.activateTag(id);

            }

            toast.success(
                "Tag updated successfully."
            );

            loadTags();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to update tag."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Feature / Unfeature
    |--------------------------------------------------------------------------
    */

    const toggleFeatured = async (
        id,
        isFeatured
    ) => {

        try {

            if (isFeatured) {

                await tagService.unfeatureTag(id);

            } else {

                await tagService.featureTag(id);

            }

            toast.success(
                "Tag updated successfully."
            );

            loadTags();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to update featured status."
            );

        }

    };

    return (

        <div className="space-y-6">

            {/* ==========================================
                Header
            =========================================== */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Tag Management
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create and manage blog tags.
                    </p>

                </div>

                <Link
                    to="/admin/tags/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >

                    <Plus size={18} />

                    Create Tag

                </Link>

            </div>

            {/* ==========================================
                Search
            =========================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search tag..."
                        className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

            </div>

            {/* Continue in Message 2 */}
                        {/* ==========================================
                Tags Table
            =========================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                {loading ? (

                    <div className="flex items-center justify-center py-20">

                        <p className="text-lg text-gray-500">
                            Loading tags...
                        </p>

                    </div>

                ) : tags.length === 0 ? (

                    <div className="flex items-center justify-center py-20">

                        <p className="text-lg text-gray-500">
                            No tags found.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-gray-100">

                                <tr className="text-left text-sm font-semibold uppercase tracking-wide text-gray-600">

                                    <th className="px-6 py-4">
                                        Tag
                                    </th>

                                    <th className="px-6 py-4">
                                        Color
                                    </th>

                                    <th className="px-6 py-4">
                                        Blogs
                                    </th>

                                    <th className="px-6 py-4">
                                        Status
                                    </th>

                                    <th className="px-6 py-4">
                                        Featured
                                    </th>

                                    <th className="px-6 py-4">
                                        Created
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {tags.map((tag) => (

                                    <tr
                                        key={tag.id}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >

                                        {/* Tag */}

                                        <td className="px-6 py-4">

                                            <div>

                                                <h3 className="font-semibold text-gray-900">
                                                    {tag.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    /{tag.slug}
                                                </p>

                                            </div>

                                        </td>

                                        {/* Color */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <span
                                                    className="h-6 w-6 rounded-full border"
                                                    style={{
                                                        backgroundColor: tag.color,
                                                    }}
                                                />

                                                <span className="text-sm text-gray-600">
                                                    {tag.color}
                                                </span>

                                            </div>

                                        </td>

                                        {/* Blog Count */}

                                        <td className="px-6 py-4">

                                            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

                                                {tag.blog_count ?? 0}

                                            </span>

                                        </td>

                                        {/* Status */}

                                        <td className="px-6 py-4">

                                            {tag.is_active ? (

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                                    Active

                                                </span>

                                            ) : (

                                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">

                                                    Inactive

                                                </span>

                                            )}

                                        </td>

                                        {/* Featured */}

                                        <td className="px-6 py-4">

                                            {tag.is_featured ? (

                                                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">

                                                    <Star size={14} />

                                                    Featured

                                                </span>

                                            ) : (

                                                <span className="text-gray-400">
                                                    —
                                                </span>

                                            )}

                                        </td>

                                        {/* Created */}

                                        <td className="px-6 py-4 text-sm text-gray-500">

                                            {tag.created_at
                                                ? new Date(
                                                      tag.created_at
                                                  ).toLocaleDateString()
                                                : "-"}

                                        </td>

                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Link
                                                    to={`/admin/tags/edit/${tag.id}`}
                                                    className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                                                    title="Edit Tag"
                                                >
                                                    <Edit size={18} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleStatus(
                                                            tag.id,
                                                            tag.is_active
                                                        )
                                                    }
                                                    className={`rounded-lg p-2 text-white transition ${
                                                        tag.is_active
                                                            ? "bg-yellow-500 hover:bg-yellow-600"
                                                            : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                                    title={
                                                        tag.is_active
                                                            ? "Deactivate"
                                                            : "Activate"
                                                    }
                                                >
                                                    {tag.is_active ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleFeatured(
                                                            tag.id,
                                                            tag.is_featured
                                                        )
                                                    }
                                                    className={`rounded-lg p-2 text-white transition ${
                                                        tag.is_featured
                                                            ? "bg-gray-700 hover:bg-gray-800"
                                                            : "bg-yellow-500 hover:bg-yellow-600"
                                                    }`}
                                                    title={
                                                        tag.is_featured
                                                            ? "Remove Featured"
                                                            : "Mark Featured"
                                                    }
                                                >
                                                    <Star size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(tag.id)
                                                    }
                                                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                                                    title="Delete Tag"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* Continue in Message 3 */}
                        {/* ==========================================
                Pagination
            =========================================== */}

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row">

                <div className="text-sm text-gray-600">

                    Showing

                    <span className="mx-1 font-semibold">
                        {tags.length}
                    </span>

                    of

                    <span className="mx-1 font-semibold">
                        {pagination.count}
                    </span>

                    tags

                </div>

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        disabled={!pagination.previous}
                        onClick={() => setPage((prev) => prev - 1)}
                        className={`rounded-xl px-5 py-2 font-medium transition ${
                            pagination.previous
                                ? "bg-gray-200 hover:bg-gray-300"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="rounded-xl border border-gray-300 px-5 py-2 font-semibold">

                        Page {page}

                    </span>

                    <button
                        type="button"
                        disabled={!pagination.next}
                        onClick={() => setPage((prev) => prev + 1)}
                        className={`rounded-xl px-5 py-2 font-medium transition ${
                            pagination.next
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

};

export default TagManagement;
