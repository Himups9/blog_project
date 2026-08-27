// frontend/src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from "../api"
import { toast } from 'react-hot-toast';
import './AdminPanel.css';

const AdminPanel = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is admin
        if (!user?.is_staff) {
            toast.error('Access denied. Admin privileges required.');
            return;
        }
        fetchStats();
    }, [user]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await dashboardService.getAdminStats();
            setStats(data);
        } catch (error) {
            toast.error('Failed to load admin statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!user?.is_staff) {
        return (
            <div className="admin-access-denied">
                <h2>Access Denied</h2>
                <p>You don't have permission to access the admin panel.</p>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <p>Site Management Dashboard</p>
            </div>

            {/* User Statistics */}
            <div className="admin-section">
                <h2>Users</h2>
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.users.total}</div>
                        <div className="admin-stat-label">Total Users</div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.users.active}</div>
                        <div className="admin-stat-label">Active Users</div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.users.new_today}</div>
                        <div className="admin-stat-label">New Today</div>
                    </div>
                </div>
            </div>

            {/* Content Statistics */}
            <div className="admin-section">
                <h2>Content</h2>
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.content.total_posts}</div>
                        <div className="admin-stat-label">Total Posts</div>
                        <div className="admin-stat-sub">
                            {stats.content.published_posts} published
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.content.total_views}</div>
                        <div className="admin-stat-label">Total Views</div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.content.total_comments}</div>
                        <div className="admin-stat-label">Total Comments</div>
                        <div className="admin-stat-sub">
                            {stats.content.pending_comments} pending
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.content.draft_posts}</div>
                        <div className="admin-stat-label">Draft Posts</div>
                        <div className="admin-stat-sub">
                            {stats.content.scheduled_posts} scheduled
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories and Tags */}
            <div className="admin-section">
                <h2>Taxonomies</h2>
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.categories.total}</div>
                        <div className="admin-stat-label">Categories</div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-value">{stats.tags.total}</div>
                        <div className="admin-stat-label">Tags</div>
                    </div>
                </div>
            </div>

            {/* Top Authors */}
            <div className="admin-section">
                <h2>Top Authors</h2>
                <div className="admin-list">
                    {stats.top_authors.map((author, index) => (
                        <div key={index} className="admin-list-item">
                            <span className="list-item-rank">#{index + 1}</span>
                            <span className="list-item-name">{author.name}</span>
                            <span className="list-item-count">{author.post_count} posts</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Distribution */}
            <div className="admin-section">
                <h2>Category Distribution</h2>
                <div className="admin-list">
                    {stats.category_distribution.map((cat) => (
                        <div key={cat.name} className="admin-list-item">
                            <span className="list-item-name">{cat.name}</span>
                            <span className="list-item-count">{cat.post_count} posts</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
