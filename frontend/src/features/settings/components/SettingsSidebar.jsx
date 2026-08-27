import { NavLink } from "react-router-dom";
import {
    Settings,
    Globe,
    Building2,
    Phone,
    Mail,
    Share2,
    Palette,
    Shield,
    Database,
    HardDrive,
    Wrench,
    Server,
    History,
} from "lucide-react";

const menuItems = [
    {
        title: "General",
        path: "/dashboard/settings/general",
        icon: Globe,
    },
    {
        title: "Site Information",
        path: "/dashboard/settings/site",
        icon: Building2,
    },
    {
        title: "Contact",
        path: "/dashboard/settings/contact",
        icon: Phone,
    },
    {
        title: "Email (SMTP)",
        path: "/dashboard/settings/email",
        icon: Mail,
    },
    {
        title: "Social Media",
        path: "/dashboard/settings/social",
        icon: Share2,
    },
    {
        title: "Theme",
        path: "/dashboard/settings/theme",
        icon: Palette,
    },
    {
        title: "Security",
        path: "/dashboard/settings/security",
        icon: Shield,
    },
    {
        title: "Backup & Restore",
        path: "/dashboard/settings/backup",
        icon: Database,
    },
    {
        title: "Cache Management",
        path: "/dashboard/settings/cache",
        icon: HardDrive,
    },
    {
        title: "Maintenance Mode",
        path: "/dashboard/settings/maintenance",
        icon: Wrench,
    },
    {
        title: "System Information",
        path: "/dashboard/settings/system",
        icon: Server,
    },
    {
        title: "Activity Logs",
        path: "/dashboard/settings/activity",
        icon: History,
    },
];

const SettingsSidebar = () => {
    return (
        <aside className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm lg:w-72">
            <div className="border-b border-gray-200 p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                        <Settings size={22} />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Settings
                        </h2>

                        <p className="text-sm text-gray-500">
                            Website Configuration
                        </p>
                    </div>
                </div>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        [
                                            "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                                            isActive
                                                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                                        ].join(" ")
                                    }
                                >
                                    <Icon size={20} />

                                    <span className="text-sm font-medium">
                                        {item.title}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default SettingsSidebar;