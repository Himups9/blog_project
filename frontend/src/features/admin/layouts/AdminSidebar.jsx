import {
    LayoutDashboard,
    Users,
    Newspaper,
    FolderOpen,
    Briefcase,
    Image,
    Mail,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: Users,
    },
    {
        name: "Blogs",
        path: "/admin/blogs",
        icon: Newspaper,
    },
    {
        name: "Categories",
        path: "/admin/categories",
        icon: FolderOpen,
    },
    {
        name: "Services",
        path: "/admin/services",
        icon: Briefcase,
    },
    {
        name: "Gallery",
        path: "/admin/gallery",
        icon: Image,
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: Mail,
    },
    {
        name: "Settings",
        path: "/admin/settings",
        icon: Settings,
    },
];

const AdminSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {
    const { logout } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                fixed lg:static z-50
                h-screen w-72
                bg-slate-900
                text-white
                transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
            >
                <div className="flex h-16 items-center justify-between border-b border-slate-700 px-6">

                    <h1 className="text-xl font-bold">
                        Admin Panel
                    </h1>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X size={22} />
                    </button>

                </div>

                <nav className="mt-6 space-y-2 px-4">

                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition
                                    ${
                                        isActive
                                            ? "bg-cyan-600"
                                            : "hover:bg-slate-800"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {item.name}
                            </NavLink>
                        );
                    })}

                </nav>

                <div className="absolute bottom-5 w-full px-4">

                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>

                </div>

            </aside>
        </>
    );
}

export default AdminSidebar;