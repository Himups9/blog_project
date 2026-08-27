import { useCallback, useEffect, useState } from "react";

import seoService from "../services/seoService";

const initialSEOState = {
    title: "",
    slug: "",
    meta_description: "",
    focus_keyword: "",
    canonical_url: "",
    heading: "",
    content: "",
    image_alt_texts: [],

    open_graph: {
        title: "",
        description: "",
        image: "",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "",
        description: "",
        image: "",
    },

    robots: {
        robots_index: "index",
        robots_follow: "follow",
        noarchive: false,
        nosnippet: false,
        noimageindex: false,
        notranslate: false,
        max_snippet: -1,
        max_image_preview: "large",
        max_video_preview: -1,
    },
};

const useSEO = () => {

    const [seo, setSEO] = useState(initialSEOState);

    const [analytics, setAnalytics] = useState(null);

    const [audit, setAudit] = useState(null);

    const [score, setScore] = useState(null);

    const [sitemap, setSitemap] = useState([]);

    const [robots, setRobots] = useState("");

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    // ===========================================
    // Load SEO Settings
    // ===========================================

    const loadSEOSettings = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await seoService.getSEOSettings();

            setSEO(data);

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Unable to load SEO settings."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    // ===========================================
    // Save SEO Settings
    // ===========================================

    const saveSEOSettings = async (payload) => {

        try {

            setSaving(true);

            setError("");

            const response =
                await seoService.updateSEOSettings(
                    payload
                );

            setSEO(response);

            return response;

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Unable to save SEO settings.";

            setError(message);

            throw err;

        } finally {

            setSaving(false);

        }

    };

    // ===========================================
    // SEO Score
    // ===========================================

    const loadSEOScore = async () => {

        try {

            const data =
                await seoService.getSEOScore();

            setScore(data);

        } catch (err) {

            console.error(err);

        }

    };

    // ===========================================
    // Analytics
    // ===========================================

    const loadAnalytics = async (
        params = {}
    ) => {

        try {

            const data =
                await seoService.getSEOAnalytics(
                    params
                );

            setAnalytics(data);

        } catch (err) {

            console.error(err);

        }

    };

    // ===========================================
    // Audit
    // ===========================================

    const runAudit = async () => {

        try {

            const data =
                await seoService.runSEOAudit();

            setAudit(data);

            return data;

        } catch (err) {

            console.error(err);

        }

    };

    // ===========================================
    // Sitemap
    // ===========================================

    const loadSitemap = async () => {

        try {

            const data =
                await seoService.getSitemap();

            setSitemap(data);

        } catch (err) {

            console.error(err);

        }

    };

    const regenerateSitemap =
        async () => {

            try {

                await seoService.regenerateSitemap();

                await loadSitemap();

            } catch (err) {

                console.error(err);

            }

        };

    // ===========================================
    // Robots
    // ===========================================

    const loadRobots = async () => {

        try {

            const data =
                await seoService.getRobots();

            setRobots(data.content);

        } catch (err) {

            console.error(err);

        }

    };

    const saveRobots =
        async (content) => {

            try {

                await seoService.updateRobots(
                    content
                );

                setRobots(content);

            } catch (err) {

                console.error(err);

            }

        };

    const resetRobots =
        async () => {

            try {

                await seoService.resetRobots();

                await loadRobots();

            } catch (err) {

                console.error(err);

            }

        };

    // ===========================================
    // Initial Load
    // ===========================================

    useEffect(() => {

        loadSEOSettings();

        loadSEOScore();

        loadAnalytics();

        loadSitemap();

        loadRobots();

    }, [loadSEOSettings]);

    return {

        seo,
        analytics,
        audit,
        score,
        sitemap,
        robots,

        loading,
        saving,
        error,

        setSEO,
        setAnalytics,
        setAudit,
        setScore,
        setSitemap,
        setRobots,

        loadSEOSettings,
        saveSEOSettings,

        loadSEOScore,

        loadAnalytics,

        runAudit,

        loadSitemap,
        regenerateSitemap,

        loadRobots,
        saveRobots,
        resetRobots,

    };

};

export default useSEO;