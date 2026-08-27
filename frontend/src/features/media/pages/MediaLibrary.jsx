import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MediaToolbar from "../components/MediaToolbar";
import MediaFilters from "../components/MediaFilters";
import MediaGrid from "../components/MediaGrid";
import ImagePreviewModal from "../components/ImagePreviewModal";
import DeleteMediaModal from "../components/DeleteMediaModal";
import MediaDetailsDrawer from "../components/MediaDetailsDrawer";

import {
    deleteMedia,
    getMediaLibrary,
} from "../services/mediaService";

const MediaLibrary = () => {

    const [media, setMedia] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedItems, setSelectedItems] = useState([]);

    const [previewMedia, setPreviewMedia] = useState(null);

    const [deleteMediaItem, setDeleteMediaItem] =
        useState(null);

    const [detailsMedia, setDetailsMedia] =
        useState(null);

    const [filters, setFilters] = useState({

        search: "",

        type: "",

        sort: "newest",

    });

    const loadMedia = async () => {

        setLoading(true);

        try {

            const response =
                await getMediaLibrary(filters);

            setMedia(response.results || []);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load media."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadMedia();

    }, [filters]);

    /* Continue in Message 2 */
        /* ==========================================
        Selection
    ========================================== */

    const handleSelect = (item) => {

        setSelectedItems((previous) => {

            const exists = previous.includes(item.id);

            if (exists) {

                return previous.filter(
                    (id) => id !== item.id
                );

            }

            return [...previous, item.id];

        });

    };

    const handleSelectAll = () => {

        setSelectedItems(
            media.map((item) => item.id)
        );

    };

    const handleClearSelection = () => {

        setSelectedItems([]);

    };

    /* ==========================================
        Delete
    ========================================== */

    const handleDelete = async (item) => {

        try {

            await deleteMedia(item.id);

            toast.success(
                "Media deleted successfully."
            );

            setDeleteMediaItem(null);

            loadMedia();

            setSelectedItems((previous) =>
                previous.filter(
                    (id) => id !== item.id
                )
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete media."
            );

        }

    };

    const handleDeleteSelected = () => {

        if (selectedItems.length === 0) {

            toast.error(
                "Please select at least one media file."
            );

            return;

        }

        toast(
            "Bulk delete will be implemented with the backend."
        );

    };

    /* ==========================================
        Toolbar
    ========================================== */

    const handleRefresh = () => {

        loadMedia();

        toast.success(
            "Media library refreshed."
        );

    };

    /* ==========================================
        Filters
    ========================================== */

    const handleSearchChange = (value) => {

        setFilters((previous) => ({

            ...previous,

            search: value,

        }));

    };

    const handleTypeChange = (value) => {

        setFilters((previous) => ({

            ...previous,

            type: value,

        }));

    };

    const handleSortChange = (value) => {

        setFilters((previous) => ({

            ...previous,

            sort: value,

        }));

    };

    const handleResetFilters = () => {

        setFilters({

            search: "",

            type: "",

            sort: "newest",

        });

    };

    /* Continue in Message 3 */
        return (

        <div className="space-y-6">

            {/* ==========================================
                Toolbar
            ========================================== */}

            <MediaToolbar
                selectedCount={selectedItems.length}
                loading={loading}
                onUpload={() =>
                    toast("Upload page coming next.")
                }
                onRefresh={handleRefresh}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onDeleteSelected={handleDeleteSelected}
            />

            {/* ==========================================
                Filters
            ========================================== */}

            <MediaFilters
                filters={filters}
                totalItems={media.length}
                onSearchChange={handleSearchChange}
                onTypeChange={handleTypeChange}
                onSortChange={handleSortChange}
                onReset={handleResetFilters}
            />

            {/* ==========================================
                Media Grid
            ========================================== */}

            <MediaGrid
                media={media}
                loading={loading}
                selectable
                selectedItems={selectedItems}
                onSelect={handleSelect}
                onPreview={setPreviewMedia}
                onDownload={(item) =>
                    window.open(
                        item.file_url,
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
                onDelete={setDeleteMediaItem}
            />

            {/* ==========================================
                Details Drawer
            ========================================== */}

            {detailsMedia && (

                <button
                    type="button"
                    onClick={() =>
                        setDetailsMedia(null)
                    }
                    className="hidden"
                />

            )}

            {/* Continue in Message 4 */}
                        {/* ==========================================
                Image Preview Modal
            ========================================== */}

            <ImagePreviewModal
                isOpen={Boolean(previewMedia)}
                media={previewMedia}
                onClose={() =>
                    setPreviewMedia(null)
                }
                onDownload={(item) =>
                    window.open(
                        item.file_url,
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
                onDelete={(item) => {

                    setPreviewMedia(null);

                    setDeleteMediaItem(item);

                }}
            />

            {/* ==========================================
                Delete Media Modal
            ========================================== */}

            <DeleteMediaModal
                isOpen={Boolean(deleteMediaItem)}
                media={deleteMediaItem}
                loading={loading}
                onClose={() =>
                    setDeleteMediaItem(null)
                }
                onConfirm={handleDelete}
            />

            {/* ==========================================
                Media Details Drawer
            ========================================== */}

            <MediaDetailsDrawer
                isOpen={Boolean(detailsMedia)}
                media={detailsMedia}
                onClose={() =>
                    setDetailsMedia(null)
                }
            />

        </div>

    );

};

export default MediaLibrary;