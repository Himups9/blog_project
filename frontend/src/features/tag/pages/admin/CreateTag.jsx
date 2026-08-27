import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TagForm from "../../components/TagForm";
import tagService from "../../services/tagService";

const CreateTag = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Create Tag
    |--------------------------------------------------------------------------
    */

    const handleCreateTag = async (formData) => {
        try {
            setLoading(true);

            await tagService.createTag(formData);

            toast.success("Tag created successfully.");

            navigate("/admin/tags");

        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create tag."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* ==========================================
                Header
            =========================================== */}

            <div>

                <h1 className="text-3xl font-bold">
                    Create Tag
                </h1>

                <p className="mt-2 text-gray-500">
                    Create a new tag to organize blog posts.
                </p>

            </div>

            {/* ==========================================
                Form
            =========================================== */}

            <TagForm
                mode="create"
                loading={loading}
                onSubmit={handleCreateTag}
            />

        </div>
    );
};

export default CreateTag;