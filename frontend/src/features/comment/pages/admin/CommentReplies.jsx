import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    ArrowLeft,
    MessageCircleReply,
    RefreshCw,
    Send,
    Trash2,
    User,
} from "lucide-react";

import commentService from "../../services/commentService";


const CommentReplies = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [reply, setReply] = useState("");

    const [replies, setReplies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Load Replies
    |--------------------------------------------------------------------------
    */

    const loadReplies = useCallback(
        async () => {

            try {

                setLoading(true);

                const response =
                    await commentService.getReplies(id);

                const data =
                    response.data?.data ??
                    response.data;

                /*
                 * Handle different possible API
                 * response structures.
                 */

                if (Array.isArray(data)) {

                    setReplies(data);

                } else if (
                    Array.isArray(data?.replies)
                ) {

                    setReplies(data.replies);

                } else {

                    setReplies([]);

                }

            } catch (error) {

                console.error(
                    "Failed to load replies:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load replies."
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

        loadReplies();

    }, [loadReplies]);


    /*
    |--------------------------------------------------------------------------
    | Submit Reply
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (event) => {

        event.preventDefault();


        const content =
            reply.trim();


        if (!content) {

            toast.error(
                "Please enter a reply."
            );

            return;

        }


        try {

            setSubmitting(true);


            await commentService.replyComment(
                id,
                {
                    content,
                }
            );


            toast.success(
                "Reply added successfully."
            );


            setReply("");


            /*
             * Reload from backend so the
             * newly created reply appears
             * with its real ID and data.
             */

            await loadReplies();

        } catch (error) {

            console.error(
                "Failed to add reply:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to add reply."
            );

        } finally {

            setSubmitting(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Reply
    |--------------------------------------------------------------------------
    |
    | Your current commentService.js does NOT
    | contain deleteReply().
    |
    | Therefore we don't pretend that deleting
    | it locally deletes it from the database.
    |
    */

    const handleDelete = async (replyId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this reply?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await commentService.deleteReply(
                replyId
            );

            toast.success(
                "Reply deleted successfully."
            );

            await loadReplies();

        } catch (error) {

            console.error(
                "Failed to delete reply:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to delete reply."
            );

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

                <div className="flex items-center gap-3 text-gray-500">

                    <RefreshCw
                        size={20}
                        className="animate-spin"
                    />

                    Loading replies...

                </div>

            </div>

        );

    }


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

                        <ArrowLeft
                            size={18}
                        />

                    </button>


                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">

                            Comment Replies

                        </h1>


                        <p className="mt-1 text-sm text-gray-500">

                            Manage replies for comment #{id}.

                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    onClick={loadReplies}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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


            {/* Reply Form */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">


                <div className="mb-5 flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-3">

                        <MessageCircleReply
                            size={20}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <h2 className="font-semibold text-gray-900">

                            Add Reply

                        </h2>


                        <p className="text-sm text-gray-500">

                            Reply to this comment as an administrator.

                        </p>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <textarea
                        value={reply}
                        onChange={(event) =>
                            setReply(
                                event.target.value
                            )
                        }
                        rows={5}
                        disabled={submitting}
                        placeholder="Write your reply..."
                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />


                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                !reply.trim()
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {submitting ? (

                                <>

                                    <RefreshCw
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Sending...

                                </>

                            ) : (

                                <>

                                    <Send size={18} />

                                    Send Reply

                                </>

                            )}

                        </button>

                    </div>

                </form>

            </div>


            {/* Replies */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">


                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold text-gray-900">

                            Replies

                        </h2>


                        <p className="text-sm text-gray-500">

                            {replies.length}{" "}

                            {replies.length === 1
                                ? "reply"
                                : "replies"}

                        </p>

                    </div>

                </div>


                {replies.length === 0 ? (

                    <div className="rounded-xl bg-gray-50 p-8 text-center">

                        <MessageCircleReply
                            size={32}
                            className="mx-auto text-gray-400"
                        />


                        <p className="mt-3 text-sm text-gray-500">

                            No replies yet.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {replies.map(
                            (item) => (

                                <div
                                    key={item.id}
                                    className="rounded-xl border border-gray-200 p-5"
                                >


                                    <div className="flex items-start justify-between gap-4">


                                        <div className="flex items-start gap-3">

                                            <div className="rounded-full bg-gray-100 p-3">

                                                <User
                                                    size={18}
                                                />

                                            </div>


                                            <div>

                                                <p className="font-semibold text-gray-900">

                                                    {item.user
                                                        ? `${item.user.firstName || ""} ${item.user.lastName || ""}`.trim()
                                                        : item.author ||
                                                          "Unknown User"}

                                                </p>


                                                <p className="text-xs text-gray-500">

                                                    {item.createdAt
                                                        ? new Date(
                                                            item.createdAt
                                                        ).toLocaleString()
                                                        : "-"}

                                                </p>

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    item.id
                                                )
                                            }
                                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                            title="Delete reply"
                                        >

                                            <Trash2
                                                size={18}
                                            />

                                        </button>

                                    </div>


                                    <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-700">

                                        {item.content}

                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};


export default CommentReplies;