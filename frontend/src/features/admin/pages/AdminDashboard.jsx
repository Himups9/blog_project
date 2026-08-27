// frontend/src/features/dashboard/pages/AdminDashboard.jsx

import React from "react";
import {
    Users,
    FileText,
    CheckCircle,
    FileEdit,
    Folder,
    Tags,
    MessageSquare,
    Image as ImageIcon,
    RefreshCw,
} from "lucide-react";

import useAdminDashboard from "../hooks/useAdminDashboard";

// Reuse existing admin dashboard components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import RecentBlogs from "../components/dashboard/RecentBlogs";
import RecentUsers from "../components/dashboard/RecentUsers";
import RecentComments from "../components/dashboard/RecentComments";
import RecentGallery from "../components/dashboard/RecentGallery";

const AdminDashboard = () => {
    const {
        dashboard,
        loading,
        error,
        refetch,
    } = useAdminDashboard();

    const stats = dashboard?.stats ?? {};

    const recentUsers = dashboard?.recentUsers ?? [];
    const recentBlogs = dashboard?.recentBlogs ?? [];
    const recentComments = dashboard?.recentComments ?? [];
    const recentGallery = dashboard?.recentGallery ?? [];

    /*
     * Loading State
     */
    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white"
                            />
                        )
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="h-72 animate-pulse rounded-xl border border-gray-200 bg-white" />

                    <div className="h-72 animate-pulse rounded-xl border border-gray-200 bg-white" />
                </div>
            </div>
        );
    }

    /*
     * Error State
     */
    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-red-800">
                            Unable to load admin dashboard
                        </h2>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={refetch}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                        <RefreshCw
                            className="h-4 w-4"
                            aria-hidden="true"
                        />

                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    /*
     * Dashboard
     */
    return (
        <div className="space-y-6">
            {/* Dashboard Header */}
            <DashboardHeader
                title="Admin Dashboard"
                description="Overview of your website activity and content."
                loading={loading}
                onRefresh={refetch}
            />

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers ?? 0}
                    icon={Users}
                />

                <StatCard
                    title="Total Blogs"
                    value={stats.totalBlogs ?? 0}
                    icon={FileText}
                />

                <StatCard
                    title="Published Blogs"
                    value={stats.publishedBlogs ?? 0}
                    icon={CheckCircle}
                />

                <StatCard
                    title="Draft Blogs"
                    value={stats.draftBlogs ?? 0}
                    icon={FileEdit}
                />

                <StatCard
                    title="Categories"
                    value={stats.totalCategories ?? 0}
                    icon={Folder}
                />

                <StatCard
                    title="Tags"
                    value={stats.totalTags ?? 0}
                    icon={Tags}
                />

                <StatCard
                    title="Comments"
                    value={stats.totalComments ?? 0}
                    icon={MessageSquare}
                />

                <StatCard
                    title="Gallery Items"
                    value={stats.totalGalleryItems ?? 0}
                    icon={ImageIcon}
                />
            </div>

            {/* Recent Users */}
            <RecentUsers users={recentUsers} />

            {/* Recent Blogs */}
            <RecentBlogs
                blogs={recentBlogs}
                title="Recent Blogs"
                description="Latest blog posts on your website."
                viewAllLink="/admin/blogs"
            />

            {/* Recent Comments */}
            <RecentComments comments={recentComments} />

            {/* Recent Gallery */}
            <RecentGallery gallery={recentGallery} />
        </div>
    );
};

export default AdminDashboard;