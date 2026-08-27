import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
} from "lucide-react";

import blogService from "../../services/blogService";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatBlogDate } from "../../utils/formatBlogDate";

const MyBlogs = () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    /*
    |--------------------------------------------------------------------------
    | Load Blogs
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        fetchBlogs();
    }, [page, search, status]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);

            const response = await blogService.getMyBlogs({
                page,
                limit: pageSize,
                search,
                status: status ? status.toUpperCase() : "",
            });

            const data = response.data;
            const pageData = data.pagination || {};

            setBlogs(data.data || data.results || []);

            setPagination({
                count: pageData.total || data.count || 0,
                next: page < (pageData.totalPages || 1) ? page + 1 : null,
                previous: page > 1 ? page - 1 : null,
            });
        } catch (error) {
            console.error(error);

            toast.error("Failed to load blogs.");
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Delete Blog
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        try {
            await blogService.deleteBlog(id);

            toast.success("Blog deleted successfully.");

            fetchBlogs();
        } catch (error) {
            console.error(error);

            toast.error("Failed to delete blog.");
        }
    };

    return (
        <div className="space-y-6">

            {/* =====================================================
                Header
            ====================================================== */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Blogs
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage all of your blog posts.
                    </p>
                </div>

                <Link
                    to="/dashboard/blogs/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Create Blog
                </Link>

            </div>

            {/* =====================================================
                Search & Filter
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="draft">
                            Draft
                        </option>

                        <option value="published">
                            Published
                        </option>
                    </select>

                </div>

            </div>

            {/* =====================================================
                Blog Table
            ====================================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Image
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Created
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {/* Continue in Message 2 */}
                                                        {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center text-gray-500"
                                    >
                                        Loading blogs...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="space-y-4">

                                            <h3 className="text-lg font-semibold text-gray-700">
                                                No blogs found
                                            </h3>

                                            <p className="text-gray-500">
                                                Create your first blog to get
                                                started.
                                            </p>

                                            <Link
                                                to="/dashboard/blogs/create"
                                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                                            >
                                                <Plus size={18} />

                                                Create Blog
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr
                                        key={blog.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        {/* Featured Image */}

                                        <td className="px-6 py-4">
                                            <img
                                                src={
                                                    getImageUrl(blog.featuredImage) ||
                                                    "/images/no-image.png"
                                                }
                                                alt={blog.title}
                                                className="h-16 w-20 rounded-lg object-cover"
                                            />
                                        </td>

                                        {/* Title */}

                                        <td className="px-6 py-4">

                                            <h3 className="font-semibold text-gray-900">
                                                {blog.title}
                                            </h3>

                                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                {blog.excerpt}
                                            </p>

                                        </td>

                                        {/* Category */}

                                        <td className="px-6 py-4">
                                            {blog.category?.name || "-"}
                                        </td>

                                        {/* Status */}

                                        <td className="px-6 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold
                                                ${
                                                    blog.status?.toLowerCase() === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {blog.status?.toLowerCase()}
                                            </span>

                                        </td>

                                        {/* Created */}

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatBlogDate(blog.createdAt)}
                                        </td>

                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                <Link
                                                    to={`/blogs/${blog.slug}`}
                                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                                    title="View"
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                <Link
                                                    to={`/dashboard/blogs/edit/${blog.id}`}
                                                    className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(blog.id)
                                                    }
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* =====================================================
                Pagination
            ====================================================== */}

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row">

                <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                        {blogs.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                        {pagination.count}
                    </span>{" "}
                    blog(s)
                </p>

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        disabled={!pagination.previous}
                        onClick={() => setPage((prev) => prev - 1)}
                        className={`rounded-xl px-5 py-2 font-medium transition
                            ${
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
                        className={`rounded-xl px-5 py-2 font-medium transition
                            ${
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

export default MyBlogs;
