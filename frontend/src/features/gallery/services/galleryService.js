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
    const response = await api.get(`/gallery/${id}`);

    return response.data;
};


/**
 * Create gallery item
 *
 * @param {FormData} formData
 */
export const createGallery = async (formData) => {
    const response = await api.post(
        "/gallery",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


/**
 * Update gallery item
 *
 * @param {string} id
 * @param {FormData|Object} data
 */
export const updateGallery = async (
    id,
    data
) => {
    const isFormData =
        data instanceof FormData;

    const response = await api.put(
        `/gallery/${id}`,
        data,
        isFormData
            ? {
                  headers: {
                      "Content-Type":
                          "multipart/form-data",
                  },
              }
            : undefined
    );

    return response.data;
};


/**
 * Delete gallery item
 */
export const deleteGallery = async (id) => {
    const response = await api.delete(
        `/gallery/${id}`
    );

    return response.data;
};