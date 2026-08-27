import api from "../../api";

/*
 * The backend's Gallery resource is the persisted image library.  Keep the
 * media UI's legacy field names at this boundary so its components do not
 * depend on a second, non-existent `/admin/media` API.
 */
const toMedia = (item) => ({
    id: item.id,
    file_name: item.title,
    file_url: item.imageUrl,
    original_url: item.originalUrl,
    thumbnail_url: item.thumbnailUrl,
    alt_text: item.altText,
    file_size: item.fileSize,
    mime_type: item.mimeType,
    created_at: item.createdAt,
    updated_at: item.updatedAt,
});

/**
 * ==========================================
 * Get Media Library
 * ==========================================
 */

export const getMediaLibrary = async (params = {}) => {

    const response = await api.get(
        "/gallery",
        {
            params,
        }
    );

    return {
        ...response.data,
        results: (response.data.data || []).map(toMedia),
    };

};

/**
 * ==========================================
 * Get Single Media
 * ==========================================
 */

export const getMedia = async (id) => {

    const response = await api.get(
        `/gallery/${id}`
    );

    return {
        ...response.data,
        data: toMedia(response.data.data),
    };

};

/**
 * ==========================================
 * Upload Media
 * ==========================================
 */

export const uploadMedia = async (
    formData,
    onUploadProgress
) => {

    const files = formData.getAll("files");
    const altText = formData.get("alt_text") || "";

    const uploads = await Promise.all(
        files.map((file) => {
            const payload = new FormData();
            payload.append("image", file);
            payload.append("title", file.name);
            payload.append("altText", altText);

            return api.post("/gallery", payload, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress,
            });
        })
    );

    return uploads.map((response) => ({
        ...response.data,
        data: toMedia(response.data.data),
    }));

};

/**
 * ==========================================
 * Update Media
 * ==========================================
 */

export const updateMedia = async (
    id,
    data
) => {

    const response = await api.put(
        `/gallery/${id}`,
        {
            title: data.file_name ?? data.title,
            altText: data.alt_text ?? data.altText,
        }
    );

    return { ...response.data, data: toMedia(response.data.data) };

};

/**
 * ==========================================
 * Soft Delete
 * ==========================================
 */

export const deleteMedia = async (id) => {

    const response = await api.delete(
        `/gallery/${id}`
    );

    return response.data;

};

/**
 * ==========================================
 * Bulk Delete
 * ==========================================
 */

export const bulkDeleteMedia = async (
    mediaIds
) => {

    const response = await api.post(
        "/admin/media/bulk-delete/",
        {
            ids: mediaIds,
        }
    );

    return response.data;

};

/**
 * ==========================================
 * Restore Media
 * ==========================================
 */

export const restoreMedia = async (
    id
) => {

    const response = await api.post(
        `/admin/media/${id}/restore/`
    );

    return response.data;

};

/**
 * ==========================================
 * Permanently Delete
 * ==========================================
 */

export const permanentlyDeleteMedia =
    async (id) => {

        const response = await api.delete(
            `/admin/media/${id}/permanent/`
        );

        return response.data;

    };

/**
 * ==========================================
 * Deleted Media
 * ==========================================
 */

export const getDeletedMedia =
    async (params = {}) => {

        const response = await api.get(
            "/admin/media/trash/",
            {
                params,
            }
        );

        return response.data;

    };

/**
 * ==========================================
 * Download Media
 * ==========================================
 */

export const downloadMedia = async (
    id
) => {

    const response = await api.get(
        `/admin/media/${id}/download/`,
        {
            responseType: "blob",
        }
    );

    return response.data;

};

/**
 * ==========================================
 * Media Statistics
 * ==========================================
 */

export const getMediaStatistics =
    async () => {

        const response = await api.get(
            "/admin/media/statistics/"
        );

        return response.data;

    };

/**
 * ==========================================
 * Media Types
 * ==========================================
 */

export const getMediaTypes =
    async () => {

        const response = await api.get(
            "/admin/media/types/"
        );

        return response.data;

    };

/**
 * ==========================================
 * Rename Media
 * ==========================================
 */

export const renameMedia = async (
    id,
    fileName
) => {

    const response = await api.patch(
        `/admin/media/${id}/`,
        {
            file_name: fileName,
        }
    );

    return response.data;

};

/**
 * ==========================================
 * Update Alt Text
 * ==========================================
 */

export const updateAltText =
    async (id, altText) => {

        const response = await api.patch(
            `/admin/media/${id}/`,
            {
                alt_text: altText,
            }
        );

        return response.data;

    };

/**
 * ==========================================
 * Search Media
 * ==========================================
 */

export const searchMedia = async (
    keyword
) => {

    const response = await api.get(
        "/gallery",
        {
            params: {
                search: keyword,
            },
        }
    );

    return {
        ...response.data,
        results: (response.data.data || []).map(toMedia),
    };

};
