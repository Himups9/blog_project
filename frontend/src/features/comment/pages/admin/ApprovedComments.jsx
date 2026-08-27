import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Eye,
    RefreshCw,
    Search,
    ShieldAlert,
    Trash2,
} from "lucide-react";

import commentService from "../../services/commentService";


const ApprovedComments = () => {

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });


    /*
    |--------------------------------------------------------------------------
    | Load Approved Comments
    |--------------------------------------------------------------------------
    */

    const loadApprovedComments = useCallback(
        async () => {

            try {

                setLoading(true);

                const response =
                    await commentService.getAdminComments({
                        page,
                        limit: 10,
                        search: search.trim(),
                        status: "APPROVED",
                    });


                const responseData =
                    response.data?.data;


                setComments(
                    Array.isArray(responseData)
                        ? responseData
                        : []
                );


                setPagination(
                    response.data?.pagination || {
                        page,
                        limit: 10,
                        total: 0,
                        totalPages: 0,
                        hasNextPage: false,
                        hasPreviousPage: false,
                    }
                );

            } catch (error) {

                console.error(
                    "Failed to load approved comments:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load approved comments."
                );

            } finally {

                setLoading(false);

            }

        },
        [page, search]
    );


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadApprovedComments();

    }, [loadApprovedComments]);


    /*
    |--------------------------------------------------------------------------
    | Mark As Spam
    |--------------------------------------------------------------------------
    */

    const markSpam = async (id) => {

        try {

            await commentService.markSpam(id);

            toast.success(
                "Comment marked as spam."
            );

            await loadApprovedComments();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to mark comment as spam."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const deleteComment = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this comment?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await commentService.deleteComment(id);

            toast.success(
                "Comment deleted."
            );

            await loadApprovedComments();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to delete comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = (event) => {

        setSearch(
            event.target.value
        );

        setPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Approved Comments
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and manage approved comments.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={loadApprovedComments}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <RefreshCw
                        size={18}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh

                </button>

            </div>


            {/* Search */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search approved comments..."
                        className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

            </div>


            {/* Table */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                {loading ? (

                    <div className="flex justify-center py-20">

                        <p className="text-gray-500">
                            Loading approved comments...
                        </p>

                    </div>

                ) : comments.length === 0 ? (

                    <div className="flex justify-center py-20">

                        <p className="text-gray-500">
                            No approved comments found.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-gray-100">

                                <tr className="text-left text-sm font-semibold uppercase tracking-wide text-gray-600">

                                    <th className="px-6 py-4">
                                        Author
                                    </th>

                                    <th className="px-6 py-4">
                                        Blog
                                    </th>

                                    <th className="px-6 py-4">
                                        Comment
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

                                {comments.map(
                                    (comment) => (

                                        <tr
                                            key={comment.id}
                                            className="border-t border-gray-200 hover:bg-gray-50"
                                        >

                                            {/* Author */}

                                            <td className="px-6 py-4">

                                                <p className="font-semibold text-gray-900">

                                                    {comment.user
                                                        ? `${comment.user.firstName || ""} ${comment.user.lastName || ""}`.trim()
                                                        : "Unknown User"}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {comment.user?.email || "-"}

                                                </p>

                                            </td>


                                            {/* Blog */}

                                            <td className="px-6 py-4">

                                                <p className="max-w-xs truncate font-medium text-gray-800">

                                                    {comment.blog?.title ||
                                                        "Unknown Blog"}

                                                </p>

                                            </td>


                                            {/* Comment */}

                                            <td className="px-6 py-4">

                                                <p className="line-clamp-3 max-w-md text-sm text-gray-700">

                                                    {comment.content}

                                                </p>

                                            </td>


                                            {/* Created */}

                                            <td className="px-6 py-4 text-sm text-gray-500">

                                                {comment.createdAt
                                                    ? new Date(
                                                        comment.createdAt
                                                    ).toLocaleDateString()
                                                    : "-"}

                                            </td>


                                            {/* Actions */}

                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <Link
                                                        to={`/admin/comments/${comment.id}`}
                                                        title="View Comment"
                                                        className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                                                    >

                                                        <Eye size={18} />

                                                    </Link>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            markSpam(
                                                                comment.id
                                                            )
                                                        }
                                                        title="Mark as Spam"
                                                        className="rounded-lg bg-orange-600 p-2 text-white transition hover:bg-orange-700"
                                                    >

                                                        <ShieldAlert
                                                            size={18}
                                                        />

                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                        title="Delete Comment"
                                                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                                                    >

                                                        <Trash2
                                                            size={18}
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* Pagination */}

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row">

                <p className="text-sm text-gray-600">

                    Showing{" "}

                    <span className="font-semibold">
                        {comments.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold">
                        {pagination.total}
                    </span>

                    {" "}approved comments

                </p>


                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        disabled={
                            !pagination.hasPreviousPage ||
                            loading
                        }
                        onClick={() =>
                            setPage(
                                (current) =>
                                    current - 1
                            )
                        }
                        className="rounded-xl border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                        Previous

                    </button>


                    <span className="rounded-xl border border-gray-300 px-5 py-2 font-semibold">

                        Page {pagination.page}

                    </span>


                    <button
                        type="button"
                        disabled={
                            !pagination.hasNextPage ||
                            loading
                        }
                        onClick={() =>
                            setPage(
                                (current) =>
                                    current + 1
                            )
                        }
                        className="rounded-xl border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                        Next

                    </button>

                </div>

            </div>

        </div>

    );

};


export default ApprovedComments;