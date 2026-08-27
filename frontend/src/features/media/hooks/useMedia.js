import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getMediaLibrary,
    uploadMedia,
    updateMedia,
    deleteMedia,
    bulkDeleteMedia,
    restoreMedia,
    permanentlyDeleteMedia,
    getDeletedMedia,
} from "../services/mediaService";

const DEFAULT_FILTERS = {
    search: "",
    type: "",
    sort: "newest",
};

const useMedia = (initialFilters = DEFAULT_FILTERS) => {

    const [media, setMedia] = useState([]);

    const [deletedMedia, setDeletedMedia] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const [filters, setFilters] =
        useState(initialFilters);

    const [selectedItems, setSelectedItems] =
        useState([]);

    /**
     * ==========================================
     * Load Media
     * ==========================================
     */

    const loadMedia = useCallback(
        async (customFilters = filters) => {

            setLoading(true);

            setError(null);

            try {

                const response =
                    await getMediaLibrary(
                        customFilters
                    );

                setMedia(
                    response.results ||
                    response.data ||
                    []
                );

            } catch (err) {

                console.error(err);

                setError(err);

                toast.error(
                    "Failed to load media."
                );

            } finally {

                setLoading(false);

            }

        },
        [filters]
    );

    /**
     * ==========================================
     * Load Trash
     * ==========================================
     */

    const loadDeletedMedia =
        useCallback(async () => {

            try {

                const response =
                    await getDeletedMedia();

                setDeletedMedia(
                    response.results ||
                    []
                );

            } catch (err) {

                console.error(err);

            }

        }, []);

    /**
     * ==========================================
     * Upload
     * ==========================================
     */

    const upload = async (
        formData,
        onUploadProgress
    ) => {

        setUploading(true);

        try {

            const response =
                await uploadMedia(
                    formData,
                    onUploadProgress
                );

            toast.success(
                "Media uploaded successfully."
            );

            await loadMedia();

            return response;

        } catch (err) {

            console.error(err);

            toast.error(
                "Upload failed."
            );

            throw err;

        } finally {

            setUploading(false);

        }

    };

    /**
     * ==========================================
     * Update
     * ==========================================
     */

    const update = async (
        id,
        data
    ) => {

        try {

            const response =
                await updateMedia(
                    id,
                    data
                );

            toast.success(
                "Media updated."
            );

            await loadMedia();

            return response;

        } catch (err) {

            console.error(err);

            toast.error(
                "Update failed."
            );

            throw err;

        }

    };

    /**
     * ==========================================
     * Delete
     * ==========================================
     */

    const remove = async (id) => {

        try {

            await deleteMedia(id);

            toast.success(
                "Media deleted."
            );

            await loadMedia();

        } catch (err) {

            console.error(err);

            toast.error(
                "Delete failed."
            );

            throw err;

        }

    };

    /**
     * ==========================================
     * Bulk Delete
     * ==========================================
     */

    const removeSelected =
        async () => {

            if (
                selectedItems.length === 0
            ) {

                return;

            }

            try {

                await bulkDeleteMedia(
                    selectedItems
                );

                toast.success(
                    "Selected media deleted."
                );

                setSelectedItems([]);

                await loadMedia();

            } catch (err) {

                console.error(err);

                toast.error(
                    "Bulk delete failed."
                );

            }

        };

    /**
     * ==========================================
     * Restore
     * ==========================================
     */

    const restore = async (id) => {

        try {

            await restoreMedia(id);

            toast.success(
                "Media restored."
            );

            await loadDeletedMedia();

        } catch (err) {

            console.error(err);

            toast.error(
                "Restore failed."
            );

        }

    };

    /**
     * ==========================================
     * Permanent Delete
     * ==========================================
     */

    const removeForever =
        async (id) => {

            try {

                await permanentlyDeleteMedia(
                    id
                );

                toast.success(
                    "Media permanently deleted."
                );

                await loadDeletedMedia();

            } catch (err) {

                console.error(err);

                toast.error(
                    "Permanent delete failed."
                );

            }

        };

    /**
     * ==========================================
     * Selection
     * ==========================================
     */

    const toggleSelection = (
        id
    ) => {

        setSelectedItems(
            (previous) => {

                if (
                    previous.includes(id)
                ) {

                    return previous.filter(
                        (item) =>
                            item !== id
                    );

                }

                return [
                    ...previous,
                    id,
                ];

            }
        );

    };

    const selectAll = () => {

        setSelectedItems(
            media.map(
                (item) => item.id
            )
        );

    };

    const clearSelection =
        () => {

            setSelectedItems([]);

        };

    /**
     * ==========================================
     * Filters
     * ==========================================
     */

    const updateFilter = (
        key,
        value
    ) => {

        setFilters(
            (previous) => ({

                ...previous,

                [key]: value,

            })
        );

    };

    const resetFilters =
        () => {

            setFilters(
                DEFAULT_FILTERS
            );

        };

    useEffect(() => {

        loadMedia();

    }, [loadMedia]);

    return {

        media,

        deletedMedia,

        loading,

        uploading,

        error,

        filters,

        selectedItems,

        loadMedia,

        loadDeletedMedia,

        upload,

        update,

        remove,

        removeSelected,

        restore,

        removeForever,

        toggleSelection,

        selectAll,

        clearSelection,

        updateFilter,

        resetFilters,

    };

};

export default useMedia;