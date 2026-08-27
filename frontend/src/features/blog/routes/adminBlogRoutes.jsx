import BlogManagement from "../pages/admin/BlogManagement";
import CreateAnyBlog from "../pages/admin/CreateAnyBlog";
import EditAnyBlog from "../pages/admin/EditAnyBlog";

import PendingBlogs from "../pages/admin/PendingBlogs";
import DraftBlogs from "../pages/admin/DraftBlogs";
import ScheduledBlogs from "../pages/admin/ScheduledBlogs";
import FeaturedBlogs from "../pages/admin/FeaturedBlogs";
import ReportedBlogs from "../pages/admin/ReportedBlogs";
import DeletedBlogs from "../pages/admin/DeletedBlogs";
import ArchivedBlogs from "../pages/admin/ArchivedBlogs";
import RecycleBin from "../pages/admin/RecycleBin";

import BlogStatistics from "../pages/admin/BlogStatistics";
import BlogAnalytics from "../pages/admin/BlogAnalytics";
import BlogSettings from "../pages/admin/BlogSettings";

const adminBlogRoutes = [
    {
        index: true,
        element: <BlogManagement />,
    },
    {
        path: "create",
        element: <CreateAnyBlog />,
    },
    {
        path: "edit/:id",
        element: <EditAnyBlog />,
    },
    {
        path: "pending",
        element: <PendingBlogs />,
    },
    {
        path: "drafts",
        element: <DraftBlogs />,
    },
    {
        path: "scheduled",
        element: <ScheduledBlogs />,
    },
    {
        path: "featured",
        element: <FeaturedBlogs />,
    },
    {
        path: "reported",
        element: <ReportedBlogs />,
    },
    {
        path: "deleted",
        element: <DeletedBlogs />,
    },
    {
        path: "archived",
        element: <ArchivedBlogs />,
    },
    {
        path: "recycle-bin",
        element: <RecycleBin />,
    },
    {
        path: "statistics",
        element: <BlogStatistics />,
    },
    {
        path: "analytics",
        element: <BlogAnalytics />,
    },
    {
        path: "settings",
        element: <BlogSettings />,
    },
];

export default adminBlogRoutes;