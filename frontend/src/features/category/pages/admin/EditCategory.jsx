import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CategoryForm from "../../components/CategoryForm";
import categoryService from "../../services/categoryService";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load Category
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const loadCategory = async () => {
            if (!id) {
                toast.error("Category ID is missing.");
                navigate("/admin/categories");
                return;
            }

            try {
                setLoading(true);

                const response =
                    await categoryService.getCategory(id);

                const data =
                    response?.data?.data ||
                    response?.data?.category ||
                    response?.data;

                if (!data) {
                    throw new Error(
                        "Category data was not returned."
                    );
                }

                setCategory(data);
            } catch (error) {
                console.error(
                    "LOAD CATEGORY ERROR:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "Unable to load category."
                );

                navigate("/admin/categories");
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [id, navigate]);

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (values) => {
        try {
            setSaving(true);

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

            /*
             * Only send image when user selected
             * a new file.
             */
            if (values.image instanceof File) {
                formData.append(
                    "image",
                    values.image
                );
            }

            if (values.featuredImage instanceof File) {
                formData.append(
                    "featuredImage",
                    values.featuredImage
                );
            }

            await categoryService.updateCategory(
                id,
                formData
            );

            toast.success(
                "Category updated successfully."
            );

            navigate("/admin/categories");
        } catch (error) {
            console.error(
                "UPDATE CATEGORY ERROR:",
                error
            );

            console.error(
                "UPDATE API RESPONSE:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update category."
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="text-sm text-gray-500">
                    Loading category...
                </div>
            </div>
        );
    }

    if (!category) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <CategoryForm
                    mode="edit"
                    initialValues={{
                        name: category.name || "",
                        slug: category.slug || "",
                        description:
                            category.description || "",
                        image: category.image || null,
                        featuredImage:
                            category.featuredImage || null,
                    }}
                    loading={saving}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default EditCategory;
