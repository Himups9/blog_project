import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Search,
    Eye,
    CheckCircle,
    XCircle,
    RotateCcw,
} from "lucide-react";

import blogService from "../../services/blogService";
import categoryService from "../../../category/services/categoryService";

const PendingBlogs = () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    /*
    |--------------------------------------------------------------------------
    | Load Pending Blogs
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadPendingBlogs();
    }, [page, search, category]);

    const loadPendingBlogs = async () => {
        try {
            setLoading(true);

            const [blogResponse, categoryResponse] =
                await Promise.all([
                    blogService.getPendingBlogs({
                        page,
                        search,
                        category,
                    }),
                    categoryService.getCategories(),
                ]);

            setBlogs(blogResponse.data.results || []);

            setPagination({
                count: blogResponse.data.count,
                next: blogResponse.data.next,
                previous: blogResponse.data.previous,
            });

            setCategories(categoryResponse.data || []);
        } catch (error) {
            console.error(error);

            toast.error("Failed to load pending blogs.");
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Approve Blog
    |--------------------------------------------------------------------------
    */

    const handleApprove = async (id) => {
        try {
            await blogService.approveBlog(id);

            toast.success("Blog approved successfully.");

            loadPendingBlogs();
        } catch (error) {
            console.error(error);

            toast.error("Unable to approve blog.");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Reject Blog
    |--------------------------------------------------------------------------
    */

    const handleReject = async (id) => {
        try {
            await blogService.rejectBlog(id);

            toast.success("Blog rejected.");

            loadPendingBlogs();
        } catch (error) {
            console.error(error);

            toast.error("Unable to reject blog.");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Return to Draft
    |--------------------------------------------------------------------------
    */

    const handleReturnToDraft = async (id) => {
        try {
            await blogService.returnToDraft(id);

            toast.success("Blog returned to draft.");

            loadPendingBlogs();
        } catch (error) {
            console.error(error);

            toast.error("Unable to return blog to draft.");
        }
    };

    return (
        <div className="space-y-6">

            {/* =====================================================
                Header
            ====================================================== */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Pending Blogs
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Review blogs submitted by authors before publishing.
                    </p>

                </div>

            </div>

            {/* =====================================================
                Search & Filters
            ====================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search pending blogs..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map((cat) => (
                            <option
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))}

                    </select>

                </div>

            </div>

            {/* =====================================================
                Pending Blogs Table
            ====================================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Image
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Blog
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Author
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Submitted
                                </th>

                                <th className="px-6 py-4 text-center">
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
                                        Loading pending blogs...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="space-y-3">

                                            <h3 className="text-lg font-semibold text-gray-700">
                                                No Pending Blogs
                                            </h3>

                                            <p className="text-gray-500">
                                                There are currently no blogs
                                                waiting for review.
                                            </p>

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
                                                    blog.featured_image ||
                                                    "/images/no-image.png"
                                                }
                                                alt={blog.title}
                                                className="h-16 w-20 rounded-lg object-cover"
                                            />

                                        </td>

                                        {/* Blog */}

                                        <td className="px-6 py-4">

                                            <h3 className="font-semibold text-gray-900">
                                                {blog.title}
                                            </h3>

                                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                {blog.excerpt}
                                            </p>

                                        </td>

                                        {/* Author */}

                                        <td className="px-6 py-4">

                                            <div className="font-medium text-gray-900">
                                                {blog.author?.full_name}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {blog.author?.email}
                                            </div>

                                        </td>

                                        {/* Category */}

                                        <td className="px-6 py-4">
                                            {blog.category?.name || "-"}
                                        </td>

                                        {/* Submitted Date */}

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                {/* Preview */}

                                                <Link
                                                    to={`/blogs/${blog.slug}`}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                    title="Preview Blog"
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                {/* Approve */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleApprove(blog.id)
                                                    }
                                                    className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                                                    title="Approve Blog"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>

                                                {/* Reject */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReject(blog.id)
                                                    }
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                                    title="Reject Blog"
                                                >
                                                    <XCircle size={18} />
                                                </button>

                                                {/* Return to Draft */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReturnToDraft(
                                                            blog.id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-yellow-600 transition hover:bg-yellow-50"
                                                    title="Return to Draft"
                                                >
                                                    <RotateCcw size={18} />
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

                <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                        {blogs.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                        {pagination.count}
                    </span>{" "}
                    pending blog(s)
                </div>

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

export default PendingBlogs;