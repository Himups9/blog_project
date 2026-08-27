import { useCallback, useEffect, useState } from "react";

import {
    getGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
} from "../services/galleryService";

import { GALLERY_CONSTANTS } from "../constants/galleryConstants";

const {
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
} = GALLERY_CONSTANTS;

const useGallery = ({
    initialPage = DEFAULT_PAGE,
    initialLimit = DEFAULT_LIMIT,
    initialSearch = "",
    autoFetch = true,
} = {}) => {
    // =========================================================
    // State
    // =========================================================

    const [galleryItems, setGalleryItems] = useState([]);

    const [selectedGallery, setSelectedGallery] =
        useState(null);

    const [page, setPage] = useState(initialPage);

    const [limit, setLimit] = useState(initialLimit);

    const [search, setSearch] =
        useState(initialSearch);

    const [pagination, setPagination] = useState({
        page: initialPage,
        limit: initialLimit,
        total: 0,
        totalPages: 0,
    });

    const [loading, setLoading] = useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] = useState(null);

    // =========================================================
    // Fetch Gallery
    // =========================================================

    const fetchGallery = useCallback(
        async ({
            currentPage = page,
            currentLimit = limit,
            currentSearch = search,
        } = {}) => {
            try {
                setLoading(true);
                setError(null);

                const response = await getGallery({
                    page: currentPage,
                    limit: currentLimit,
                    ...(currentSearch?.trim()
                        ? {
                              search:
                                  currentSearch.trim(),
                          }
                        : {}),
                });

                const items = response?.data || [];

                setGalleryItems(items);

                setPagination(
                    response?.pagination || {
                        page: currentPage,
                        limit: currentLimit,
                        total: items.length,
                        totalPages:
                            items.length > 0 ? 1 : 0,
                    }
                );

                return response;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    GALLERY_CONSTANTS.MESSAGES
                        .LOAD_ERROR;

                setError(message);

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [page, limit, search]
    );

    // =========================================================
    // Fetch Single Gallery Item
    // =========================================================

    const fetchGalleryById = useCallback(
        async (id) => {
            try {
                setActionLoading(true);
                setError(null);

                const response =
                    await getGalleryById(id);

                const item =
                    response?.data || null;

                setSelectedGallery(item);

                return item;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load gallery item.";

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        []
    );

    // =========================================================
    // Create Gallery
    // =========================================================

    const addGallery = useCallback(
        async (formData) => {
            try {
                setActionLoading(true);
                setError(null);

                const response =
                    await createGallery(formData);

                /*
                 * Refresh current gallery list
                 * after successful creation.
                 */
                await fetchGallery({
                    currentPage: page,
                    currentLimit: limit,
                    currentSearch: search,
                });

                return response;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    GALLERY_CONSTANTS.MESSAGES
                        .CREATE_ERROR;

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        [
            fetchGallery,
            page,
            limit,
            search,
        ]
    );

    // =========================================================
    // Update Gallery
    // =========================================================

    const editGallery = useCallback(
        async (id, data) => {
            try {
                setActionLoading(true);
                setError(null);

                const response =
                    await updateGallery(
                        id,
                        data
                    );

                const updatedItem =
                    response?.data;

                if (updatedItem) {
                    setGalleryItems(
                        (items) =>
                            items.map((item) =>
                                item.id === id
                                    ? updatedItem
                                    : item
                            )
                    );

                    setSelectedGallery(
                        updatedItem
                    );
                }

                return response;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    GALLERY_CONSTANTS.MESSAGES
                        .UPDATE_ERROR;

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        []
    );

    // =========================================================
    // Delete Gallery
    // =========================================================

    const removeGallery = useCallback(
        async (id) => {
            try {
                setActionLoading(true);
                setError(null);

                const response =
                    await deleteGallery(id);

                /*
                 * Remove immediately from local state.
                 */
                setGalleryItems(
                    (items) =>
                        items.filter(
                            (item) =>
                                item.id !== id
                        )
                );

                /*
                 * Clear selected item if deleted.
                 */
                setSelectedGallery(
                    (current) =>
                        current?.id === id
                            ? null
                            : current
                );

                /*
                 * Refresh the current page.
                 */
                await fetchGallery({
                    currentPage: page,
                    currentLimit: limit,
                    currentSearch: search,
                });

                return response;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    GALLERY_CONSTANTS.MESSAGES
                        .DELETE_ERROR;

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        [
            fetchGallery,
            page,
            limit,
            search,
        ]
    );

    // =========================================================
    // Search
    // =========================================================

    const handleSearch = useCallback(
        (value) => {
            setSearch(value);
            setPage(DEFAULT_PAGE);
        },
        []
    );

    // =========================================================
    // Pagination
    // =========================================================

    const handlePageChange = useCallback(
        (newPage) => {
            const nextPage = Number(newPage);

            if (!Number.isInteger(nextPage)) {
                return;
            }

            if (nextPage < 1) {
                return;
            }

            if (
                pagination.totalPages > 0 &&
                nextPage > pagination.totalPages
            ) {
                return;
            }

            setPage(nextPage);
        },
        [pagination.totalPages]
    );

    const handleLimitChange = useCallback(
        (newLimit) => {
            const nextLimit = Number(newLimit);

            if (!Number.isInteger(nextLimit)) {
                return;
            }

            if (nextLimit < 1) {
                return;
            }

            if (
                nextLimit >
                GALLERY_CONSTANTS.MAX_LIMIT
            ) {
                return;
            }

            setLimit(nextLimit);
            setPage(DEFAULT_PAGE);
        },
        []
    );

    // =========================================================
    // Clear Error
    // =========================================================

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // =========================================================
    // Clear Selected Gallery
    // =========================================================

    const clearSelectedGallery =
        useCallback(() => {
            setSelectedGallery(null);
        }, []);

    // =========================================================
    // Auto Fetch
    // =========================================================

    useEffect(() => {
        if (!autoFetch) {
            return;
        }

        fetchGallery();
    }, [autoFetch, fetchGallery]);

    // =========================================================
    // Return
    // =========================================================

    return {
        // Data
        galleryItems,
        selectedGallery,
        pagination,

        // Query
        page,
        limit,
        search,

        // States
        loading,
        actionLoading,
        error,

        // Fetch
        fetchGallery,
        fetchGalleryById,

        // CRUD
        addGallery,
        editGallery,
        removeGallery,

        // Search
        handleSearch,

        // Pagination
        handlePageChange,
        handleLimitChange,

        // Utilities
        clearError,
        clearSelectedGallery,
        setSelectedGallery,
    };
};

export default useGallery;