import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    RefreshCw,
    RotateCcw,
    Trash2,
} from "lucide-react";

import {
    getDeletedMedia,
    restoreMedia,
    permanentlyDeleteMedia,
} from "../services/mediaService";

const MediaTrash = () => {

    const [media, setMedia] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] =
        useState("");

    const loadDeletedMedia = async () => {

        setLoading(true);

        try {

            const response =
                await getDeletedMedia({
                    search,
                });

            setMedia(
                response.results || []
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load deleted media."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDeletedMedia();

    }, [search]);

    const handleRestore = async (
        item
    ) => {

        try {

            await restoreMedia(item.id);

            toast.success(
                "Media restored successfully."
            );

            loadDeletedMedia();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to restore media."
            );

        }

    };

    const handlePermanentDelete =
        async (item) => {

            try {

                await permanentlyDeleteMedia(
                    item.id
                );

                toast.success(
                    "Media permanently deleted."
                );

                loadDeletedMedia();

            } catch (error) {

                console.error(error);

                toast.error(
                    "Delete failed."
                );

            }

        };

    /* Continue in Message 2 */
        return (

        <div className="space-y-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Media Trash

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Restore deleted media or permanently remove it.

                    </p>

                </div>

                <button
                    type="button"
                    onClick={loadDeletedMedia}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <RefreshCw
                        size={18}
                        className={loading ? "animate-spin" : ""}
                    />

                    Refresh

                </button>

            </div>

            {/* ==========================================
                Search
            ========================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search deleted media..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

            </div>

            {/* ==========================================
                Media Table
            ========================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                {media.length === 0 ? (

                    <div className="py-20 text-center">

                        <Trash2
                            size={60}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-5 text-xl font-semibold text-gray-700">

                            Trash is Empty

                        </h2>

                        <p className="mt-2 text-gray-500">

                            No deleted media files found.

                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-6 py-4 text-left text-sm font-semibold">

                                        Preview

                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold">

                                        File Name

                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold">

                                        Deleted Date

                                    </th>

                                    <th className="px-6 py-4 text-right text-sm font-semibold">

                                        Actions

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {/* Continue in Message 3 */}
                                                                {media.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-t border-gray-200"
                                    >

                                        <td className="px-6 py-4">

                                            <img
                                                src={item.file_url}
                                                alt={
                                                    item.alt_text ||
                                                    item.file_name
                                                }
                                                className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                                            />

                                        </td>

                                        <td className="px-6 py-4">

                                            <div>

                                                <p
                                                    className="font-medium text-gray-900"
                                                    title={item.file_name}
                                                >
                                                    {item.file_name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">

                                                    {item.mime_type || "-"}

                                                </p>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">

                                            {item.deleted_at
                                                ? new Date(
                                                      item.deleted_at
                                                  ).toLocaleString()
                                                : "-"}

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-3">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRestore(item)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                                >

                                                    <RotateCcw size={16} />

                                                    Restore

                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handlePermanentDelete(item)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                                >

                                                    <Trash2 size={16} />

                                                    Delete Forever

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

};

export default MediaTrash;