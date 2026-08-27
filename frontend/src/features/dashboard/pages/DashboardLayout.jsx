import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    );
};

export default DashboardLayout;