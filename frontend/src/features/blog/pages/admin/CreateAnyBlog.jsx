import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BlogForm from "../../components/BlogForm";
import useBlog from "../../hooks/useBlog";
import categoryService from "../../../category/services/categoryService";
import tagService from "../../../tag/services/tagService";

const CreateAnyBlog = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const {
        createBlog,
        loading,
    } = useBlog();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const [categoryResponse, tagResponse] = await Promise.all([
                    categoryService.getCategories(),
                    tagService.getTags({ limit: 100 }),
                ]);
                setCategories(
                    categoryResponse.data?.data?.categories || []
                );
                setTagOptions(
                    (tagResponse.data?.data?.items || []).map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                    }))
                );
            } catch (error) {
                console.error(error);
                toast.error("Failed to load categories.");
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (formData) => {

        try {

            await createBlog(formData);

            toast.success("Blog created successfully.");

            navigate("/admin/blogs");

        } catch (error) {

            toast.error(

                error.response?.data?.detail ||

                error.response?.data?.message ||

                "Failed to create blog."

            );

        }

    };

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Create New Blog

                </h1>

                <p className="mt-2 text-gray-500">

                    Create and publish a new blog from the administration panel.

                </p>

            </div>

            {/* Form Card */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <BlogForm
                    onSubmit={handleSubmit}
                    categories={categories}
                    tagOptions={tagOptions}
                    loadingCategories={loadingCategories}
                    loading={loading}
                    mode="create"
                />

            </div>

        </div>

    );

};

export default CreateAnyBlog;
