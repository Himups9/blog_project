import { useState } from "react";
import { Outlet } from "react-router-dom";

//import DashboardHeader from "../components/dashboard/DashboardHeader";
//import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <DashboardHeader
                setSidebarOpen={setSidebarOpen}
            />

            <div className="mx-auto flex max-w-7xl">

                <DashboardSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Dashboard;