import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import categoryService from "../services/categoryService";

const useCategories = (initialParams = {}) => {
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    /*
    |--------------------------------------------------------------------------
    | Query Params
    |--------------------------------------------------------------------------
    */

    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
        ...initialParams,
    });

    /*
    |--------------------------------------------------------------------------
    | Load Categories
    |--------------------------------------------------------------------------
    */

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await categoryService.getAdminCategories(params);

            /*
             * Expected API response:
             *
             * {
             *   success: true,
             *   data: {
             *      categories: [],
             *      pagination: {
             *          page: 1,
             *          limit: 10,
             *          total: 20,
             *          totalPages: 2
             *      }
             *   }
             * }
             */

            const data = response?.data?.data;

            const categoryList =
                Array.isArray(data?.categories)
                    ? data.categories
                    : [];

            const paginationData = data?.pagination;

            setCategories(categoryList);

            setPagination({
                page:
                    Number(paginationData?.page) ||
                    Number(params.page) ||
                    1,

                limit:
                    Number(paginationData?.limit) ||
                    Number(params.limit) ||
                    10,

                total:
                    Number(paginationData?.total) ||
                    0,

                totalPages:
                    Number(paginationData?.totalPages) ||
                    0,
            });

        } catch (err) {

            console.error(
                "LOAD CATEGORIES ERROR:",
                err
            );

            setError(err);

            setCategories([]);

            setPagination({
                page: Number(params.page) || 1,
                limit: Number(params.limit) || 10,
                total: 0,
                totalPages: 0,
            });

            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load categories."
            );

        } finally {
            setLoading(false);
        }
    }, [params]);

    /*
    |--------------------------------------------------------------------------
    | Load when params change
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(async () => {
        await loadCategories();
    }, [loadCategories]);

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const setSearch = useCallback((search) => {

        setParams((prev) => ({
            ...prev,
            page: 1,
            search: search || "",
        }));

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Page Size
    |--------------------------------------------------------------------------
    */

    const setLimit = useCallback((limit) => {

        const limitNumber = Number(limit);

        if (
            !Number.isInteger(limitNumber) ||
            limitNumber < 1
        ) {
            return;
        }

        setParams((prev) => ({
            ...prev,
            page: 1,
            limit: limitNumber,
        }));

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    const setSorting = useCallback(
        (sortBy, sortOrder = "desc") => {

            setParams((prev) => ({
                ...prev,
                page: 1,
                sortBy,
                sortOrder,
            }));

        },
        []
    );

    /*
    |--------------------------------------------------------------------------
    | Next Page
    |--------------------------------------------------------------------------
    */

    const nextPage = useCallback(() => {

        setParams((prev) => {

            const currentPage =
                Number(prev.page) || 1;

            const totalPages =
                Number(pagination.totalPages) || 0;

            if (
                totalPages === 0 ||
                currentPage >= totalPages
            ) {
                return prev;
            }

            return {
                ...prev,
                page: currentPage + 1,
            };

        });

    }, [pagination.totalPages]);

    /*
    |--------------------------------------------------------------------------
    | Previous Page
    |--------------------------------------------------------------------------
    */

    const previousPage = useCallback(() => {

        setParams((prev) => {

            const currentPage =
                Number(prev.page) || 1;

            if (currentPage <= 1) {
                return prev;
            }

            return {
                ...prev,
                page: currentPage - 1,
            };

        });

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Set Page
    |--------------------------------------------------------------------------
    */

    const setPage = useCallback(
        (page) => {

            const pageNumber = Number(page);

            if (
                !Number.isInteger(pageNumber) ||
                pageNumber < 1
            ) {
                return;
            }

            if (
                pagination.totalPages > 0 &&
                pageNumber > pagination.totalPages
            ) {
                return;
            }

            setParams((prev) => ({
                ...prev,
                page: pageNumber,
            }));

        },
        [pagination.totalPages]
    );

    /*
    |--------------------------------------------------------------------------
    | Delete Category
    |--------------------------------------------------------------------------
    */

    const deleteCategory = useCallback(
        async (id) => {

            if (!id) {
                toast.error("Category ID is required.");
                return false;
            }

            try {

                await categoryService.deleteCategory(id);

                toast.success(
                    "Category deleted successfully."
                );

                await refresh();

                return true;

            } catch (err) {

                console.error(
                    "DELETE CATEGORY ERROR:",
                    err
                );

                toast.error(
                    err?.response?.data?.message ||
                    "Failed to delete category."
                );

                return false;
            }

        },
        [refresh]
    );

    /*
    |--------------------------------------------------------------------------
    | Activate Category
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | Your current Prisma Category model does NOT have
    | an isActive field.
    |
    | Therefore these methods will only work if you add
    | corresponding backend functionality.
    |
    */

    const activateCategory = useCallback(
        async (id) => {

            try {

                await categoryService.activateCategory(id);

                toast.success(
                    "Category activated."
                );

                await refresh();

                return true;

            } catch (err) {

                console.error(
                    "ACTIVATE CATEGORY ERROR:",
                    err
                );

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to activate category."
                );

                return false;
            }

        },
        [refresh]
    );

    /*
    |--------------------------------------------------------------------------
    | Deactivate Category
    |--------------------------------------------------------------------------
    */

    const deactivateCategory = useCallback(
        async (id) => {

            try {

                await categoryService.deactivateCategory(id);

                toast.success(
                    "Category deactivated."
                );

                await refresh();

                return true;

            } catch (err) {

                console.error(
                    "DEACTIVATE CATEGORY ERROR:",
                    err
                );

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to deactivate category."
                );

                return false;
            }

        },
        [refresh]
    );

    /*
    |--------------------------------------------------------------------------
    | Feature Category
    |--------------------------------------------------------------------------
    */

    const featureCategory = useCallback(
        async (id) => {

            try {

                await categoryService.featureCategory(id);

                toast.success(
                    "Category marked as featured."
                );

                await refresh();

                return true;

            } catch (err) {

                console.error(
                    "FEATURE CATEGORY ERROR:",
                    err
                );

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to update category."
                );

                return false;
            }

        },
        [refresh]
    );

    /*
    |--------------------------------------------------------------------------
    | Unfeature Category
    |--------------------------------------------------------------------------
    */

    const unfeatureCategory = useCallback(
        async (id) => {

            try {

                await categoryService.unfeatureCategory(id);

                toast.success(
                    "Category removed from featured."
                );

                await refresh();

                return true;

            } catch (err) {

                console.error(
                    "UNFEATURE CATEGORY ERROR:",
                    err
                );

                toast.error(
                    err?.response?.data?.message ||
                    "Unable to update category."
                );

                return false;
            }

        },
        [refresh]
    );

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {
        categories,

        loading,

        error,

        pagination,

        params,

        refresh,

        setSearch,

        setLimit,

        setSorting,

        setPage,

        nextPage,

        previousPage,

        deleteCategory,

        activateCategory,

        deactivateCategory,

        featureCategory,

        unfeatureCategory,
    };
};

export default useCategories;