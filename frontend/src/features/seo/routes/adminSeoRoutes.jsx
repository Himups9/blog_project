import { Navigate } from "react-router-dom";

import SEOSettings from "../pages/SEOSettings";
import SitemapManagement from "../pages/SitemapManagement";
import RobotsManagement from "../pages/RobotsManagement";
import SEOAnalytics from "../pages/SEOAnalytics";
import SEOAudit from "../pages/SEOAudit";

const adminSeoRoutes = [
    {
        index: true,
        element: <Navigate to="settings" replace />,
    },

    {
        path: "settings",
        element: <SEOSettings />,
        meta: {
            title: "SEO Settings",
            breadcrumb: "SEO Settings",
        },
    },

    {
        path: "analytics",
        element: <SEOAnalytics />,
        meta: {
            title: "SEO Analytics",
            breadcrumb: "SEO Analytics",
        },
    },

    {
        path: "audit",
        element: <SEOAudit />,
        meta: {
            title: "SEO Audit",
            breadcrumb: "SEO Audit",
        },
    },

    {
        path: "sitemap",
        element: <SitemapManagement />,
        meta: {
            title: "Sitemap Management",
            breadcrumb: "Sitemap",
        },
    },

    {
        path: "robots",
        element: <RobotsManagement />,
        meta: {
            title: "Robots.txt",
            breadcrumb: "Robots",
        },
    },
];

export default adminSeoRoutes;