import api from "../../api/axios";

const BASE_URL = "/blogs";

/* ==========================================================================
   Public Blog APIs
   ========================================================================== */

/**
 * Get all published blogs
 */
const getBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/`, {
        params,
    });
};

/**
 * Get single blog by ID
 */
const getBlog = (id) => {
    return api.get(`${BASE_URL}/id/${id}`);
};

/**
 * Get single blog by slug
 */
const getBlogBySlug = (slug) => {
    return api.get(`${BASE_URL}/slug/${slug}/`);
};

/**
 * Search blogs
 */
const searchBlogs = (query, params = {}) => {
    return api.get(`${BASE_URL}/search/`, {
        params: {
            q: query,
            ...params,
        },
    });
};

/**
 * Get blogs by category
 */
const getCategoryBlogs = (slug, params = {}) => {
    return api.get(`${BASE_URL}/category/${slug}/`, {
        params,
    });
};

/**
 * Get blogs by tag
 */
const getTagBlogs = (slug, params = {}) => {
    return api.get(`${BASE_URL}/tag/${slug}/`, {
        params,
    });
};

/**
 * Get related blogs
 */
const getRelatedBlogs = (id) => {
    return api.get(`${BASE_URL}/${id}/related/`);
};

/**
 * Get latest blogs
 */
const getLatestBlogs = (limit = 5) => {
    return api.get(`${BASE_URL}/latest/`, {
        params: {
            limit,
        },
    });
};

/**
 * Get popular blogs
 */
const getPopularBlogs = (limit = 5) => {
    return api.get(`${BASE_URL}/popular/`, {
        params: {
            limit,
        },
    });
};

/**
 * Get featured blogs
 */
const getFeaturedBlogs = (limit = 10) => {
    return api.get(`${BASE_URL}/featured/`, {
        params: {
            limit,
        },
    });
};

/* ==========================================================================
   User Blog APIs
   ========================================================================== */

/**
 * Current user's blogs
 */
const getMyBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/my`, {
        params,
    });
};

/**
 * Blog details for owner
 */
const getMyBlog = (id) => {
    return api.get(`${BASE_URL}/my-blogs/${id}/`);
};

/**
 * Upload multiple images for inline blog content.
 */
const uploadInlineImages = (files = []) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    return api.post(`${BASE_URL}/inline-images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

/**
 * Create blog
 */
const createBlog = (data) => {
    return api.post(
        `${BASE_URL}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Update own blog
 */
const updateBlog = (id, data) => {
    return api.put(
        `${BASE_URL}/${id}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Delete own blog
 */
const deleteBlog = (id) => {
    return api.delete(`${BASE_URL}/${id}`);
};

/**
 * Duplicate blog
 */
const duplicateBlog = (id) => {
    return api.post(`${BASE_URL}/${id}/duplicate/`);
};

/* ==========================================================================
   Draft APIs
   ========================================================================== */

/**
 * Get drafts
 */
const getDraftBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/drafts/`, {
        params,
    });
};

/**
 * Save draft
 */
const saveDraft = (data) => {
    return api.post(
        `${BASE_URL}/draft/`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Update draft
 */
const updateDraft = (id, data) => {
    return api.put(
        `${BASE_URL}/${id}/draft/`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Delete draft
 */
const deleteDraft = (id) => {
    return api.delete(`${BASE_URL}/${id}/draft/`);
};

/* ==========================================================================
   Publish APIs
   ========================================================================== */

/**
 * Publish blog
 */
const publishBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/publish/`);
};

/**
 * Unpublish blog
 */
const unpublishBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/unpublish/`);
};

/**
 * Schedule publish
 */
const scheduleBlog = (id, publishDate) => {
    return api.patch(`${BASE_URL}/${id}/schedule/`, {
        publish_date: publishDate,
    });
};

/**
 * Cancel scheduled publish
 */
const cancelSchedule = (id) => {
    return api.patch(`${BASE_URL}/${id}/cancel-schedule/`);
};
/* ==========================================================================
   Featured Blog APIs
   ========================================================================== */

/**
 * Get featured blogs (Admin)
 */
const getFeaturedBlogsAdmin = (params = {}) => {
    return api.get(`${BASE_URL}/featured/admin/`, {
        params,
    });
};

/**
 * Mark blog as featured
 */
const featureBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/feature/`);
};

/**
 * Remove featured status
 */
const unfeatureBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/unfeature/`);
};


/* ==========================================================================
   Pending Review APIs
   ========================================================================== */

/**
 * Get pending blogs
 */
const getPendingBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/pending/`, {
        params,
    });
};

/**
 * Approve blog
 */
const approveBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/approve/`);
};

/**
 * Reject blog
 */
const rejectBlog = (id, reason = "") => {
    return api.patch(`${BASE_URL}/${id}/reject/`, {
        reason,
    });
};

/**
 * Return blog to draft
 */
const returnToDraft = (id) => {
    return api.patch(`${BASE_URL}/${id}/return-draft/`);
};


/* ==========================================================================
   Archived Blog APIs
   ========================================================================== */

/**
 * Get archived blogs
 */
const getArchivedBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/archived/`, {
        params,
    });
};

/**
 * Archive blog
 */
const archiveBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/archive/`);
};

/**
 * Restore archived blog
 */
const restoreArchivedBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/restore/`);
};


/* ==========================================================================
   Deleted Blog APIs
   ========================================================================== */

/**
 * Get deleted blogs
 */
const getDeletedBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/deleted/`, {
        params,
    });
};

/**
 * Restore deleted blog
 */
const restoreDeletedBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/restore/`);
};

/**
 * Permanently delete blog
 */
const permanentlyDeleteBlog = (id) => {
    return api.delete(`${BASE_URL}/${id}/permanent-delete/`);
};


/* ==========================================================================
   Recycle Bin APIs
   ========================================================================== */

/**
 * Get recycle bin
 */
const getRecycleBin = (params = {}) => {
    return api.get(`${BASE_URL}/recycle-bin/`, {
        params,
    });
};

/**
 * Empty recycle bin
 */
const emptyRecycleBin = () => {
    return api.delete(`${BASE_URL}/recycle-bin/empty/`);
};

/**
 * Restore all blogs
 */
const restoreAllBlogs = () => {
    return api.patch(`${BASE_URL}/recycle-bin/restore-all/`);
};


/* ==========================================================================
   Reported Blog APIs
   ========================================================================== */

/**
 * Get reported blogs
 */
const getReportedBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/reported/`, {
        params,
    });
};

/**
 * Dismiss report
 */
const dismissReport = (id) => {
    return api.patch(`${BASE_URL}/${id}/dismiss-report/`);
};

/**
 * Remove reported blog
 */
const removeReportedBlog = (id) => {
    return api.delete(`${BASE_URL}/${id}/reported/delete/`);
};

/**
 * Restore reported blog
 */
const restoreReportedBlog = (id) => {
    return api.patch(`${BASE_URL}/${id}/reported/restore/`);
};
/* ==========================================================================
   Admin Blog APIs
   ========================================================================== */

/**
 * Get all blogs (Admin)
 */
const getAdminBlogs = (params = {}) => {
    return api.get(`${BASE_URL}/admin/all`, {
        params,
    });
};

/**
 * Get single blog (Admin)
 */
const getAdminBlog = (id) => {
    return api.get(`${BASE_URL}/admin/${id}/`);
};

/**
 * Create blog as admin
 */
const createAnyBlog = (data) => {
    return api.post(
        `${BASE_URL}/admin/create/`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Update any blog
 */
const updateAnyBlog = (id, data) => {
    return api.put(
        `${BASE_URL}/admin/${id}/update/`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

/**
 * Delete any blog
 */
const adminDeleteBlog = (id) => {
    return api.delete(`${BASE_URL}/admin/${id}/delete/`);
};


/* ==========================================================================
   Statistics APIs
   ========================================================================== */

const getBlogStatistics = () => {
    return api.get(`${BASE_URL}/statistics/`);
};


/* ==========================================================================
   Analytics APIs
   ========================================================================== */

const getBlogAnalytics = () => {
    return api.get(`${BASE_URL}/analytics/`);
};


/* ==========================================================================
   Blog Settings APIs
   ========================================================================== */

const getBlogSettings = () => {
    return api.get(`${BASE_URL}/settings/`);
};

const updateBlogSettings = (data) => {
    return api.put(`${BASE_URL}/settings/`, data);
};


/* ==========================================================================
   Bulk Action APIs
   ========================================================================== */

const bulkPublishBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/publish/`, {
        ids,
    });
};

const bulkDeleteBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/delete/`, {
        ids,
    });
};

const bulkArchiveBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/archive/`, {
        ids,
    });
};

const bulkRestoreBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/restore/`, {
        ids,
    });
};

const bulkFeatureBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/feature/`, {
        ids,
    });
};

const bulkUnfeatureBlogs = (ids) => {
    return api.post(`${BASE_URL}/bulk/unfeature/`, {
        ids,
    });
};


/* ==========================================================================
   Export
   ========================================================================== */

const blogService = {

    /* Public */
    getBlogs,
    getBlog,
    getBlogBySlug,
    searchBlogs,
    getCategoryBlogs,
    getTagBlogs,
    getRelatedBlogs,
    getLatestBlogs,
    getPopularBlogs,
    getFeaturedBlogs,

    /* User */
    getMyBlogs,
    getMyBlog,
    uploadInlineImages,
    createBlog,
    updateBlog,
    deleteBlog,
    duplicateBlog,

    /* Draft */
    getDraftBlogs,
    saveDraft,
    updateDraft,
    deleteDraft,

    /* Publish */
    publishBlog,
    unpublishBlog,
    scheduleBlog,
    cancelSchedule,

    /* Featured */
    getFeaturedBlogsAdmin,
    featureBlog,
    unfeatureBlog,

    /* Pending */
    getPendingBlogs,
    approveBlog,
    rejectBlog,
    returnToDraft,

    /* Archived */
    getArchivedBlogs,
    archiveBlog,
    restoreArchivedBlog,

    /* Deleted */
    getDeletedBlogs,
    restoreDeletedBlog,
    permanentlyDeleteBlog,

    /* Recycle Bin */
    getRecycleBin,
    emptyRecycleBin,
    restoreAllBlogs,

    /* Reported */
    getReportedBlogs,
    dismissReport,
    removeReportedBlog,
    restoreReportedBlog,

    /* Admin */
    getAdminBlogs,
    getAdminBlog,
    createAnyBlog,
    updateAnyBlog,
    adminDeleteBlog,

    /* Statistics */
    getBlogStatistics,

    /* Analytics */
    getBlogAnalytics,

    /* Settings */
    getBlogSettings,
    updateBlogSettings,

    /* Bulk */
    bulkPublishBlogs,
    bulkDeleteBlogs,
    bulkArchiveBlogs,
    bulkRestoreBlogs,
    bulkFeatureBlogs,
    bulkUnfeatureBlogs,

};

export default blogService;
