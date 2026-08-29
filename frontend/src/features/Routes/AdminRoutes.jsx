// frontend/src/features/admin/routes/adminRoutes.jsx

import AdminDashboard from "../admin/pages/AdminDashboard";
import Users from "../admin/pages/Users";

// Feature Routes
import adminBlogRoutes from "../blog/routes/adminBlogRoutes";
import adminSettingsRoutes from "../settings/routes/adminsettingsRoutes";
import adminCategoryRoutes from "../category/routes/adminCategoryRoutes";
import adminTagRoutes from "../tag/routes/adminTagRoutes";
import adminCommentRoutes from "../comment/routes/adminCommentRoutes";
import adminMediaRoutes from "../media/routes/adminMediaRoutes";
import adminSeoRoutes from "../seo/routes/adminSeoRoutes";

// Gallery
import Gallery from "../gallery/pages/Gallery";
import CreateGallery from "../gallery/pages/CreateGallery";
import EditGallery from "../gallery/pages/EditGallery";
import GalleryPreview from "../gallery/components/GalleryPreview";
import AdminGalleryPreview from "../gallery/components/AdminGalleryPreview";




const adminRoutes = [
    // Admin Dashboard
    {
        index: true,
        element: <AdminDashboard />,
    },

    // Users
    {
        path: "users",
        element: <Users />,
    },

    // Blogs
    {
        path: "blogs",
        children: adminBlogRoutes,
    },

    // Settings
    {
        path: "settings",
        children: adminSettingsRoutes,
    },

    // Categories
    {
        path: "categories",
        children: adminCategoryRoutes,
    },

    // Tags
    {
        path: "tags",
        children: adminTagRoutes,
    },

    // Comments
    {
        path: "comments",
        children: adminCommentRoutes,
    },

    // Media
    {
        path: "media",
        children: adminMediaRoutes,
    },

    // SEO
    {
        path: "seo",
        children: adminSeoRoutes,
    },

    // Gallery
    {
        path: "gallery",
        element: <Gallery />,
    },

    {
        path: "gallery/create",
        element: <CreateGallery />,
    },

    {
        path: "gallery/edit/:id",
        element: <EditGallery />,
    },

    {
        path: "gallery/:id",
        element: <AdminGalleryPreview />,
    },
];

export default adminRoutes;