// frontend/src/components/blog/BlogDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { blogService, commentService } from '../../services/api';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import './BlogDetail.css';

const BlogDetail = () => {
    const { slug } = useParams();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const data = await blogService.getBlogBySlug(slug);
            setBlog(data);
            setIsLiked(data.is_liked || false);
            setIsBookmarked(data.is_bookmarked || false);
            setLikeCount(data.like_count || 0);
            
            // Fetch comments
            const commentsData = await commentService.getComments(data.id);
            setComments(commentsData.results || []);
        } catch (error) {
            toast.error('Blog not found');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to like this post');
            return;
        }
        
        try {
            const response = await blogService.likeBlog(blog.id);
            setIsLiked(response.liked);
            setLikeCount(response.like_count);
        } catch (error) {
            toast.error('Failed to like post');
        }
    };

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to bookmark this post');
            return;
        }
        
        try {
            const response = await blogService.bookmarkBlog(blog.id);
            setIsBookmarked(response.bookmarked);
            toast.success(response.bookmarked ? 'Bookmarked!' : 'Removed from bookmarks');
        } catch (error) {
            toast.error('Failed to bookmark post');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            toast.error('Please login to comment');
            return;
        }
        
        if (!newComment.trim()) {
            toast.error('Please enter a comment');
            return;
        }
        
        try {
            const data = {
                blog: blog.id,
                content: newComment,
                author_id: user.id,
                parent: replyTo || null,
            };
            
            await commentService.createComment(data);
            toast.success('Comment added!');
            setNewComment('');
            setReplyTo(null);
            // Refresh comments
            fetchBlog();
        } catch (error) {
            toast.error('Failed to add comment');
        }
    };

    if (loading) {
        return (
            <div className="blog-detail-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <article className="blog-detail">
            {/* Hero Section */}
            <div className="blog-hero">
                {blog.featured_image && (
                    <img 
                        src={blog.featured_image} 
                        alt={blog.title}
                        className="blog-hero-image"
                    />
                )}
                <div className="blog-hero-content">
                    <h1>{blog.title}</h1>
                    
                    <div className="blog-meta">
                        <span className="meta-author">
                            By {blog.author?.full_name || 'Anonymous'}
                        </span>
                        <span className="meta-date">
                            {formatDistanceToNow(new Date(blog.published_at || blog.created_at), { addSuffix: true })}
                        </span>
                        <span className="meta-reading">
                            📖 {blog.reading_time} min read
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="blog-content-wrapper">
                <div className="blog-content">
                    <div 
                        className="blog-body"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="blog-tags">
                            <h4>Tags:</h4>
                            {blog.tags.map((tag) => (
                                <Link 
                                    key={tag.id} 
                                    to={`/tag/${tag.slug}`}
                                    className="tag-link"
                                >
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="blog-actions">
                        <button 
                            onClick={handleLike}
                            className={`action-btn ${isLiked ? 'liked' : ''}`}
                        >
                            <span>{isLiked ? '❤️' : '🤍'}</span>
                            <span>{likeCount}</span>
                        </button>
                        
                        <button 
                            onClick={handleBookmark}
                            className={`action-btn ${isBookmarked ? 'bookmarked' : ''}`}
                        >
                            <span>{isBookmarked ? '📌' : '📑'}</span>
                            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                        </button>
                        
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Link copied!');
                            }}
                            className="action-btn"
                        >
                            <span>📋</span>
                            <span>Share</span>
                        </button>
                    </div>

                    {/* Comments */}
                    <div className="blog-comments">
                        <h3>Comments ({comments.length})</h3>
                        
                        {isAuthenticated ? (
                            <form onSubmit={handleCommentSubmit} className="comment-form">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={replyTo ? 'Write a reply...' : 'Write a comment...'}
                                    rows={4}
                                    className="comment-input"
                                />
                                <div className="comment-form-actions">
                                    {replyTo && (
                                        <button 
                                            type="button"
                                            onClick={() => setReplyTo(null)}
                                            className="cancel-reply-btn"
                                        >
                                            Cancel Reply
                                        </button>
                                    )}
                                    <button type="submit" className="submit-comment-btn">
                                        {replyTo ? 'Reply' : 'Comment'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="login-to-comment">
                                <Link to="/login">Login</Link> to leave a comment
                            </p>
                        )}

                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <div className="comment-header">
                                        <strong>{comment.author?.full_name || 'Anonymous'}</strong>
                                        <span className="comment-date">
                                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="comment-content">{comment.content}</p>
                                    
                                    <div className="comment-actions">
                                        <button 
                                            onClick={() => setReplyTo(comment.id)}
                                            className="reply-btn"
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="comment-replies">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="comment reply">
                                                    <div className="comment-header">
                                                        <strong>{reply.author?.full_name || 'Anonymous'}</strong>
                                                        <span className="comment-date">
                                                            {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                    <p className="comment-content">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
