/**
 * Converts a string into an SEO-friendly URL slug.
 *
 * Examples:
 * "Hello World!" -> "hello-world"
 * "React & Django CMS" -> "react-and-django-cms"
 * "नेपाल समाचार" -> ""
 */

export const generateSlug = (text = "") => {

    if (!text) {

        return "";

    }

    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()

        // Remove apostrophes
        .replace(/['"]/g, "")

        // Replace "&" with " and "
        .replace(/&/g, " and ")

        // Replace any non-alphanumeric characters with hyphens
        .replace(/[^a-z0-9]+/g, "-")

        // Remove duplicate hyphens
        .replace(/-+/g, "-")

        // Remove leading/trailing hyphens
        .replace(/^-|-$/g, "");

};