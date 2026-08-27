import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import BlogForm from "../../components/BlogForm";
import useBlog from "../../hooks/useBlog";
import categoryService from "../../../category/services/categoryService";
import tagService from "../../../tag/services/tagService";

const EditAnyBlog = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        blog,
        loading,
        error,
        fetchBlog,
        updateBlog,
    } = useBlog();
    const [categories, setCategories] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [loadingCategories, setLoadingCategories] =
        useState(true);

    useEffect(() => {

        if (id) {

            fetchBlog(id);

        }

    }, [id, fetchBlog]);

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

            await updateBlog(id, formData);

            toast.success("Blog updated successfully.");

            navigate("/admin/blogs");

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Failed to update blog."
            );

        }

    };

    if (error && !blog) {

        return (

            <div className="flex min-h-100 items-center justify-center">

                <p className="text-lg text-red-600">

                    {error}

                </p>

            </div>

        );

    }

    if (!blog) {

        return (

            <div className="flex min-h-100 items-center justify-center">

                <p className="text-lg text-gray-500">

                    Loading blog...

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Edit Blog

                </h1>

                <p className="mt-2 text-gray-500">

                    Update the selected blog post.

                </p>

            </div>

            <div className="rounded-2xl bg-white p-8 shadow">

                <BlogForm
                    initialData={blog}
                    categories={categories}
                    tagOptions={tagOptions}
                    loadingCategories={loadingCategories}
                    onSubmit={handleSubmit}
                    loading={loading}
                    mode="edit"
                />

            </div>

        </div>

    );

};

export default EditAnyBlog;
