// =============================================
// Text Helpers
// =============================================

export const stripHtml = (html = "") => {
    return html.replace(/<[^>]*>/g, "").trim();
};

export const truncateText = (text = "", length = 160) => {
    if (text.length <= length) {
        return text;
    }

    return `${text.substring(0, length)}...`;
};

export const wordCount = (text = "") => {
    const cleaned = stripHtml(text);

    if (!cleaned) {
        return 0;
    }

    return cleaned.split(/\s+/).length;
};

// =============================================
// Slug Helpers
// =============================================

export const generateSlug = (text = "") => {
    return text
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

// =============================================
// Keyword Helpers
// =============================================

export const keywordOccurrences = (
    keyword = "",
    content = ""
) => {

    if (!keyword || !content) {
        return 0;
    }

    const escaped = keyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const regex = new RegExp(`\\b${escaped}\\b`, "gi");

    const matches = stripHtml(content).match(regex);

    return matches ? matches.length : 0;

};

export const keywordDensity = (
    keyword = "",
    content = ""
) => {

    const totalWords = wordCount(content);

    if (totalWords === 0) {
        return 0;
    }

    const occurrences = keywordOccurrences(
        keyword,
        content
    );

    return Number(
        ((occurrences / totalWords) * 100).toFixed(2)
    );

};

// =============================================
// SEO Score Helpers
// =============================================

export const calculateSEOScore = (seo = {}) => {

    let score = 0;

    if (seo.title?.length >= 30 && seo.title?.length <= 60) {
        score += 20;
    }

    if (
        seo.meta_description?.length >= 120 &&
        seo.meta_description?.length <= 160
    ) {
        score += 20;
    }

    if (seo.focus_keyword) {
        score += 15;
    }

    if (seo.canonical_url) {
        score += 10;
    }

    if (seo.open_graph?.title) {
        score += 10;
    }

    if (seo.twitter?.title) {
        score += 10;
    }

    if (seo.robots?.robots_index === "index") {
        score += 5;
    }

    if (seo.robots?.robots_follow === "follow") {
        score += 5;
    }

    if (seo.image_alt_texts?.length > 0) {
        score += 5;
    }

    return Math.min(score, 100);

};

// =============================================
// SEO Validation
// =============================================

export const validateSEO = (seo = {}) => {

    const issues = [];

    if (!seo.title) {

        issues.push({
            field: "title",
            type: "error",
            message: "SEO title is required.",
        });

    }

    if (
        seo.title &&
        (seo.title.length < 30 || seo.title.length > 60)
    ) {

        issues.push({
            field: "title",
            type: "warning",
            message:
                "SEO title should be between 30 and 60 characters.",
        });

    }

    if (!seo.meta_description) {

        issues.push({
            field: "meta_description",
            type: "error",
            message: "Meta description is required.",
        });

    }

    if (
        seo.meta_description &&
        (
            seo.meta_description.length < 120 ||
            seo.meta_description.length > 160
        )
    ) {

        issues.push({
            field: "meta_description",
            type: "warning",
            message:
                "Meta description should be between 120 and 160 characters.",
        });

    }

    if (!seo.focus_keyword) {

        issues.push({
            field: "focus_keyword",
            type: "warning",
            message: "Focus keyword is recommended.",
        });

    }

    if (!seo.canonical_url) {

        issues.push({
            field: "canonical_url",
            type: "warning",
            message: "Canonical URL is recommended.",
        });

    }

    return issues;

};

// =============================================
// Robots Helpers
// =============================================

export const validateRobots = (content = "") => {

    const issues = [];

    if (!content.includes("User-agent")) {

        issues.push("Missing User-agent directive.");

    }

    if (!content.includes("Sitemap")) {

        issues.push("Missing Sitemap directive.");

    }

    return issues;

};

// =============================================
// Sitemap Helpers
// =============================================

export const buildSitemapUrl = (
    baseUrl = "",
    path = ""
) => {

    const base = baseUrl.replace(/\/$/, "");

    const url = path.startsWith("/")
        ? path
        : `/${path}`;

    return `${base}${url}`;

};

export const formatPriority = (priority) => {

    const number = Number(priority);

    if (Number.isNaN(number)) {
        return "0.5";
    }

    return number.toFixed(1);

};

// =============================================
// Export Helpers
// =============================================

export const exportSEOReport = (
    data = [],
    filename = "seo-report.json"
) => {

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        {
            type: "application/json",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

};