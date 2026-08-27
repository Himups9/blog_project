// frontend/src/components/dashboard/DashboardStats.jsx

import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import './DashboardStats.css';
import UserStatisticsCards from './UserStatisticsCards';

// Stat Card Component
const StatCard = ({ icon, label, value, color, subtitle }) => (
    <div className={`stat-card ${color}`}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <h3>{value}</h3>
            <p>{label}</p>
            {subtitle && <span className="stat-subtitle">{subtitle}</span>}
        </div>
    </div>
);

const DashboardStats = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await dashboardService.getDashboardStats();
            setStats(data);

        } catch (error) {
            
            toast.error('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-stats-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow">
                <h3 className="text-lg font-semibold">
                    No dashboard data available.
                </h3>
            </div>
        );
    }

    const { overview, recent_activity, top_posts, recent_comments, category_distribution } = stats;

    const percentage =
        overview.published_posts > 0
            ? (cat.post_count / overview.published_posts) * 100
            : 0;

    return (
        <div className="dashboard-stats">
            {/* Overview Cards */}
            <div className="stats-grid">
                <StatCard 
                    icon="📝"
                    label="Total Posts"
                    value={overview.total_posts}
                    color="primary"
                    subtitle={`${overview.published_posts} published`}
                />
                <StatCard 
                    icon="👁️"
                    label="Total Views"
                    value={overview.total_views}
                    color="success"
                />
                <StatCard 
                    icon="❤️"
                    label="Total Likes"
                    value={overview.total_likes}
                    color="danger"
                />
                <StatCard 
                    icon="💬"
                    label="Total Comments"
                    value={overview.total_comments}
                    color="warning"
                />
            </div>

            {/* Quick Stats */}
            <div className="stats-quick">
                <div className="quick-stat">
                    <span className="quick-label">Drafts</span>
                    <span className="quick-value">{overview.draft_posts}</span>
                </div>
                <div className="quick-stat">
                    <span className="quick-label">Scheduled</span>
                    <span className="quick-value">{overview.scheduled_posts}</span>
                </div>
                <div className="quick-stat">
                    <span className="quick-label">Posts (30d)</span>
                    <span className="quick-value">{recent_activity.posts_last_30_days}</span>
                </div>
                <div className="quick-stat">
                    <span className="quick-label">Views (30d)</span>
                    <span className="quick-value">{recent_activity.views_last_30_days}</span>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="dashboard-grid">
                {/* Top Posts */}
                <div className="dashboard-card">
                    <h3>Top Performing Posts</h3>
                    <div className="top-posts-list">
                        {top_posts.length === 0 ? (
                            <p className="empty-state">No published posts yet</p>
                        ) : (
                            top_posts.map((post) => (
                                <div key={post.id} className="top-post-item">
                                    <div className="top-post-info">
                                        <span className="top-post-title">{post.title}</span>
                                        <span className="top-post-stats">
                                            👁️ {post.views_count} · ❤️ {post.like_count} · 💬 {post.comment_count}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Comments */}
                <div className="dashboard-card">
                    <h3>Recent Comments</h3>
                    <div className="recent-comments-list">
                        {recent_comments.length === 0 ? (
                            <p className="empty-state">No comments yet</p>
                        ) : (
                            recent_comments.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-author">
                                        <strong>{comment.author?.full_name || 'Anonymous'}</strong>
                                        <span className="comment-date">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="comment-text">{comment.content}</p>
                                    <span className="comment-blog">
                                        on {comment.blog?.title || 'Unknown post'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Category Distribution */}
            {category_distribution.length > 0 && (
                <div className="dashboard-card">
                    <h3>Category Distribution</h3>
                    <div className="category-distribution">
                        {category_distribution.map((cat) => {
                            const percentage =
                                overview.published_posts > 0
                                    ? (cat.post_count / overview.published_posts) * 100
                                    : 0;

                            return (
                                <div key={cat.name} className="category-bar">
                                    <span className="category-name">{cat.name}</span>

                                    <div className="category-bar-track">
                                        <div
                                            className="category-bar-fill"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <span className="category-count">{cat.post_count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardStats;
