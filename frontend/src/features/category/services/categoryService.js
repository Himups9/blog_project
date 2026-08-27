import api from "../../api";

const BASE_URL = "/categories";

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

const getCategories = (params = {}) => {
    return api.get(`${BASE_URL}/`, {
        params,
    });
};

const getAdminCategories = (params = {}) => {
    return api.get(`${BASE_URL}/`, {
        params,
    });
};

const getCategory = (id) => {
    return api.get(`${BASE_URL}/${id}/`);
};

const getCategoryBySlug = (slug) => {
    return api.get(`${BASE_URL}/slug/${slug}/`);
};

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const createCategory = (data) => {
    return api.post(`${BASE_URL}/`, data);
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

const updateCategory = (id, data) => {
    return api.patch(`${BASE_URL}/${id}/`, data);
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const deleteCategory = (id) => {
    return api.delete(`${BASE_URL}/${id}/`);
};

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

const getCategoryStatistics = () => {
    return api.get(`${BASE_URL}/statistics`);
};

/*
|--------------------------------------------------------------------------
| Category Blogs
|--------------------------------------------------------------------------
*/

const getCategoryBlogs = (id, params = {}) => {
    return api.get(`${BASE_URL}/${id}/blogs`, {
        params,
    });
};

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

const categoryService = {
    getCategories,
    getAdminCategories,
    getCategory,
    getCategoryBySlug,

    createCategory,
    updateCategory,
    deleteCategory,

    getCategoryStatistics,
    getCategoryBlogs,
};

export default categoryService;