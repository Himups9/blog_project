import React, { useState } from "react";
import {
    User,
    FileText,
    CheckCircle,
    FileEdit,
    ArrowRight,
    RefreshCw,
    LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";

import { useAuth } from "../../auth/context/AuthContext";
import LogoutConfirmModal from "../../admin/components/modals/LogoutConfirmModal";

import useDashboard from "../hooks/useDashboard";
import StatCard from "../components/StatCard";
import RecentBlogs from "../components/RecentBlogs";

const UserDashboard = () => {

    const { user, logout } = useAuth();

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    const {
        dashboard,
        loading,
        error,
        refetch,
    } = useDashboard("user");


    /*
    |--------------------------------------------------------------------------
    | Logout State
    |--------------------------------------------------------------------------
    */

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const [logoutLoading, setLogoutLoading] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const firstName = user?.firstName || "User";

    const lastName = user?.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim();

    const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`
        .toUpperCase() || "U";
    
    const [imageError, setImageError] = useState(false);
    const imageUrl = getImageUrl(user?.profileImage);


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const stats = dashboard?.stats || {};

    const totalBlogs =
        stats.totalBlogs ?? 0;

    const publishedBlogs =
        stats.publishedBlogs ?? 0;

    const draftBlogs =
        stats.draftBlogs ?? 0;


    /*
    |--------------------------------------------------------------------------
    | Recent Blogs
    |--------------------------------------------------------------------------
    */

    const recentBlogs =
        dashboard?.recentBlogs || [];


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    const handleLogoutConfirm = async () => {

        try {

            setLogoutLoading(true);

            await logout();

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        } finally {

            setLogoutLoading(false);

            setLogoutModalOpen(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="space-y-6">

                <div>

                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white"
                        />

                    ))}

                </div>


                <div className="h-48 animate-pulse rounded-xl border border-gray-200 bg-white" />

            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h2 className="font-semibold text-red-800">
                            Unable to load dashboard
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

                        <RefreshCw className="h-4 w-4" />

                        Try Again

                    </button>

                </div>

            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-6">

            {/* Dashboard Header */}

            <div>

                <h1 className="text-2xl font-semibold text-gray-900">

                    Welcome, {firstName}!

                </h1>

                <p className="mt-1 text-sm text-gray-500">

                    Welcome to your dashboard. Manage your profile,
                    blogs, and account activity from here.

                </p>

            </div>


            {/* User Information */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    {/* Left Side - User Information */}

                    <div className="flex items-center gap-4">

                        {/* Avatar */}

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-teal-500 to-cyan-500 text-xl font-semibold text-white shadow-md">

                            {imageUrl && !imageError ? (
                                <img
                                    src={imageUrl}
                                    alt={fullName}
                                    className="h-full w-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white ring-2 ring-slate-100">
                                    {initials}
                                </div>
                            )}

                        </div>


                        {/* User Details */}

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <h2 className="text-lg font-semibold text-gray-900">
                                    {fullName}
                                </h2>

                                {user?.role && (
                                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium capitalize text-teal-700">
                                        {typeof user.role === "string"
                                            ? user.role.toLowerCase()
                                            : user.role?.name?.toLowerCase() || "user"}
                                    </span>
                                )}

                            </div>


                            <p className="mt-1 text-sm text-gray-500">
                                {user?.email || "No email available"}
                            </p>


                            <p className="mt-1 text-xs text-gray-400">
                                Manage your account and profile
                            </p>

                        </div>

                    </div>


                    {/* Right Side - Logout */}

                    <div className="flex shrink-0">

                        <button
                            type="button"
                            onClick={() => setLogoutModalOpen(true)}
                            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-500 hover:text-white hover:shadow-md"
                        >

                            <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />

                            <span>
                                Logout
                            </span>

                        </button>

                    </div>

                </div>

            </div>




            {/* Statistics */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="My Blogs"
                    value={totalBlogs}
                    icon={FileText}
                />

                <StatCard
                    title="Published"
                    value={publishedBlogs}
                    icon={CheckCircle}
                />

                <StatCard
                    title="Drafts"
                    value={draftBlogs}
                    icon={FileEdit}
                />

            </div>


            {/* Quick Actions */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-900">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Quickly access the areas you use most.
                </p>


                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* Profile */}

                    <Link
                        to="/dashboard/profile"
                        className="group flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:bg-gray-50"
                    >

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-gray-100 p-2">

                                <User className="h-5 w-5 text-gray-600" />

                            </div>


                            <div>

                                <p className="font-medium text-gray-900">
                                    My Profile
                                </p>

                                <p className="text-sm text-gray-500">
                                    View and update your profile
                                </p>

                            </div>

                        </div>


                        <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1" />

                    </Link>


                    {/* My Blogs */}

                    <Link
                        to="/dashboard/blogs"
                        className="group flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:bg-gray-50"
                    >

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-gray-100 p-2">

                                <FileText className="h-5 w-5 text-gray-600" />

                            </div>


                            <div>

                                <p className="font-medium text-gray-900">
                                    My Blogs
                                </p>

                                <p className="text-sm text-gray-500">
                                    Manage your blog posts
                                </p>

                            </div>

                        </div>


                        <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1" />

                    </Link>

                </div>

            </div>


            {/* Recent Blogs */}

            <RecentBlogs
                blogs={recentBlogs}
                title="Recent Blogs"
                description="Your latest blog posts."
                viewAllLink="/dashboard/blogs"
            />


            {/* Logout Confirmation Modal */}

            <LogoutConfirmModal
                isOpen={logoutModalOpen}
                onClose={() =>
                    setLogoutModalOpen(false)
                }
                onConfirm={handleLogoutConfirm}
                loading={logoutLoading}
            />

        </div>
    );
};

export default UserDashboard;
