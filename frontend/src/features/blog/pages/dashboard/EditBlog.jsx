import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import BlogForm from "../../components/BlogForm";
import blogService from "../../services/blogService";
import categoryService from "../../../category/services/categoryService";
import tagService from "../../../tag/services/tagService";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [categories, setCategories] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            setLoadingCategories(true);

            const [blogResponse, categoryResponse] = await Promise.all([
                blogService.getBlog(id),
                categoryService.getCategories(),
            ]);

            const tagResponse = await tagService.getTags({ limit: 100 });

            setBlog(blogResponse.data?.data || blogResponse.data);
            setCategories(categoryResponse.data?.data?.categories || []);
            setTagOptions(
                (tagResponse.data?.data?.items || []).map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                }))
            );
        } catch (error) {
            console.error(error);

            toast.error("Failed to load blog.");

            navigate("/dashboard/blogs");
        } finally {
            setLoading(false);
            setLoadingCategories(false);
        }
    };

    const handleUpdateBlog = async (formData) => {
        try {
            setUpdating(true);

            await blogService.updateBlog(id, formData);

            toast.success("Blog updated successfully.");

            navigate("/dashboard/blogs");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to update blog."
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">
                    Loading blog...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Blog
                </h1>

                <p className="mt-2 text-gray-500">
                    Update your blog information.
                </p>
            </div>

            <BlogForm
                mode="edit"
                initialData={blog}
                categories={categories}
                tagOptions={tagOptions}
                loadingCategories={loadingCategories}
                loading={updating}
                onSubmit={handleUpdateBlog}
            />
        </div>
    );
};

export default EditBlog;
