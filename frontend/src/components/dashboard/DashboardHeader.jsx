// src/components/dashboard/DashboardHeader.jsx

import { useAuth } from "../../context/AuthContext";
import { Menu } from "lucide-react";

const DashboardHeader = ({ setSidebarOpen }) => {
    const { user } = useAuth();

    const fullName =
        `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

    const initials = `${user?.first_name?.charAt(0) || ""}${
        user?.last_name?.charAt(0) || ""
    }`.toUpperCase();
    
    const role = user?.is_superuser
        ? "Super Admin"
        : user?.is_staff
        ? "Administrator"
        : "Author";

    return (
        <header className="overflow-hidden w-full rounded-t-3xl bg-linear-to-r from-[#2b6d94] via-[#016398] to-[#1f73a4] shadow-xl">
            

            <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
                <button
                    onClick={() => {
                            setSidebarOpen?.(true)}}
                    className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Left Side */}

                <div className="flex items-center gap-6">

                    {user?.profile_picture ? (
                        <img
                            src={user.profile_picture}
                            alt={fullName || "User"}
                            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-linear-to-r from-teal-600 to-cyan-600 text-3xl font-bold text-white shadow-lg">
                            {initials}
                        </div>
                    )}

                    <div>

                        <h1 className="mt-1 text-3xl font-bold text-white">
                            {fullName || "User"}
                        </h1>

                        <p className="mt-2 text-teal-100">
                            {user?.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-white/20 px-4 py-1 text-sm text-white">
                                {role}
                            </span>

                            {user?.is_verified && (
                                <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm text-white">
                                    Verified
                                </span>
                            )}

                            {user?.is_active && (
                                <span className="rounded-full bg-green-600 px-4 py-1 text-sm text-white">
                                    Active
                                </span>
                            )}

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="flex flex-wrap gap-4">

                    

                </div>

            </div>

        </header>
    );
};

export default DashboardHeader;