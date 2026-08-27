import {
    Menu,
    Bell,
} from "lucide-react";

import { useAuth } from "../../auth/context/AuthContext";

export default function AdminNavbar({
    setSidebarOpen,
}) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">

            <div className="flex items-center gap-4">

                <button
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={24} />
                </button>

                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>

            </div>

            <div className="flex items-center gap-5">

                <button className="relative">
                    <Bell size={22} />

                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="text-right">

                    <p className="font-semibold">
                        {user?.first_name} {user?.last_name}
                    </p>

                    <p className="text-sm text-gray-500">
                        Administrator
                    </p>

                </div>

                <img
                    src={
                        user?.profile_picture ||
                        "https://ui-avatars.com/api/?name=Admin"
                    }
                    alt="Profile"
                    className="h-11 w-11 rounded-full object-cover"
                />

            </div>

        </header>
    );
}