import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    Star,
    CheckCircle,
} from "lucide-react";

import blogService from "../../services/blogService";
import categoryService from "../../../category/services/categoryService";
import { getImageUrl } from "../../../utils/imageUrl";

const BlogManagement = () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);

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
        loadData();
    }, [page, search, status, category]);

    const loadData = async () => {
        try {
            setLoading(true);

            const [blogResponse, categoryResponse] =
                await Promise.all([
                    blogService.getAdminBlogs({
                        page,
                        limit: 10,
                        search,
                        status: status
                            ? status.toUpperCase()
                            : "",
                        categoryId: category,
                    }),
                    categoryService.getCategories(),
                ]);

            const blogData = blogResponse.data.data || [];
            const blogPagination =
                blogResponse.data.pagination || {};

            setBlogs(blogData);

            setPagination({
                count: blogPagination.total || 0,
                next:
                    page < (blogPagination.totalPages || 1)
                        ? page + 1
                        : null,
                previous: page > 1 ? page - 1 : null,
            });

            setCategories(
                categoryResponse.data?.data?.categories || []
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to load blogs.");
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Publish
    |--------------------------------------------------------------------------
    */

    const handlePublish = async (id) => {
        try {
            await blogService.publishBlog(id);

            toast.success("Blog published.");

            loadData();
        } catch (error) {
            toast.error("Unable to publish blog.");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Feature Blog
    |--------------------------------------------------------------------------
    */

    const handleFeature = async (id) => {
        try {
            await blogService.featureBlog(id);

            toast.success("Blog updated.");

            loadData();
        } catch (error) {
            toast.error("Unable to update blog.");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this blog?")) return;

        try {
            await blogService.deleteBlog(id);

            toast.success("Blog deleted.");

            loadData();
        } catch (error) {
            toast.error("Delete failed.");
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Blog Management
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage all blogs across the website.
                    </p>

                </div>

                <Link
                    to="/admin/blogs/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={18} />

                    New Blog

                </Link>

            </div>

            {/* Search & Filters */}

            <div className="rounded-2xl border bg-white p-6">

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-xl border py-3 pl-10 pr-4"
                        />

                    </div>

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border px-4 py-3"
                    >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border px-4 py-3"
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

            {/* Blog Table */}

            <div className="overflow-hidden rounded-2xl border bg-white">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Image
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Author
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
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
                                        Loading blogs...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            No blogs found
                                        </h3>

                                        <p className="mt-2 text-gray-500">
                                            There are currently no blogs matching
                                            your search criteria.
                                        </p>
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

                                        {/* Author */}

                                        <td className="px-6 py-4">

                                            <div className="font-medium">
                                                {blog.author
                                                    ? [
                                                          blog.author.firstName,
                                                          blog.author.lastName,
                                                      ]
                                                          .filter(Boolean)
                                                          .join(" ")
                                                    : "-"}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {blog.author?.email}
                                            </div>

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
                                                    blog.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {blog.status?.toLowerCase()}
                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                {/* View */}

                                                <Link
                                                    to={`/blogs/${blog.slug}`}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                    title="View Blog"
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                {/* Edit */}

                                                <Link
                                                    to={`/admin/blogs/edit/${blog.id}`}
                                                    className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                                                    title="Edit Blog"
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                {/* Publish */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handlePublish(blog.id)
                                                    }
                                                    className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                                                    title="Publish Blog"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>

                                                {/* Feature */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleFeature(blog.id)
                                                    }
                                                    className={`rounded-lg p-2 transition
                                                        ${
                                                            blog.featured
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : "text-gray-500 hover:bg-yellow-50"
                                                        }`}
                                                    title="Feature Blog"
                                                >
                                                    <Star
                                                        size={18}
                                                        fill={
                                                            blog.featured
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                </button>

                                                {/* Delete */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(blog.id)
                                                    }
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                                    title="Delete Blog"
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

                <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                        {blogs.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                        {pagination.count}
                    </span>{" "}
                    blogs
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

export default BlogManagement;
