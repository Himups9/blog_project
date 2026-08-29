import api from "../../api";

/**
 * Get gallery items
 */
export const getGallery = async (params = {}) => {
    const response = await api.get("/gallery", {
        params,
    });

    return response.data;
};

/**
 * Get single gallery item
 */
export const getGalleryById = async (id) => {
    if (!id) {
        throw new Error("Gallery ID is required.");
    }

    const response = await api.get(`/gallery/${id}`);

    return response.data;
};

/**
 * Create gallery item
 *
 * @param {FormData} formData
 */
export const createGallery = async (formData) => {
    if (!(formData instanceof FormData)) {
        throw new Error(
            "Gallery create data must be FormData."
        );
    }

    const response = await api.post(
        "/gallery",
        formData
    );

    return response.data;
};

/**
 * Update gallery item
 *
 * @param {string} id
 * @param {FormData|Object} data
 */
export const updateGallery = async (id, data) => {
    if (!id) {
        throw new Error("Gallery ID is required.");
    }

    const response = await api.put(
        `/gallery/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete gallery item
 */
export const deleteGallery = async (id) => {
    if (!id) {
        throw new Error("Gallery ID is required.");
    }

    const response = await api.delete(
        `/gallery/${id}`
    );

    return response.data;
};