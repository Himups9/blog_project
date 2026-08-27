import { useCallback, useEffect, useState } from "react";
import {
    CheckCircle,
    Clock3,
    Eye,
    RefreshCw,
    Search,
    ShieldAlert,
    Trash2,
    XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import commentService from "../../services/commentService";


const CommentManagement = () => {

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    const [statistics, setStatistics] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        spam: 0,
    });


    /*
    |--------------------------------------------------------------------------
    | Load Comments
    |--------------------------------------------------------------------------
    */

    const loadComments = useCallback(
        async () => {

            try {

                setLoading(true);

                const response =
                    await commentService.getAdminComments({

                        page,

                        limit: 10,

                        search: search.trim(),

                        status,

                    });


                const data = response.data?.data;

                setComments(
                    Array.isArray(data)
                        ? data
                        : []
                );


                const responsePagination =
                    response.data?.pagination || {
                        page,
                        limit: 10,
                        total: 0,
                        totalPages: 0,
                    };

                setPagination({
                    ...responsePagination,
                    hasNextPage:
                        responsePagination.page <
                        responsePagination.totalPages,
                    hasPreviousPage:
                        responsePagination.page > 1,
                });


                setSelectedIds([]);

            } catch (error) {

                console.error(
                    "Failed to load comments:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load comments."
                );

            } finally {

                setLoading(false);

            }

        },
        [page, search, status]
    );


    /*
    |--------------------------------------------------------------------------
    | Load Statistics
    |--------------------------------------------------------------------------
    */

    const loadStatistics = useCallback(
        async () => {

            try {

                const response =
                    await commentService
                        .getCommentStatistics();


                setStatistics(
                    response.data?.data || {
                        total: 0,
                        pending: 0,
                        approved: 0,
                        rejected: 0,
                        spam: 0,
                    }
                );

            } catch (error) {

                console.error(
                    "Failed to load statistics:",
                    error
                );

            }

        },
        []
    );


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadComments();

        loadStatistics();

    }, [
        loadComments,
        loadStatistics,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {

        loadComments();

        loadStatistics();

    };


    /*
    |--------------------------------------------------------------------------
    | Select Single Comment
    |--------------------------------------------------------------------------
    */

    const handleSelect = (id) => {

        setSelectedIds((current) => {

            if (current.includes(id)) {

                return current.filter(
                    (item) => item !== id
                );

            }

            return [
                ...current,
                id,
            ];

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Select All
    |--------------------------------------------------------------------------
    */

    const handleSelectAll = () => {

        if (
            selectedIds.length ===
            comments.length
        ) {

            setSelectedIds([]);

            return;

        }

        setSelectedIds(
            comments.map(
                (comment) => comment.id
            )
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Approve
    |--------------------------------------------------------------------------
    */

    const handleApprove = async (id) => {

        try {

            await commentService.approveComment(id);

            toast.success(
                "Comment approved."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to approve comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Reject
    |--------------------------------------------------------------------------
    */

    const handleReject = async (id) => {

        try {

            await commentService.rejectComment(id);

            toast.success(
                "Comment rejected."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to reject comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Mark Spam
    |--------------------------------------------------------------------------
    */

    const handleSpam = async (id) => {

        try {

            await commentService.markSpam(id);

            toast.success(
                "Comment marked as spam."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to mark comment as spam."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Restore
    |--------------------------------------------------------------------------
    */

    const handleRestore = async (id) => {

        try {

            await commentService.restoreComment(id);

            toast.success(
                "Comment restored."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to restore comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this comment?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await commentService.deleteComment(id);

            toast.success(
                "Comment deleted."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete comment."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Bulk Approve
    |--------------------------------------------------------------------------
    */

    const handleBulkApprove = async () => {

        if (!selectedIds.length) {
            return;
        }


        try {

            await commentService.bulkApprove(
                selectedIds
            );

            toast.success(
                "Comments approved."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Bulk approve failed."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Bulk Reject
    |--------------------------------------------------------------------------
    */

    const handleBulkReject = async () => {

        if (!selectedIds.length) {
            return;
        }


        try {

            await commentService.bulkReject(
                selectedIds
            );

            toast.success(
                "Comments rejected."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Bulk reject failed."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Bulk Spam
    |--------------------------------------------------------------------------
    */

    const handleBulkSpam = async () => {

        if (!selectedIds.length) {
            return;
        }


        try {

            await commentService.bulkSpam(
                selectedIds
            );

            toast.success(
                "Comments marked as spam."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Bulk spam failed."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Bulk Delete
    |--------------------------------------------------------------------------
    */

    const handleBulkDelete = async () => {

        if (!selectedIds.length) {
            return;
        }


        const confirmed =
            window.confirm(
                `Delete ${selectedIds.length} selected comments?`
            );


        if (!confirmed) {
            return;
        }


        try {

            await commentService.bulkDelete(
                selectedIds
            );

            toast.success(
                "Comments deleted."
            );

            await loadComments();

            await loadStatistics();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Bulk delete failed."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearchChange = (event) => {

        setSearch(
            event.target.value
        );

        setPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | Status Filter
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = (event) => {

        setStatus(
            event.target.value
        );

        setPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | Status Badge
    |--------------------------------------------------------------------------
    */

    const getStatusBadge = (commentStatus) => {

        const styles = {

            PENDING:
                "bg-yellow-100 text-yellow-700",

            APPROVED:
                "bg-green-100 text-green-700",

            REJECTED:
                "bg-red-100 text-red-700",

            SPAM:
                "bg-gray-200 text-gray-700",

        };


        return (

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    styles[commentStatus] ||
                    "bg-gray-100 text-gray-600"
                }`}
            >

                {commentStatus}

            </span>

        );

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
                        Comment Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage, moderate, and review comments.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleRefresh}
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


            {/* Statistics */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                <div className="rounded-2xl bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Total
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {statistics.total}
                    </p>

                </div>


                <div className="rounded-2xl bg-white p-5 shadow-sm">

                    <p className="text-sm text-yellow-600">
                        Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {statistics.pending}
                    </p>

                </div>


                <div className="rounded-2xl bg-white p-5 shadow-sm">

                    <p className="text-sm text-green-600">
                        Approved
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {statistics.approved}
                    </p>

                </div>


                <div className="rounded-2xl bg-white p-5 shadow-sm">

                    <p className="text-sm text-red-600">
                        Rejected
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {statistics.rejected}
                    </p>

                </div>


                <div className="rounded-2xl bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-600">
                        Spam
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {statistics.spam}
                    </p>

                </div>

            </div>


            {/* Filters */}

            <div className="rounded-2xl bg-white p-5 shadow-sm">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search comments..."
                            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                        />

                    </div>


                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    >

                        <option value="">
                            All Statuses
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>

                        <option value="SPAM">
                            Spam
                        </option>

                    </select>

                </div>

            </div>


            {/* Bulk Actions */}

            {selectedIds.length > 0 && (

                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-5 shadow-sm">

                    <span className="mr-2 font-medium text-gray-700">

                        {selectedIds.length}
                        {" "}
                        selected

                    </span>


                    <button
                        type="button"
                        onClick={handleBulkApprove}
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >

                        <CheckCircle size={16} />

                        Approve

                    </button>


                    <button
                        type="button"
                        onClick={handleBulkReject}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >

                        <XCircle size={16} />

                        Reject

                    </button>


                    <button
                        type="button"
                        onClick={handleBulkSpam}
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >

                        <ShieldAlert size={16} />

                        Spam

                    </button>


                    <button
                        type="button"
                        onClick={handleBulkDelete}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
                    >

                        <Trash2 size={16} />

                        Delete

                    </button>

                </div>

            )}


            {/* Table */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>

                                <th className="px-5 py-4 text-left">

                                    <input
                                        type="checkbox"
                                        checked={
                                            comments.length > 0 &&
                                            selectedIds.length === comments.length
                                        }
                                        onChange={handleSelectAll}
                                    />

                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                    Comment
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                    Author
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                    Blog
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-5 py-12 text-center text-gray-500"
                                    >

                                        Loading comments...

                                    </td>

                                </tr>

                            ) : comments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-5 py-12 text-center text-gray-500"
                                    >

                                        No comments found.

                                    </td>

                                </tr>

                            ) : (

                                comments.map(
                                    (comment) => (

                                        <tr
                                            key={comment.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4">

                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        comment.id
                                                    )}
                                                    onChange={() =>
                                                        handleSelect(
                                                            comment.id
                                                        )
                                                    }
                                                />

                                            </td>


                                            <td className="max-w-md px-5 py-4">

                                                <p className="line-clamp-2 text-sm text-gray-800">

                                                    {comment.content}

                                                </p>

                                            </td>


                                            <td className="px-5 py-4">

                                                <p className="text-sm font-medium text-gray-900">

                                                    {comment.user
                                                        ? `${comment.user.firstName || ""} ${comment.user.lastName || ""}`.trim()
                                                        : "Unknown"}

                                                </p>

                                                {comment.user?.email && (

                                                    <p className="text-xs text-gray-500">

                                                        {comment.user.email}

                                                    </p>

                                                )}

                                            </td>


                                            <td className="max-w-xs px-5 py-4">

                                                <p className="truncate text-sm text-gray-700">

                                                    {comment.blog?.title ||
                                                        "Unknown blog"}

                                                </p>

                                            </td>


                                            <td className="px-5 py-4">

                                                {getStatusBadge(
                                                    comment.status
                                                )}

                                            </td>


                                            <td className="px-5 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        title="View"
                                                        onClick={() =>
                                                            window.location.href =
                                                                `/admin/comments/${comment.id}`
                                                        }
                                                        className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                                                    >

                                                        <Eye size={16} />

                                                    </button>


                                                    {comment.status === "PENDING" && (

                                                        <button
                                                            type="button"
                                                            title="Approve"
                                                            onClick={() =>
                                                                handleApprove(
                                                                    comment.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200"
                                                        >

                                                            <CheckCircle
                                                                size={16}
                                                            />

                                                        </button>

                                                    )}


                                                    {comment.status !== "SPAM" && (

                                                        <button
                                                            type="button"
                                                            title="Spam"
                                                            onClick={() =>
                                                                handleSpam(
                                                                    comment.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-gray-100 p-2 text-gray-700 hover:bg-gray-200"
                                                        >

                                                            <ShieldAlert
                                                                size={16}
                                                            />

                                                        </button>

                                                    )}


                                                    {comment.status === "SPAM" && (

                                                        <button
                                                            type="button"
                                                            title="Restore"
                                                            onClick={() =>
                                                                handleRestore(
                                                                    comment.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                                                        >

                                                            <RefreshCw
                                                                size={16}
                                                            />

                                                        </button>

                                                    )}


                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                                                    >

                                                        <Trash2
                                                            size={16}
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}

                {pagination.totalPages > 0 && (

                    <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 md:flex-row md:items-center md:justify-between">

                        <p className="text-sm text-gray-500">

                            Page {pagination.page} of{" "}
                            {pagination.totalPages}

                        </p>


                        <div className="flex gap-2">

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
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                Previous

                            </button>


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
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                Next

                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};


export default CommentManagement;
