import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Mail,
    MessageCircleReply,
    MessageSquare,
    ShieldAlert,
    Trash2,
    User,
    XCircle,
} from "lucide-react";

import commentService from "../../services/commentService";


const CommentDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [comment, setComment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Load Comment
    |--------------------------------------------------------------------------
    */

    const loadComment = useCallback(
        async () => {

            try {

                setLoading(true);

                const response =
                    await commentService.getComment(id);

                const data =
                    response.data?.data ??
                    response.data;

                setComment(data);

            } catch (error) {

                console.error(
                    "Failed to load comment:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load comment."
                );

            } finally {

                setLoading(false);

            }

        },
        [id]
    );


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadComment();

    }, [loadComment]);


    /*
    |--------------------------------------------------------------------------
    | Approve
    |--------------------------------------------------------------------------
    */

    const handleApprove = async () => {

        try {

            setActionLoading(true);

            await commentService.approveComment(id);

            toast.success(
                "Comment approved successfully."
            );

            await loadComment();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to approve comment."
            );

        } finally {

            setActionLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Reject
    |--------------------------------------------------------------------------
    */

    const handleReject = async () => {

        try {

            setActionLoading(true);

            await commentService.rejectComment(id);

            toast.success(
                "Comment rejected."
            );

            await loadComment();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to reject comment."
            );

        } finally {

            setActionLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Mark As Spam
    |--------------------------------------------------------------------------
    */

    const handleSpam = async () => {

        try {

            setActionLoading(true);

            await commentService.markSpam(id);

            toast.success(
                "Comment marked as spam."
            );

            await loadComment();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to mark comment as spam."
            );

        } finally {

            setActionLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Restore
    |--------------------------------------------------------------------------
    */

    const handleRestore = async () => {

        try {

            setActionLoading(true);

            await commentService.restoreComment(id);

            toast.success(
                "Comment restored successfully."
            );

            await loadComment();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to restore comment."
            );

        } finally {

            setActionLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this comment?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);

            await commentService.deleteComment(id);

            toast.success(
                "Comment deleted successfully."
            );

            navigate(
                "/admin/comments"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to delete comment."
            );

        } finally {

            setActionLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="flex min-h-96 items-center justify-center">

                <p className="text-gray-500">
                    Loading comment...
                </p>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Not Found
    |--------------------------------------------------------------------------
    */

    if (!comment) {

        return (

            <div className="space-y-6">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-100"
                >

                    <ArrowLeft size={18} />

                    Back

                </button>


                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="text-lg text-gray-500">
                        Comment not found.
                    </p>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const userName =
        comment.user
            ? `${comment.user.firstName || ""} ${comment.user.lastName || ""}`.trim()
            : "Unknown User";


    const userEmail =
        comment.user?.email ||
        "-";


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const status =
        comment.status || "UNKNOWN";


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 p-3 transition hover:bg-gray-100"
                    >

                        <ArrowLeft size={18} />

                    </button>


                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Comment Details
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage this comment.
                        </p>

                    </div>

                </div>

            </div>


            {/* Main */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


                {/* Comment */}

                <div className="lg:col-span-2">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        {/* Comment Header */}

                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-blue-100 p-3">

                                    <MessageSquare
                                        size={20}
                                        className="text-blue-600"
                                    />

                                </div>


                                <div>

                                    <h2 className="font-semibold text-gray-900">
                                        Comment
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        #{comment.id}
                                    </p>

                                </div>

                            </div>


                            <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                    status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : status === "REJECTED"
                                            ? "bg-red-100 text-red-700"
                                            : status === "SPAM"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-yellow-100 text-yellow-700"
                                }`}
                            >

                                {status}

                            </span>

                        </div>


                        {/* Content */}

                        <div className="rounded-xl bg-gray-50 p-5">

                            <p className="whitespace-pre-wrap leading-7 text-gray-700">

                                {comment.content}

                            </p>

                        </div>


                        {/* Actions */}

                        <div className="mt-6 flex flex-wrap gap-3">


                            {status === "PENDING" && (

                                <button
                                    type="button"
                                    disabled={actionLoading}
                                    onClick={handleApprove}
                                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    <CheckCircle size={18} />

                                    Approve

                                </button>

                            )}


                            {status === "PENDING" && (

                                <button
                                    type="button"
                                    disabled={actionLoading}
                                    onClick={handleReject}
                                    className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 font-medium text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    <XCircle size={18} />

                                    Reject

                                </button>

                            )}


                            {status !== "SPAM" && (

                                <button
                                    type="button"
                                    disabled={actionLoading}
                                    onClick={handleSpam}
                                    className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    <ShieldAlert size={18} />

                                    Mark Spam

                                </button>

                            )}


                            {status === "SPAM" && (

                                <button
                                    type="button"
                                    disabled={actionLoading}
                                    onClick={handleRestore}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    <CheckCircle size={18} />

                                    Restore

                                </button>

                            )}


                            <button
                                type="button"
                                disabled={actionLoading}
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <Trash2 size={18} />

                                Delete

                            </button>


                            <Link
                                to={`/admin/comments/${comment.id}/replies`}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-100"
                            >

                                <MessageCircleReply size={18} />

                                Replies

                            </Link>

                        </div>

                    </div>

                </div>


                {/* Sidebar */}

                <div className="space-y-6">


                    {/* User */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-5 font-semibold text-gray-900">
                            User Information
                        </h2>


                        <div className="space-y-4">


                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-gray-100 p-3">

                                    <User size={18} />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-sm text-gray-500">
                                        Name
                                    </p>

                                    <p className="truncate font-medium text-gray-900">
                                        {userName}
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-gray-100 p-3">

                                    <Mail size={18} />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="truncate font-medium text-gray-900">
                                        {userEmail}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Blog */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-4 font-semibold text-gray-900">
                            Blog
                        </h2>

                        <p className="text-sm text-gray-500">
                            Comment posted on
                        </p>

                        <p className="mt-1 font-medium text-gray-900">

                            {comment.blog?.title ||
                                "Unknown Blog"}

                        </p>

                    </div>


                    {/* Date */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-purple-100 p-3">

                                <Calendar
                                    size={18}
                                    className="text-purple-600"
                                />

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Created
                                </p>

                                <p className="font-medium text-gray-900">

                                    {comment.createdAt
                                        ? new Date(
                                            comment.createdAt
                                        ).toLocaleString()
                                        : "-"}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default CommentDetails;