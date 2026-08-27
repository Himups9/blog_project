// frontend/src/features/comment/routes/adminCommentRoutes.jsx

import {
    MessageSquare,
    Clock3,
    CheckCircle,
    ShieldAlert,
    Flag,
    Eye,
    MessageCircleReply,
} from "lucide-react";

import CommentManagement from "../pages/admin/CommentManagement";
import PendingComments from "../pages/admin/PendingComments";
import ApprovedComments from "../pages/admin/ApprovedComments";
import SpamComments from "../pages/admin/SpamComments";
import ReportedComments from "../pages/admin/ReportedComments";
import CommentDetails from "../pages/admin/CommentDetails";
import CommentReplies from "../pages/admin/CommentReplies";

const adminCommentRoutes = [
    // All Comments
    {
        index: true,
        element: <CommentManagement />,
        title: "Comments",
        icon: MessageSquare,
    },

    // Pending Comments
    {
        path: "pending",
        element: <PendingComments />,
        title: "Pending Comments",
        icon: Clock3,
    },

    // Approved Comments
    {
        path: "approved",
        element: <ApprovedComments />,
        title: "Approved Comments",
        icon: CheckCircle,
    },

    // Spam Comments
    {
        path: "spam",
        element: <SpamComments />,
        title: "Spam Comments",
        icon: ShieldAlert,
    },

    // Reported Comments
    {
        path: "reported",
        element: <ReportedComments />,
        title: "Reported Comments",
        icon: Flag,
    },

    // Comment Replies
    {
        path: ":id/replies",
        element: <CommentReplies />,
        title: "Comment Replies",
        icon: MessageCircleReply,
    },

    // Comment Details
    {
        path: ":id",
        element: <CommentDetails />,
        title: "Comment Details",
        icon: Eye,
    },
];

export default adminCommentRoutes;