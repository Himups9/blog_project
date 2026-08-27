import { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    FolderOpen,
    RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useCategories from "../../hooks/useCategories";

const CategoryManagement = () => {
    const navigate = useNavigate();

    const {
        categories = [],
        loading,
        pagination = {},
        setSearch,
        setPage,
        deleteCategory,
        error,
    } = useCategories();

    const [search, setSearchValue] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = (value) => {
        setSearchValue(value);
        setSearch(value);
    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {
        if (!id) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        try {
            const deleted = await deleteCategory(id);

            if (deleted) {
                toast.success(
                    "Category deleted successfully."
                );
            }
        } catch (error) {
            console.error(
                "DELETE CATEGORY ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                    "Failed to delete category."
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Image URL
    |--------------------------------------------------------------------------
    */

    const getImageUrl = (image) => {
        if (!image) {
            return null;
        }

        // Already an absolute URL
        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("blob:")
        ) {
            return image;
        }

        /*
         * If backend returns:
         * /uploads/categories/example.jpg
         *
         * keep it as-is.
         */
        if (image.startsWith("/")) {
            return image;
        }

        /*
         * If backend returns:
         * uploads/categories/example.jpg
         *
         * add the leading slash.
         */
        return `/${image}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const currentPage =
        pagination.page || 1;

    const totalPages =
        pagination.totalPages || 1;

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Categories
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage categories used to organize
                            your blog posts.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/categories/create"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus size={18} />

                        Create Category
                    </button>
                </div>

                {/* =====================================================
                    STATISTICS
                ====================================================== */}

                <div className="grid gap-4 sm:grid-cols-3">

                    <StatCard
                        title="Total Categories"
                        value={
                            pagination.total || 0
                        }
                    />

                    <StatCard
                        title="Current Page"
                        value={currentPage}
                    />

                    <StatCard
                        title="Total Pages"
                        value={totalPages}
                    />

                </div>

                {/* =====================================================
                    SEARCH
                ====================================================== */}

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="relative w-full sm:max-w-md">

                            <Search
                                size={18}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    handleSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search categories..."
                                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>
                </div>

                {/* =====================================================
                    ERROR
                ====================================================== */}

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error?.response?.data?.message ||
                            error?.message ||
                            "Failed to load categories."}
                    </div>
                )}

                {/* =====================================================
                    TABLE
                ====================================================== */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {loading ? (
                        <Loading />
                    ) : categories.length === 0 ? (
                        <EmptyState
                            onCreate={() =>
                                navigate(
                                    "/admin/categories/create"
                                )
                            }
                        />
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-190">

                                <thead className="border-b border-gray-200 bg-gray-50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Slug
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Created
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {categories.map(
                                        (category) => {

                                            const imageUrl =
                                                getImageUrl(
                                                    category.image
                                                );

                                            const initial =
                                                category.name
                                                    ?.charAt(
                                                        0
                                                    )
                                                    ?.toUpperCase() ||
                                                "C";

                                            return (
                                                <tr
                                                    key={
                                                        category.id
                                                    }
                                                    className="transition hover:bg-gray-50"
                                                >

                                                    {/* CATEGORY */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-3">

                                                            {imageUrl ? (
                                                                <img src={imageUrl}
                                                                    alt={category.name}
                                                                    className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-gray-200"
                                                                    onError={(
                                                                        event
                                                                    ) => {
                                                                        event.currentTarget.style.display =
                                                                            "none";

                                                                        event.currentTarget.nextElementSibling?.classList.remove(
                                                                            "hidden"
                                                                        );
                                                                    }}
                                                                />
                                                            ) : null}

                                                            {/* Avatar fallback */}

                                                            <div
                                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 ${
                                                                    imageUrl
                                                                        ? "hidden"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {
                                                                    initial
                                                                }
                                                            </div>

                                                            <div className="min-w-0">

                                                                <p className="truncate font-semibold text-gray-900">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </p>

                                                                {category.description ? (
                                                                    <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                                                                        {
                                                                            category.description
                                                                        }
                                                                    </p>
                                                                ) : (
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        No description
                                                                    </p>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* SLUG */}

                                                    <td className="px-6 py-4">

                                                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-600">
                                                            /{
                                                                category.slug
                                                            }
                                                        </span>

                                                    </td>

                                                    {/* CREATED */}

                                                    <td className="px-6 py-4 text-sm text-gray-500">

                                                        {category.createdAt
                                                            ? new Date(
                                                                  category.createdAt
                                                              ).toLocaleDateString(
                                                                  undefined,
                                                                  {
                                                                      year: "numeric",
                                                                      month: "short",
                                                                      day: "numeric",
                                                                  }
                                                              )
                                                            : "—"}

                                                    </td>

                                                    {/* ACTIONS */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex justify-end gap-1">

                                                            {/* VIEW */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/categories/view/${category.id}`
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                                title="View category"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>

                                                            {/* EDIT */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/categories/edit/${category.id}`
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                                title="Edit category"
                                                            >
                                                                <Pencil
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>

                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category.id
                                                                    )
                                                                }
                                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                                title="Delete category"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

                {/* =====================================================
                    PAGINATION
                ====================================================== */}

                {totalPages > 1 && (
                    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={() =>
                                setPage(
                                    currentPage - 1
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="text-center text-sm text-gray-600">
                            Page{" "}
                            <strong>
                                {currentPage}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {totalPages}
                            </strong>
                        </span>

                        <button
                            type="button"
                            disabled={
                                currentPage >=
                                totalPages
                            }
                            onClick={() =>
                                setPage(
                                    currentPage + 1
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

const StatCard = ({
    title,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
                {value}
            </p>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

const Loading = () => {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
                Loading categories...
            </p>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Empty State
|--------------------------------------------------------------------------
*/

const EmptyState = ({
    onCreate,
}) => {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FolderOpen size={28} />
            </div>

            <h3 className="mt-5 text-base font-semibold text-gray-900">
                No categories found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
                Create your first category to start
                organizing your blog posts.
            </p>

            <button
                type="button"
                onClick={onCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                <Plus size={17} />
                Create Category
            </button>

        </div>
    );
};

export default CategoryManagement;
