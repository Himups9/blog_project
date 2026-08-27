import api from "../../api";

const BASE_URL = "/tags";

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

const getTags = (params = {}) => {
    return api.get(`${BASE_URL}/`, {
        params,
    });
};

const getTag = (id) => {
    return api.get(`${BASE_URL}/${id}/`);
};

const getTagBySlug = (slug) => {
    return api.get(`${BASE_URL}/slug/${slug}/`);
};

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

const createTag = (data) => {
    return api.post(BASE_URL, data);
};

const updateTag = (id, data) => {
    return api.patch(`${BASE_URL}/${id}`, data);
};

const deleteTag = (id) => {
    return api.delete(`${BASE_URL}/${id}`);
};

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

const activateTag = (id) => {
    return api.patch(`${BASE_URL}/${id}/activate/`);
};

const deactivateTag = (id) => {
    return api.patch(`${BASE_URL}/${id}/deactivate/`);
};

const featureTag = (id) => {
    return api.patch(`${BASE_URL}/${id}/feature/`);
};

const unfeatureTag = (id) => {
    return api.patch(`${BASE_URL}/${id}/unfeature/`);
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

const getAdminTags = (params = {}) => {
    return api.get(BASE_URL, {
        params,
    });
};

/*
|--------------------------------------------------------------------------
| Dropdown
|--------------------------------------------------------------------------
*/

const getTagOptions = () => {
    return api.get(`${BASE_URL}/options/`);
};

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

const getTagStatistics = () => {
    return api.get(`${BASE_URL}/statistics/`);
};

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

const tagService = {
    // Public
    getTags,
    getTag,
    getTagBySlug,

    // CRUD
    createTag,
    updateTag,
    deleteTag,

    // Status
    activateTag,
    deactivateTag,
    featureTag,
    unfeatureTag,

    // Admin
    getAdminTags,

    // Dropdown
    getTagOptions,

    // Statistics
    getTagStatistics,
};

export default tagService;
