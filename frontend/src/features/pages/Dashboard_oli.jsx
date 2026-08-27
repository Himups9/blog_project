// frontend/src/pages/Dashboard.jsx

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardStats from '../../components/dashboard/DashboardStats';
import MyBlogs from '../../components/dashboard/MyBlogs';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-sidebar">
                <div className="sidebar-user">
                    <div className="user-avatar">
                        {user?.profile_picture ? (
                            <img src={user.profile_picture} alt={user.full_name} />
                        ) : (
                            <span className="avatar-placeholder">
                                {user?.first_name?.[0]}{user?.last_name?.[0]}
                            </span>
                        )}
                    </div>
                    <h3>{user?.full_name}</h3>
                    <p>{user?.email}</p>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-link active">
                        📊 Overview
                    </Link>
                    <Link to="/dashboard/my-blogs" className="nav-link">
                        📝 My Blogs
                    </Link>
                    <Link to="/blog/create" className="nav-link">
                        ✏️ Create Post
                    </Link>
                    <Link to="/profile" className="nav-link">
                        👤 Profile
                    </Link>
                    {user?.is_staff && (
                        <Link to="/admin" className="nav-link">
                            🛡️ Admin Panel
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="nav-link logout-btn"
                    >
                        🚪 Logout
                    </button>
                </nav>
            </div>

            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h3 className="text-2xl font-bold">
                        Hello,{" "}
                        {`${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User"} !
                    </h3>
                </div>

                <Routes>
                    <Route path="/" element={<DashboardStats />} />
                    <Route path="/my-blogs" element={<MyBlogs />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
