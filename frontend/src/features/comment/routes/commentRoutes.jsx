import CommentDetails from "../pages/admin/CommentDetails";
import CommentReplies from "../pages/admin/CommentReplies";

const commentRoutes = [
    {
        path: ":id",
        element: <CommentDetails />,
    },

    {
        path: ":id/replies",
        element: <CommentReplies />,
    },
];

export default commentRoutes;