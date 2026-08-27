import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { MessageSquareReply, Send, X } from "lucide-react";

import commentService from "../services/commentService";

const CommentReplyModal = ({
    isOpen,
    comment,
    onClose,
    onSuccess,
}) => {

    const [reply, setReply] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!isOpen) {

            setReply("");

        }

    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!reply.trim()) {

            toast.error("Reply is required.");

            return;

        }

        try {

            setLoading(true);

            await commentService.replyComment(
                comment.id,
                {
                    reply,
                }
            );

            toast.success(
                "Reply sent successfully."
            );

            setReply("");

            onSuccess?.();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to send reply."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-blue-100 p-3">

                            <MessageSquareReply
                                size={24}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold">
                                Reply to Comment
                            </h2>

                            <p className="text-sm text-gray-500">
                                Send a moderator reply.
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">

                            Original Comment

                        </label>

                        <div className="rounded-xl border bg-gray-50 p-4">

                            <div className="mb-2 flex items-center justify-between">

                                <span className="font-semibold">

                                    {comment?.user_name}

                                </span>

                                <span className="text-sm text-gray-500">

                                    {comment?.created_at &&
                                        new Date(
                                            comment.created_at
                                        ).toLocaleString()}

                                </span>

                            </div>

                            <p className="text-gray-700">

                                {comment?.content}

                            </p>

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">

                            Your Reply

                        </label>

                        <textarea
                            rows={6}
                            value={reply}
                            onChange={(e) =>
                                setReply(e.target.value)
                            }
                            placeholder="Write your reply..."
                            className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-500 focus:outline-none"
                        />

                        <div className="mt-2 text-right text-sm text-gray-500">

                            {reply.length} / 2000

                        </div>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >

                            <Send size={18} />

                            {loading
                                ? "Sending..."
                                : "Send Reply"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

CommentReplyModal.propTypes = {

    isOpen: PropTypes.bool.isRequired,

    comment: PropTypes.shape({

        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        user_name: PropTypes.string,

        content: PropTypes.string,

        created_at: PropTypes.string,

    }),

    onClose: PropTypes.func.isRequired,

    onSuccess: PropTypes.func,

};

export default CommentReplyModal;