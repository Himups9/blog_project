import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CategoryForm from "../../components/CategoryForm";
import categoryService from "../../services/categoryService";

const CreateCategory = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append(
                "name",
                values.name?.trim() || ""
            );

            formData.append(
                "slug",
                values.slug?.trim() || ""
            );

            formData.append(
                "description",
                values.description?.trim() || ""
            );

            if (
                values.parentId
            ) {
                formData.append(
                    "parentId",
                    values.parentId
                );
            }

            if (
                values.image instanceof File
            ) {
                formData.append(
                    "image",
                    values.image
                );
            }

            if (
                values.featuredImage instanceof File
            ) {
                formData.append(
                    "featuredImage",
                    values.featuredImage
                );
            }

            // Debug
            console.log(
                "========== CATEGORY FORM DATA =========="
            );

            for (const [
                key,
                value,
            ] of formData.entries()) {
                console.log(
                    key,
                    value instanceof File
                        ? {
                            name: value.name,
                            type: value.type,
                            size: value.size,
                        }
                        : value
                );
            }

            await categoryService.createCategory(
                formData
            );

            toast.success(
                "Category created successfully."
            );

            navigate(
                "/admin/categories"
            );
        } catch (error) {
            console.error(
                "CREATE CATEGORY ERROR:",
                error
            );

            console.error(
                "SERVER RESPONSE:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    "Failed to create category."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <CategoryForm
                mode="create"
                loading={loading}
                onSubmit={handleSubmit}
            />

        </div>
    );
};

export default CreateCategory;