import PropTypes from "prop-types";
import { X } from "lucide-react";

import MediaFilters from "./MediaFilters";
import MediaGrid from "./MediaGrid";

const ImagePickerModal = ({
    isOpen,

    media = [],

    loading = false,

    filters,

    totalItems = 0,

    selectedImage,

    onClose,

    onSearchChange,

    onTypeChange,

    onSortChange,

    onResetFilters,

    onPreview,

    onDownload,

    onDelete,

    onSelect,
}) => {

    if (!isOpen) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* ==========================================
                    Header
                =========================================== */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                            Select Image

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Choose an existing image from your media library.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* ==========================================
                    Filters
                =========================================== */}

                <div className="border-b border-gray-200 p-6">

                    <MediaFilters
                        filters={filters}
                        totalItems={totalItems}
                        onSearchChange={onSearchChange}
                        onTypeChange={onTypeChange}
                        onSortChange={onSortChange}
                        onReset={onResetFilters}
                    />

                </div>

                {/* Continue in Message 2 */}
                                {/* ==========================================
                    Media Grid
                =========================================== */}

                <div className="flex-1 overflow-y-auto p-6">

                    <MediaGrid
                        media={media}
                        loading={loading}
                        selectable
                        selectedItems={
                            selectedImage
                                ? [selectedImage.id]
                                : []
                        }
                        onSelect={onSelect}
                        onPreview={onPreview}
                        onDownload={onDownload}
                        onDelete={onDelete}
                    />

                </div>

                {/* ==========================================
                    Selected Image
                =========================================== */}

                {selectedImage && (

                    <div className="border-t border-gray-200 bg-blue-50 px-6 py-4">

                        <div className="flex items-center gap-4">

                            <img
                                src={selectedImage.file_url}
                                alt={
                                    selectedImage.alt_text ||
                                    selectedImage.file_name
                                }
                                className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                            />

                            <div className="min-w-0 flex-1">

                                <h3
                                    className="truncate text-sm font-semibold text-gray-900"
                                    title={selectedImage.file_name}
                                >
                                    {selectedImage.file_name}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">

                                    {selectedImage.mime_type || "-"}

                                </p>

                            </div>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                Selected

                            </span>

                        </div>

                    </div>

                )}

                {/* Continue in Message 3 */}
                                {/* ==========================================
                    Footer
                =========================================== */}

                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-5">

                    <div className="text-sm text-gray-500">

                        {selectedImage
                            ? "1 image selected"
                            : "No image selected"}

                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (selectedImage) {
                                    onSelect?.(selectedImage);
                                    onClose();
                                }
                            }}
                            disabled={!selectedImage}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Use Selected Image
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

ImagePickerModal.propTypes = {

    isOpen: PropTypes.bool.isRequired,

    media: PropTypes.array,

    loading: PropTypes.bool,

    filters: PropTypes.shape({

        search: PropTypes.string,

        type: PropTypes.string,

        sort: PropTypes.string,

    }).isRequired,

    totalItems: PropTypes.number,

    selectedImage: PropTypes.object,

    onClose: PropTypes.func.isRequired,

    onSearchChange: PropTypes.func.isRequired,

    onTypeChange: PropTypes.func.isRequired,

    onSortChange: PropTypes.func.isRequired,

    onResetFilters: PropTypes.func.isRequired,

    onPreview: PropTypes.func,

    onDownload: PropTypes.func,

    onDelete: PropTypes.func,

    onSelect: PropTypes.func.isRequired,

};

ImagePickerModal.defaultProps = {

    media: [],

    loading: false,

    totalItems: 0,

    selectedImage: null,

    onPreview: undefined,

    onDownload: undefined,

    onDelete: undefined,

};

export default ImagePickerModal;