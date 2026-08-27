// frontend/src/components/dashboard/MyBlogs.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../../hooks/useBlog';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import './MyBlogs.css';

const MyBlogs = () => {
    const navigate = useNavigate();
    const { blogs, loading, fetchBlogs, deleteBlog } = useBlog();
    const [selectedPosts, setSelectedPosts] = useState([]);

    useEffect(() => {
        // Fetch user's blogs
        fetchBlogs({ my_posts: true });
    }, []);

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteBlog(id);
                // Refresh list
                fetchBlogs({ my_posts: true });
            } catch (error) {
                toast.error('Failed to delete post');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedPosts.length === 0) {
            toast.error('No posts selected');
            return;
        }
        
        if (window.confirm(`Delete ${selectedPosts.length} posts?`)) {
            try {
                await Promise.all(selectedPosts.map(id => deleteBlog(id)));
                setSelectedPosts([]);
                fetchBlogs({ my_posts: true });
            } catch (error) {
                toast.error('Failed to delete selected posts');
            }
        }
    };

    const toggleSelect = (id) => {
        setSelectedPosts(prev => 
            prev.includes(id) 
                ? prev.filter(postId => postId !== id)
                : [...prev, id]
        );
    };

    const getStatusBadge = (status) => {
        const badges = {
            published: { class: 'badge-success', label: 'Published' },
            draft: { class: 'badge-warning', label: 'Draft' },
            scheduled: { class: 'badge-info', label: 'Scheduled' },
        };
        return badges[status] || { class: 'badge-secondary', label: status };
    };

    if (loading && blogs.length === 0) {
        return (
            <div className="my-blogs-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="my-blogs">
            <div className="my-blogs-header">
                <h2>My Blog Posts</h2>
                <div className="my-blogs-actions">
                    {selectedPosts.length > 0 && (
                        <button 
                            onClick={handleBulkDelete}
                            className="btn-danger"
                        >
                            Delete Selected ({selectedPosts.length})
                        </button>
                    )}
                    <Link to="/blog/create" className="btn-primary">
                        + Create New Post
                    </Link>
                </div>
            </div>

            {blogs.length === 0 ? (
                <div className="empty-state">
                    <h3>No blog posts yet</h3>
                    <p>Start writing your first blog post!</p>
                    <Link to="/blog/create" className="btn-primary">
                        Create Your First Post
                    </Link>
                </div>
            ) : (
                <div className="my-blogs-table-wrapper">
                    <table className="my-blogs-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedPosts.length === blogs.length}
                                        onChange={() => {
                                            if (selectedPosts.length === blogs.length) {
                                                setSelectedPosts([]);
                                            } else {
                                                setSelectedPosts(blogs.map(b => b.id));
                                            }
                                        }}
                                    />
                                </th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedPosts.includes(blog.id)}
                                            onChange={() => toggleSelect(blog.id)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/blog/${blog.slug}`} className="post-title">
                                            {blog.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(blog.status).class}`}>
                                            {getStatusBadge(blog.status).label}
                                        </span>
                                    </td>
                                    <td>{blog.views_count}</td>
                                    <td>{blog.like_count}</td>
                                    <td>{blog.comment_count}</td>
                                    <td>
                                        {formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link 
                                                to={`/blog/edit/${blog.id}`} 
                                                className="btn-edit"
                                                title="Edit"
                                            >
                                                ✏️
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.id, blog.title)}
                                                className="btn-delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                            <Link 
                                                to={`/blogs/${blog.slug}`}
                                                className="btn-view"
                                                title="View"
                                            >
                                                👁️
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBlogs;
