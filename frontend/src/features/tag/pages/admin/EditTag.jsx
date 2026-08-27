import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import TagForm from "../../components/TagForm";
import tagService from "../../services/tagService";

const EditTag = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [tag, setTag] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Tag
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadTag();
    }, [id]);

    const loadTag = async () => {
        try {
            setPageLoading(true);

            const response = await tagService.getTag(id);

            setTag(response.data);

        } catch (error) {
            console.error(error);

            toast.error("Unable to load tag.");

            navigate("/admin/tags");

        } finally {
            setPageLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Update Tag
    |--------------------------------------------------------------------------
    */

    const handleUpdateTag = async (formData) => {
        try {
            setLoading(true);

            await tagService.updateTag(id, formData);

            toast.success("Tag updated successfully.");

            navigate("/admin/tags");

        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update tag."
            );

        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center py-20">

                <div className="text-lg font-medium text-gray-500">
                    Loading tag...
                </div>

            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Not Found
    |--------------------------------------------------------------------------
    */

    if (!tag) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

                <h2 className="text-2xl font-bold text-red-600">
                    Tag Not Found
                </h2>

                <p className="mt-2 text-gray-600">
                    The requested tag could not be found.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* ==========================================
                Header
            =========================================== */}

            <div>

                <h1 className="text-3xl font-bold">
                    Edit Tag
                </h1>

                <p className="mt-2 text-gray-500">
                    Update tag information.
                </p>

            </div>

            {/* ==========================================
                Form
            =========================================== */}

            <TagForm
                mode="edit"
                initialValues={tag}
                loading={loading}
                onSubmit={handleUpdateTag}
            />

        </div>
    );
};

export default EditTag;