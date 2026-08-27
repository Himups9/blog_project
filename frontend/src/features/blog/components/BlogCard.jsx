// frontend/src/components/blog/BlogCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './BlogCard.css';

const BlogCard = ({ blog, isFeatured = false }) => {
    const {
        id,
        title,
        slug,
        excerpt,
        featured_image,
        author_name,
        category_name,
        tags_list,
        views_count,
        like_count,
        comment_count,
        reading_time,
        created_at,
        published_at,
    } = blog;

    const formattedDate = published_at 
        ? formatDistanceToNow(new Date(published_at), { addSuffix: true })
        : formatDistanceToNow(new Date(created_at), { addSuffix: true });

    return (
        <article className={`blog-card ${isFeatured ? 'featured' : ''}`}>
            {featured_image && (
                <Link to={`/blog/${slug}`} className="blog-card-image">
                    <img 
                        src={featured_image} 
                        alt={title}
                        loading="lazy"
                    />
                </Link>
            )}

            <div className="blog-card-content">
                {category_name && (
                    <Link 
                        to={`/category/${category_name.toLowerCase()}`} 
                        className="blog-card-category"
                    >
                        {category_name}
                    </Link>
                )}

                <Link to={`/blog/${slug}`} className="blog-card-title">
                    <h2>{title}</h2>
                </Link>

                <p className="blog-card-excerpt">{excerpt}</p>

                {tags_list && tags_list.length > 0 && (
                    <div className="blog-card-tags">
                        {tags_list.slice(0, 3).map((tag, index) => (
                            <Link 
                                key={index}
                                to={`/tag/${tag.toLowerCase()}`}
                                className="blog-card-tag"
                            >
                                #{tag}
                            </Link>
                        ))}
                        {tags_list.length > 3 && (
                            <span className="blog-card-tag-more">
                                +{tags_list.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="blog-card-footer">
                    <div className="blog-card-author">
                        <span className="author-name">{author_name}</span>
                        <span className="blog-card-date">{formattedDate}</span>
                    </div>

                    <div className="blog-card-stats">
                        <span className="stat">
                            <span className="stat-icon">📖</span>
                            {reading_time} min
                        </span>
                        <span className="stat">
                            <span className="stat-icon">👁️</span>
                            {views_count}
                        </span>
                        <span className="stat">
                            <span className="stat-icon">❤️</span>
                            {like_count}
                        </span>
                        <span className="stat">
                            <span className="stat-icon">💬</span>
                            {comment_count}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
