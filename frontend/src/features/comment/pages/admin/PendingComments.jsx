import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    CheckCircle,
    Eye,
    Search,
    ShieldAlert,
    Trash2,
    XCircle,
} from "lucide-react";

import commentService from "../../services/commentService";


const PendingComments = () => {

    /*
    |--------------------------------------------------------------------------
    | States
    |--------------------------------------------------------------------------
    */

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
    | Load Pending Comments
    |--------------------------------------------------------------------------
    */

    const loadPendingComments = useCallback(
        async () => {

            try {

                setLoading(true);

                const response =
                    await commentService.getAdminComments({

                        page,

                        limit: 10,

                        search: search.trim(),

                        status: "PENDING",

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
                    "Failed to load pending comments:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load pending comments."
                );

            } finally {

                setLoading(false);

            }

        },
        [page, search]
    );


    /*
    |--------------------------------------------------------------------------
    | Load Comments
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadPendingComments();

    }, [loadPendingComments]);


    /*
    |--------------------------------------------------------------------------
    | Approve Comment
    |--------------------------------------------------------------------------
    */

    const approveComment = async (id) => {

        try {

            await commentService.approveComment(id);

            toast.success(
                "Comment approved successfully."
            );

            await loadPendingComments();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to approve comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Reject Comment
    |--------------------------------------------------------------------------
    */

    const rejectComment = async (id) => {

        try {

            await commentService.rejectComment(id);

            toast.success(
                "Comment rejected."
            );

            await loadPendingComments();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to reject comment."
            );

        }

    };


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

            await loadPendingComments();

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
    | Delete Comment
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

            await loadPendingComments();

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

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Pending Comments
                </h1>

                <p className="mt-2 text-gray-500">
                    Review comments waiting for moderation.
                </p>

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
                        placeholder="Search pending comments..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

            </div>


            {/* Pending Comments */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                {loading ? (

                    <div className="flex items-center justify-center py-20">

                        <p className="text-lg text-gray-500">
                            Loading pending comments...
                        </p>

                    </div>

                ) : comments.length === 0 ? (

                    <div className="flex items-center justify-center py-20">

                        <p className="text-lg text-gray-500">
                            No pending comments found.
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

                                                <div>

                                                    <h3 className="font-semibold text-gray-900">

                                                        {comment.user
                                                            ? `${comment.user.firstName || ""} ${comment.user.lastName || ""}`.trim()
                                                            : "Unknown User"}

                                                    </h3>

                                                    <p className="text-sm text-gray-500">

                                                        {comment.user?.email ||
                                                            "-"}

                                                    </p>

                                                </div>

                                            </td>


                                            {/* Blog */}

                                            <td className="px-6 py-4">

                                                <div className="max-w-xs">

                                                    <p className="font-medium text-gray-800">

                                                        {comment.blog?.title ||
                                                            "Unknown Blog"}

                                                    </p>

                                                </div>

                                            </td>


                                            {/* Comment */}

                                            <td className="px-6 py-4">

                                                <div className="max-w-md">

                                                    <p className="line-clamp-3 text-sm text-gray-700">

                                                        {comment.content}

                                                    </p>

                                                </div>

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

                                                    {/* View */}

                                                    <Link
                                                        to={`/admin/comments/${comment.id}`}
                                                        className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                                                        title="View Comment"
                                                    >

                                                        <Eye size={18} />

                                                    </Link>


                                                    {/* Approve */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            approveComment(
                                                                comment.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                                                        title="Approve Comment"
                                                    >

                                                        <CheckCircle
                                                            size={18}
                                                        />

                                                    </button>


                                                    {/* Reject */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            rejectComment(
                                                                comment.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                                                        title="Reject Comment"
                                                    >

                                                        <XCircle
                                                            size={18}
                                                        />

                                                    </button>


                                                    {/* Spam */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            markSpam(
                                                                comment.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-orange-600 p-2 text-white transition hover:bg-orange-700"
                                                        title="Mark as Spam"
                                                    >

                                                        <ShieldAlert
                                                            size={18}
                                                        />

                                                    </button>


                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                                                        title="Delete Comment"
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

                <div className="text-sm text-gray-600">

                    Showing

                    <span className="mx-1 font-semibold">
                        {comments.length}
                    </span>

                    of

                    <span className="mx-1 font-semibold">
                        {pagination.total}
                    </span>

                    pending comments

                </div>


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
                        className={`rounded-xl px-5 py-2 font-medium transition ${
                            pagination.hasPreviousPage
                                ? "bg-gray-200 hover:bg-gray-300"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
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
                        className={`rounded-xl px-5 py-2 font-medium transition ${
                            pagination.hasNextPage
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


export default PendingComments;