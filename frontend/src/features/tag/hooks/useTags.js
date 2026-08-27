import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import tagService from "../services/tagService";

const useTags = (initialParams = {}) => {

    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    const [params, setParams] = useState({
        page: 1,
        search: "",
        ...initialParams,
    });

    /*
    |--------------------------------------------------------------------------
    | Load Tags
    |--------------------------------------------------------------------------
    */

    const loadTags = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const response =
                await tagService.getAdminTags(params);

            const data = response.data.data || {};
            const pageData = data.pagination || {};
            const currentPage = Number(params.page) || 1;
            const totalPages = Number(pageData.totalPages) || 1;

            setTags(data.items || []);

            setPagination({
                count: pageData.total || 0,
                next:
                    currentPage < totalPages
                        ? currentPage + 1
                        : null,
                previous:
                    currentPage > 1
                        ? currentPage - 1
                        : null,
            });

        } catch (err) {

            console.error(err);

            setError(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to load tags."
            );

        } finally {

            setLoading(false);

        }

    }, [params]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadTags();
    }, [loadTags]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = () => {
        loadTags();
    };

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const setSearch = (search) => {

        setParams((prev) => ({
            ...prev,
            page: 1,
            search,
        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const setPage = (page) => {

        setParams((prev) => ({
            ...prev,
            page,
        }));

    };

    const nextPage = () => {

        if (!pagination.next) return;

        setParams((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));

    };

    const previousPage = () => {

        if (!pagination.previous) return;

        setParams((prev) => ({
            ...prev,
            page: prev.page - 1,
        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const deleteTag = async (id) => {

        try {

            await tagService.deleteTag(id);

            toast.success("Tag deleted successfully.");

            refresh();

            return true;

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Failed to delete tag."
            );

            return false;

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Activate
    |--------------------------------------------------------------------------
    */

    const activateTag = async (id) => {

        try {

            await tagService.activateTag(id);

            toast.success("Tag activated.");

            refresh();

            return true;

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to activate tag."
            );

            return false;

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Deactivate
    |--------------------------------------------------------------------------
    */

    const deactivateTag = async (id) => {

        try {

            await tagService.deactivateTag(id);

            toast.success("Tag deactivated.");

            refresh();

            return true;

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to deactivate tag."
            );

            return false;

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

    const featureTag = async (id) => {

        try {

            await tagService.featureTag(id);

            toast.success("Tag marked as featured.");

            refresh();

            return true;

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to feature tag."
            );

            return false;

        }

    };

    const unfeatureTag = async (id) => {

        try {

            await tagService.unfeatureTag(id);

            toast.success("Tag removed from featured.");

            refresh();

            return true;

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to update tag."
            );

            return false;

        }

    };

    return {

        tags,

        loading,

        error,

        pagination,

        params,

        refresh,

        setSearch,

        setPage,

        nextPage,

        previousPage,

        deleteTag,

        activateTag,

        deactivateTag,

        featureTag,

        unfeatureTag,

    };

};

export default useTags;
