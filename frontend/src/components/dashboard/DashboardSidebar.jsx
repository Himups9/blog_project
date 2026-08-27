// src/components/dashboard/DashboardSidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    SquarePen,
    FileClock,
    MessageCircle,
    User,
    Settings,
    KeyRound,
    LogOut,
    X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const DashboardSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }

        await logout();
        navigate("/", { replace: true });
    };

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
            end: true,
        },
        {
            title: "My Blogs",
            icon: FileText,
            path: "/dashboard/blogs",
        },
        {
            title: "Create Blog",
            icon: SquarePen,
            path: "/dashboard/blogs/create",
        },
        {
            title: "Draft Blogs",
            icon: FileClock,
            path: "/dashboard/drafts",
        },
        {
            title: "Comments",
            icon: MessageCircle,
            path: "/dashboard/comments",
        },
        {
            title: "Profile",
            icon: User,
            path: "/dashboard/profile",
        },
        {
            title: "Settings",
            icon: Settings,
            path: "/dashboard/settings",
        },
        {
            title: "Change Password",
            icon: KeyRound,
            path: "/dashboard/change-password",
        },
    ];

    return (
        <aside
            className={`
                fixed inset-y-0 left-0
                flex h-screen w-72 flex-col overflow-hidden
                bg-white shadow-2xl
                transition-transform duration-300 ease-in-out
                lg:static lg:translate-x-0
                lg:border-r lg:border-slate-200
                lg:shadow-none
                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
            `}
        >
            
            {/* Sidebar */}

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 scrollbar-thin">
                    <nav className="space-y-2 px-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.title}
                                    to={item.path}
                                    end={item.end}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            setSidebarOpen(false);
                                        }
                                    }}
                                        className={({ isActive }) => 
                                            `
                                        flex items-center gap-3
                                        rounded-xl px-4 py-3
                                        font-medium
                                        transition-all duration-300 ease-in-out
                                        ${
                                            isActive
                                                ? "bg-linear-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-[1.02]"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-teal-700"
                                        }`}>
                                    
                                    <Icon size={20} />
                                    <span>{item.title}</span>  
                                </NavLink>  
                            );  
                        })}   
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-slate-200 p-5">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-red-500 to-red-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
        </aside>
    );
};

export default DashboardSidebar;
