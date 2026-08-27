// frontend/src/components/blog/BlogList.jsx

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import BlogCard from "../../components/BlogCard";
import { useBlog } from "../../hooks/useBlog";

const BlogList = ({ filters = {} }) => {
    const { blogs, loading, pagination, fetchBlogs } = useBlog();
    const [currentFilters, setCurrentFilters] = useState({
        page: 1,
        pageSize: 9,
        ...filters,
    });

    useEffect(() => {
        fetchBlogs(currentFilters);
    }, [currentFilters, fetchBlogs]);

    const handlePageChange = ({ selected }) => {
        setCurrentFilters({
            ...currentFilters,
            page: selected + 1,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && blogs.length === 0) {
        return (
            <div className="blog-list-loading">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="blog-card-skeleton">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!loading && blogs.length === 0) {
        return (
            <div className="blog-list-empty">
                <h3>No blogs found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div className="blog-list-container">
            <div className="blog-list-grid">
                {blogs.map((blog, index) => (
                    <BlogCard 
                        key={blog.id} 
                        blog={blog}
                        isFeatured={index === 0 && currentFilters.page === 1}
                    />
                ))}
            </div>

            {pagination.count > pagination.pageSize && (
                <div className="blog-list-pagination">
                    <ReactPaginate
                        previousLabel={'← Previous'}
                        nextLabel={'Next →'}
                        pageCount={Math.ceil(pagination.count / pagination.pageSize)}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        forcePage={currentFilters.page - 1}
                    />
                </div>
            )}
        </div>
    );
};

export default BlogList;
