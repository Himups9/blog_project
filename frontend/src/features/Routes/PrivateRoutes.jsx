import DashboardLayout from "../dashboard/pages/DashboardLayout";
import UserDashboard from "../dashboard/pages/UserDashboard";

import dashboardBlogRoutes from "../blog/routes/dashboardBlogRoutes";
import commentRoutes from "../comment/routes/commentRoutes";
import settingsRoutes from "../settings/routes/settingsRoutes";

import UserProfile from "../dashboard/pages/UserProfile";

const privateRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <UserDashboard />,
            },

            {
                path: "profile",
                element: <UserProfile />,
            },

            {
                path: "blogs",
                children: dashboardBlogRoutes,
            },

            {
                path: "comments",
                children: commentRoutes,
            },

            {
                path: "settings",
                children: settingsRoutes,
            },
        ],
    },
];

export default privateRoutes;