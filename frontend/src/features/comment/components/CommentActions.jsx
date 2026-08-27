import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
    Eye,
    CheckCircle,
    XCircle,
    ShieldAlert,
    RotateCcw,
    Trash2,
} from "lucide-react";

const CommentActions = ({
    comment,
    showView = true,
    showApprove = true,
    showReject = false,
    showSpam = true,
    showRestore = false,
    showDelete = true,

    onApprove,
    onReject,
    onSpam,
    onRestore,
    onDelete,
}) => {

    return (

        <div className="flex flex-wrap items-center justify-end gap-2">

            {showView && (

                <Link
                    to={`/admin/comments/${comment.id}`}
                    className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                    title="View"
                >
                    <Eye size={18} />
                </Link>

            )}

            {showApprove && (

                <button
                    type="button"
                    onClick={() => onApprove?.(comment.id)}
                    className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                    title="Approve"
                >
                    <CheckCircle size={18} />
                </button>

            )}

            {showReject && (

                <button
                    type="button"
                    onClick={() => onReject?.(comment.id)}
                    className="rounded-lg bg-yellow-600 p-2 text-white transition hover:bg-yellow-700"
                    title="Reject"
                >
                    <XCircle size={18} />
                </button>

            )}

            {showSpam && (

                <button
                    type="button"
                    onClick={() => onSpam?.(comment.id)}
                    className="rounded-lg bg-orange-600 p-2 text-white transition hover:bg-orange-700"
                    title="Mark as Spam"
                >
                    <ShieldAlert size={18} />
                </button>

            )}

            {showRestore && (

                <button
                    type="button"
                    onClick={() => onRestore?.(comment.id)}
                    className="rounded-lg bg-indigo-600 p-2 text-white transition hover:bg-indigo-700"
                    title="Restore"
                >
                    <RotateCcw size={18} />
                </button>

            )}

            {showDelete && (

                <button
                    type="button"
                    onClick={() => onDelete?.(comment.id)}
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>

            )}

        </div>

    );

};

CommentActions.propTypes = {

    comment: PropTypes.object.isRequired,

    showView: PropTypes.bool,
    showApprove: PropTypes.bool,
    showReject: PropTypes.bool,
    showSpam: PropTypes.bool,
    showRestore: PropTypes.bool,
    showDelete: PropTypes.bool,

    onApprove: PropTypes.func,
    onReject: PropTypes.func,
    onSpam: PropTypes.func,
    onRestore: PropTypes.func,
    onDelete: PropTypes.func,

};

export default CommentActions;