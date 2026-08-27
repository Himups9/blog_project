import PropTypes from "prop-types";
import {
    CheckSquare,
    ImagePlus,
    RefreshCw,
    Trash2,
    XSquare,
} from "lucide-react";

const MediaToolbar = ({
    selectedCount = 0,
    loading = false,
    onUpload,
    onRefresh,
    onSelectAll,
    onClearSelection,
    onDeleteSelected,
}) => {

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* ======================================
                    Left
                ====================================== */}

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        Media Library
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage uploaded images and media files.
                    </p>

                </div>


                {/* ======================================
                    Right
                ====================================== */}

                <div className="flex flex-wrap items-center gap-3">

                    {/* Upload */}

                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <ImagePlus size={18} />

                        Upload

                    </button>


                    {/* Refresh */}

                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RefreshCw
                            size={18}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>


                    {/* Select All */}

                    <button
                        type="button"
                        onClick={onSelectAll}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <CheckSquare size={18} />

                        Select All

                    </button>


                    {/* Clear Selection */}

                    <button
                        type="button"
                        onClick={onClearSelection}
                        disabled={
                            loading ||
                            selectedCount === 0
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <XSquare size={18} />

                        Clear

                    </button>


                    {/* Delete Selected */}

                    <button
                        type="button"
                        onClick={onDeleteSelected}
                        disabled={
                            loading ||
                            selectedCount === 0
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <Trash2 size={18} />

                        Delete Selected

                    </button>

                </div>

            </div>


            {/* ======================================
                Footer
            ====================================== */}

            <div className="mt-5 border-t border-gray-200 pt-4">

                <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">

                    {/* Selected Count */}

                    <div className="text-gray-600">

                        {selectedCount > 0 ? (
                            <>
                                <span className="font-semibold text-blue-600">
                                    {selectedCount}
                                </span>{" "}

                                media
                                {selectedCount !== 1 && " files"}{" "}
                                selected
                            </>
                        ) : (
                            "No media files selected"
                        )}

                    </div>


                    {/* Bulk Actions Status */}

                    {selectedCount > 0 && (

                        <div className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

                            Bulk actions enabled

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};


/* ======================================
   PropTypes
====================================== */

MediaToolbar.propTypes = {

    selectedCount:
        PropTypes.number,

    loading:
        PropTypes.bool,

    onUpload:
        PropTypes.func.isRequired,

    onRefresh:
        PropTypes.func.isRequired,

    onSelectAll:
        PropTypes.func.isRequired,

    onClearSelection:
        PropTypes.func.isRequired,

    onDeleteSelected:
        PropTypes.func.isRequired,

};


export default MediaToolbar;