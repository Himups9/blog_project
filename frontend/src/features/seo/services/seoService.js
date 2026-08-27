import api from "../../../services/api";

/**
 * SEO Service
 * ----------------------------------------
 * All SEO related API requests.
 */

const BASE_URL = "/seo";

const seoService = {

    // ==========================================
    // SEO Settings
    // ==========================================

    getSEOSettings: async () => {

        const response = await api.get(`${BASE_URL}/settings/`);

        return response.data;

    },

    updateSEOSettings: async (data) => {

        const response = await api.put(
            `${BASE_URL}/settings/`,
            data
        );

        return response.data;

    },

    // ==========================================
    // SEO Score
    // ==========================================

    getSEOScore: async () => {

        const response = await api.get(
            `${BASE_URL}/score/`
        );

        return response.data;

    },

    // ==========================================
    // SEO Audit
    // ==========================================

    runSEOAudit: async () => {

        const response = await api.post(
            `${BASE_URL}/audit/run/`
        );

        return response.data;

    },

    getSEOAudit: async () => {

        const response = await api.get(
            `${BASE_URL}/audit/`
        );

        return response.data;

    },

    exportSEOAudit: async (format = "pdf") => {

        const response = await api.get(
            `${BASE_URL}/audit/export/`,
            {
                params: { format },
                responseType: "blob",
            }
        );

        return response.data;

    },

    // ==========================================
    // Analytics
    // ==========================================

    getSEOAnalytics: async (params = {}) => {

        const response = await api.get(
            `${BASE_URL}/analytics/`,
            {
                params,
            }
        );

        return response.data;

    },

    // ==========================================
    // Sitemap
    // ==========================================

    getSitemap: async () => {

        const response = await api.get(
            `${BASE_URL}/sitemap/`
        );

        return response.data;

    },

    regenerateSitemap: async () => {

        const response = await api.post(
            `${BASE_URL}/sitemap/regenerate/`
        );

        return response.data;

    },

    updateSitemapItem: async (id, data) => {

        const response = await api.put(
            `${BASE_URL}/sitemap/${id}/`,
            data
        );

        return response.data;

    },

    // ==========================================
    // robots.txt
    // ==========================================

    getRobots: async () => {

        const response = await api.get(
            `${BASE_URL}/robots/`
        );

        return response.data;

    },

    updateRobots: async (content) => {

        const response = await api.put(
            `${BASE_URL}/robots/`,
            {
                content,
            }
        );

        return response.data;

    },

    resetRobots: async () => {

        const response = await api.post(
            `${BASE_URL}/robots/reset/`
        );

        return response.data;

    },

    // ==========================================
    // Meta Preview
    // ==========================================

    getMetaPreview: async (params = {}) => {

        const response = await api.post(
            `${BASE_URL}/preview/`,
            params
        );

        return response.data;

    },

    // ==========================================
    // Open Graph
    // ==========================================

    updateOpenGraph: async (data) => {

        const response = await api.put(
            `${BASE_URL}/open-graph/`,
            data
        );

        return response.data;

    },

    // ==========================================
    // Twitter Card
    // ==========================================

    updateTwitterCard: async (data) => {

        const response = await api.put(
            `${BASE_URL}/twitter-card/`,
            data
        );

        return response.data;

    },

    // ==========================================
    // Canonical URL
    // ==========================================

    updateCanonicalUrl: async (url) => {

        const response = await api.put(
            `${BASE_URL}/canonical/`,
            {
                canonical_url: url,
            }
        );

        return response.data;

    },

    // ==========================================
    // Focus Keyword
    // ==========================================

    analyzeKeyword: async (data) => {

        const response = await api.post(
            `${BASE_URL}/keyword/analyze/`,
            data
        );

        return response.data;

    },

};

export default seoService;