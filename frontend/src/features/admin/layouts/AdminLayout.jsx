import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content */}
            <div className="flex flex-1 flex-col">

                <AdminNavbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;