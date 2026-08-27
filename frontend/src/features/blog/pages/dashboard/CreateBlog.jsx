import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BlogForm from "../../components/BlogForm";
import blogService from "../../services/blogService";
import categoryService from "../../../category/services/categoryService";
import tagService from "../../../tag/services/tagService";

const CreateBlog = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);

            const [categoryResponse, tagResponse] = await Promise.all([
                categoryService.getCategories(),
                tagService.getTags({ limit: 100 }),
            ]);

            setCategories(categoryResponse.data?.data?.categories || []);
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

    const handleCreateBlog = async (formData) => {
        try {
            setLoading(true);

            await blogService.createBlog(formData);

            toast.success("Blog created successfully.");

            navigate("/dashboard/blogs");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create blog."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Create Blog
                </h1>

                <p className="mt-2 text-gray-500">
                    Write and publish a new blog post.
                </p>
            </div>

            <BlogForm
                mode="create"
                categories={categories}
                tagOptions={tagOptions}
                loadingCategories={loadingCategories}
                loading={loading}
                onSubmit={handleCreateBlog}
            />

        </div>
    );
};

export default CreateBlog;
