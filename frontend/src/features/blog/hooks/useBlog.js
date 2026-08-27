import { useState, useCallback } from "react";

import blogService from "../services/blogService";

const useBlog = () => {

    /* ===========================================================
       State
    =========================================================== */

    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState(null);

    const [latestBlogs, setLatestBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({

        count: 0,
        next: null,
        previous: null,

    });

    const clearError = () => {

        setError(null);

    };

    const handleError = (err, fallback) => {

        const message =
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            fallback;

        setError(message);

        throw err;

    };

    /* ===========================================================
       Fetch Blogs
    =========================================================== */

    const fetchBlogs = useCallback(async (params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.getBlogs(params);

            const results = data.data ?? data.results ?? data;

            setBlogs(results);

            if (data.pagination) {

                const { page, limit, total, totalPages } = data.pagination;

                setPagination({

                    count: total,
                    next: page < totalPages ? page + 1 : null,
                    previous: page > 1 ? page - 1 : null,
                    page,
                    pageSize: limit,

                });

            } else if (data.count !== undefined) {

                setPagination({
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                });

            }

            return data;

        } catch (err) {

            handleError(err, "Unable to load blogs.");

        } finally {

            setLoading(false);

        }

    }, []);

    /* ===========================================================
       Fetch Single Blog
    =========================================================== */

    const fetchBlog = useCallback(async (id) => {

        setLoading(true);

        clearError();

        try {

            const response =
                await blogService.getBlog(id);

            const blogData =
                response.data?.data ??
                response.data ??
                response;

            setBlog(blogData);

            return blogData;

        } catch (err) {

            handleError(err, "Unable to load blog.");

        } finally {

            setLoading(false);

        }

    }, []);

    /* ===========================================================
       Fetch Blog By Slug
    =========================================================== */

    const fetchBlogBySlug = useCallback(async (slug) => {

        setLoading(true);

        clearError();

        try {

            const response =
                await blogService.getBlogBySlug(slug);

            const blogData =
                response.data?.data ??
                response.data ??
                response;

            setBlog(blogData);

            return blogData;

        } catch (err) {

            handleError(err, "Unable to load blog.");

        } finally {

            setLoading(false);

        }

    }, []);

    /* ===========================================================
       Search Blogs
    =========================================================== */

    const searchBlogs = async (query, params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.searchBlogs(query, params);

            setBlogs(data.data ?? data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to search blogs.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Category Blogs
    =========================================================== */

    const fetchCategoryBlogs = async (slug, params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.getCategoryBlogs(slug, params);

            setBlogs(data.data ?? data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load category blogs.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Tag Blogs
    =========================================================== */

    const fetchTagBlogs = async (slug, params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.getTagBlogs(slug, params);

            setBlogs(data.data ?? data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load tag blogs.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Related Blogs
    =========================================================== */

    const fetchRelatedBlogs = async (id) => {

        try {

            const { data } = await blogService.getRelatedBlogs(id);

            setRelatedBlogs(data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load related blogs.");

        }

    };

    /* ===========================================================
       Latest Blogs
    =========================================================== */

    const fetchLatestBlogs = async (limit = 5) => {

        try {

            const { data } = await blogService.getLatestBlogs(limit);

            setLatestBlogs(data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load latest blogs.");

        }

    };

    /* ===========================================================
       Popular Blogs
    =========================================================== */

    const fetchPopularBlogs = async (limit = 5) => {

        try {

            const { data } = await blogService.getPopularBlogs(limit);

            setPopularBlogs(data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load popular blogs.");

        }

    };

    /* ===========================================================
       Featured Blogs
    =========================================================== */

    const fetchFeaturedBlogs = async (limit = 10) => {

        try {

            const { data } = await blogService.getFeaturedBlogs(limit);

            setFeaturedBlogs(data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load featured blogs.");

        }

    };
        /* ===========================================================
       My Blogs
    =========================================================== */

    const fetchMyBlogs = async (params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.getMyBlogs(params);

            setBlogs(data.data ?? data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load your blogs.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Create Blog
    =========================================================== */

    const createBlog = async (formData) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.createBlog(formData);

            await fetchMyBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to create blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Update Blog
    =========================================================== */

    const updateBlog = async (id, formData) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.updateBlog(id, formData);

            await fetchMyBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to update blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Delete Blog
    =========================================================== */

    const deleteBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.deleteBlog(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to delete blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Duplicate Blog
    =========================================================== */

    const duplicateBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.duplicateBlog(id);

            await fetchMyBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to duplicate blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Draft Blogs
    =========================================================== */

    const fetchDraftBlogs = async (params = {}) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.getDraftBlogs(params);

            setBlogs(data.data ?? data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load draft blogs.");

        } finally {

            setLoading(false);

        }

    };

    const saveDraft = async (formData) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.saveDraft(formData);

            await fetchDraftBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to save draft.");

        } finally {

            setLoading(false);

        }

    };

    const updateDraft = async (id, formData) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.updateDraft(id, formData);

            await fetchDraftBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to update draft.");

        } finally {

            setLoading(false);

        }

    };

    const deleteDraft = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.deleteDraft(id);

            await fetchDraftBlogs();

        } catch (err) {

            handleError(err, "Unable to delete draft.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Publish APIs
    =========================================================== */

    const publishBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.publishBlog(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to publish blog.");

        } finally {

            setLoading(false);

        }

    };

    const unpublishBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.unpublishBlog(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to unpublish blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Schedule APIs
    =========================================================== */

    const scheduleBlog = async (id, publishDate) => {

        setLoading(true);

        clearError();

        try {

            const { data } = await blogService.scheduleBlog(id, publishDate);

            await fetchMyBlogs();

            return data;

        } catch (err) {

            handleError(err, "Unable to schedule blog.");

        } finally {

            setLoading(false);

        }

    };

    const cancelSchedule = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.cancelSchedule(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to cancel schedule.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Featured APIs
    =========================================================== */

    const featureBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.featureBlog(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to feature blog.");

        } finally {

            setLoading(false);

        }

    };

    const unfeatureBlog = async (id) => {

        setLoading(true);

        clearError();

        try {

            await blogService.unfeatureBlog(id);

            await fetchMyBlogs();

        } catch (err) {

            handleError(err, "Unable to remove featured status.");

        } finally {

            setLoading(false);

        }

    };
        /* ===========================================================
       Pending Review APIs
    =========================================================== */

    const fetchPendingBlogs = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getPendingBlogs(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load pending blogs.");

        } finally {

            setLoading(false);

        }

    };

    const approveBlog = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.approveBlog(id);

            await fetchPendingBlogs();

        } catch (err) {

            handleError(err, "Unable to approve blog.");

        } finally {

            setLoading(false);

        }

    };

    const rejectBlog = async (id, reason = "") => {

        setLoading(true);
        clearError();

        try {

            await blogService.rejectBlog(id, reason);

            await fetchPendingBlogs();

        } catch (err) {

            handleError(err, "Unable to reject blog.");

        } finally {

            setLoading(false);

        }

    };

    const returnToDraft = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.returnToDraft(id);

            await fetchPendingBlogs();

        } catch (err) {

            handleError(err, "Unable to return blog to draft.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Archived Blogs
    =========================================================== */

    const fetchArchivedBlogs = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getArchivedBlogs(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load archived blogs.");

        } finally {

            setLoading(false);

        }

    };

    const archiveBlog = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.archiveBlog(id);

            await fetchArchivedBlogs();

        } catch (err) {

            handleError(err, "Unable to archive blog.");

        } finally {

            setLoading(false);

        }

    };

    const restoreArchivedBlog = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.restoreArchivedBlog(id);

            await fetchArchivedBlogs();

        } catch (err) {

            handleError(err, "Unable to restore archived blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Deleted Blogs
    =========================================================== */

    const fetchDeletedBlogs = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getDeletedBlogs(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load deleted blogs.");

        } finally {

            setLoading(false);

        }

    };

    const restoreDeletedBlog = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.restoreDeletedBlog(id);

            await fetchDeletedBlogs();

        } catch (err) {

            handleError(err, "Unable to restore deleted blog.");

        } finally {

            setLoading(false);

        }

    };

    const permanentlyDeleteBlog = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.permanentlyDeleteBlog(id);

            await fetchDeletedBlogs();

        } catch (err) {

            handleError(err, "Unable to permanently delete blog.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Recycle Bin
    =========================================================== */

    const fetchRecycleBin = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getRecycleBin(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load recycle bin.");

        } finally {

            setLoading(false);

        }

    };

    const restoreAllBlogs = async () => {

        setLoading(true);
        clearError();

        try {

            await blogService.restoreAllBlogs();

            await fetchRecycleBin();

        } catch (err) {

            handleError(err, "Unable to restore blogs.");

        } finally {

            setLoading(false);

        }

    };

    const emptyRecycleBin = async () => {

        setLoading(true);
        clearError();

        try {

            await blogService.emptyRecycleBin();

            await fetchRecycleBin();

        } catch (err) {

            handleError(err, "Unable to empty recycle bin.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Reported Blogs
    =========================================================== */

    const fetchReportedBlogs = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getReportedBlogs(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load reported blogs.");

        } finally {

            setLoading(false);

        }

    };

    const dismissReport = async (id) => {

        setLoading(true);
        clearError();

        try {

            await blogService.dismissReport(id);

            await fetchReportedBlogs();

        } catch (err) {

            handleError(err, "Unable to dismiss report.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Admin Blogs
    =========================================================== */

    const fetchAdminBlogs = async (params = {}) => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getAdminBlogs(params);

            setBlogs(data.results ?? data);

            return data;

        } catch (err) {

            handleError(err, "Unable to load admin blogs.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Statistics
    =========================================================== */

    const fetchBlogStatistics = async () => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getBlogStatistics();

            return data;

        } catch (err) {

            handleError(err, "Unable to load statistics.");

        } finally {

            setLoading(false);

        }

    };

    /* ===========================================================
       Analytics
    =========================================================== */

    const fetchBlogAnalytics = async () => {

        setLoading(true);
        clearError();

        try {

            const { data } = await blogService.getBlogAnalytics();

            return data;

        } catch (err) {

            handleError(err, "Unable to load analytics.");

        } finally {

            setLoading(false);

        }

    };

    return {
        blogs,
        blog,
        latestBlogs,
        popularBlogs,
        featuredBlogs,
        relatedBlogs,
        loading,
        error,
        pagination,
        fetchBlogs,
        fetchBlog,
        fetchBlogBySlug,
        searchBlogs,
        fetchCategoryBlogs,
        fetchTagBlogs,
        fetchRelatedBlogs,
        fetchLatestBlogs,
        fetchPopularBlogs,
        fetchFeaturedBlogs,
        fetchMyBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        duplicateBlog,
        fetchDraftBlogs,
        saveDraft,
        updateDraft,
        deleteDraft,
        publishBlog,
        unpublishBlog,
        scheduleBlog,
        cancelSchedule,
        featureBlog,
        unfeatureBlog,
        fetchPendingBlogs,
        approveBlog,
        rejectBlog,
        returnToDraft,
        fetchArchivedBlogs,
        archiveBlog,
        restoreArchivedBlog,
        fetchDeletedBlogs,
        restoreDeletedBlog,
        permanentlyDeleteBlog,
        fetchRecycleBin,
        restoreAllBlogs,
        emptyRecycleBin,
        fetchReportedBlogs,
        dismissReport,
        fetchAdminBlogs,
        fetchBlogStatistics,
        fetchBlogAnalytics,
    };
}

export default useBlog;
