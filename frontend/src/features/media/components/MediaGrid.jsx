import PropTypes from "prop-types";
import MediaCard from "./MediaCard";

const MediaGrid = ({
    media = [],

    loading = false,

    selectable = false,

    selectedItems = [],

    onSelect,

    onPreview,

    onDownload,

    onDelete,
}) => {

    if (loading) {

        return (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {Array.from({ length: 8 }).map((_, index) => (

                    <div
                        key={index}
                        className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                    >

                        <div className="aspect-square bg-gray-200" />

                        <div className="space-y-3 p-4">

                            <div className="h-4 rounded bg-gray-200" />

                            <div className="h-4 w-2/3 rounded bg-gray-200" />

                            <div className="h-10 rounded bg-gray-200" />

                        </div>

                    </div>

                ))}

            </div>

        );

    }

    /* Continue in Message 2 */

        if (!loading && media.length === 0) {

        return (

            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16">

                <div className="mb-4 rounded-full bg-gray-100 p-5">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75L6 12m0 0l3.75 3.75M6 12V3.75m15.75 4.5L18 4.5m0 0l-3.75 3.75M18 4.5v8.25M3.75 18h16.5"
                        />

                    </svg>

                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                    No Media Found
                </h3>

                <p className="mt-2 max-w-md text-center text-gray-500">
                    There are no media files available.
                    Upload your first image to start building
                    your media library.
                </p>

            </div>

        );

    }

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {media.map((item) => (

                <MediaCard
                    key={item.id}
                    media={item}
                    selectable={selectable}
                    selected={selectedItems.includes(
                        item.id
                    )}
                    onSelect={() =>
                        onSelect?.(item)
                    }
                    onPreview={() =>
                        onPreview?.(item)
                    }
                    onDownload={() =>
                        onDownload?.(item)
                    }
                    onDelete={() =>
                        onDelete?.(item)
                    }
                />

            ))}

        </div>

    );
    MediaGrid.propTypes = {

    media: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,

            file_name: PropTypes.string.isRequired,

            file_url: PropTypes.string.isRequired,

            mime_type: PropTypes.string,

            file_size: PropTypes.number,

            width: PropTypes.number,

            height: PropTypes.number,

            alt_text: PropTypes.string,

            created_at: PropTypes.string,

        })

    ),

    loading: PropTypes.bool,

    selectable: PropTypes.bool,

    selectedItems: PropTypes.arrayOf(

        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])

    ),

    onSelect: PropTypes.func,

    onPreview: PropTypes.func,

    onDownload: PropTypes.func,

    onDelete: PropTypes.func,

};

MediaGrid.defaultProps = {

    media: [],

    loading: false,

    selectable: false,

    selectedItems: [],

    onSelect: undefined,

    onPreview: undefined,

    onDownload: undefined,

    onDelete: undefined,

};
}

export default MediaGrid;