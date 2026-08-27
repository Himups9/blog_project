import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    CalendarClock,
    Eye,
    Pencil,
    Upload,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import useBlog from "../../hooks/useBlog";

const ScheduledBlogs = () => {

    const {
        blogs,
        loading,
        error,
        fetchBlogs,
        publishBlog,
        deleteBlog,
    } = useBlog();

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchBlogs({
            status: "scheduled",
        });

    }, [fetchBlogs]);

    const filteredBlogs = useMemo(() => {

        if (!search.trim()) {

            return blogs;

        }

        const keyword = search.toLowerCase();

        return blogs.filter((blog) => (

            blog.title?.toLowerCase().includes(keyword) ||

            blog.author_name?.toLowerCase().includes(keyword) ||

            blog.category?.name?.toLowerCase().includes(keyword)

        ));

    }, [blogs, search]);

    const handlePublishNow = async (id) => {

        try {

            await publishBlog(id);

            toast.success("Blog published successfully.");

        } catch {

            toast.error("Unable to publish blog.");

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this scheduled blog?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteBlog(id);

            toast.success("Scheduled blog deleted.");

        } catch {

            toast.error("Unable to delete blog.");

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading scheduled blogs...

            </div>

        );

    }

    if (error) {

        return (

            <div className="py-20 text-center text-red-600">

                {error}

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Scheduled Blogs

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Manage blogs scheduled for future publication.

                    </p>

                </div>

                <div className="relative w-full md:w-80">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search scheduled blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Title

                            </th>

                            <th className="px-6 py-4 text-left">

                                Author

                            </th>

                            <th className="px-6 py-4 text-left">

                                Category

                            </th>

                            <th className="px-6 py-4 text-left">

                                Publish At

                            </th>

                            <th className="px-6 py-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredBlogs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-20 text-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <CalendarClock
                                            size={54}
                                            className="mb-4 text-gray-300"
                                        />

                                        <p className="text-lg font-medium text-gray-500">

                                            No scheduled blogs found.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredBlogs.map((blog) => (

                                <tr
                                    key={blog.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4 font-medium">

                                        {blog.title}

                                    </td>

                                    <td className="px-6 py-4">

                                        {blog.author_name}

                                    </td>

                                    <td className="px-6 py-4">

                                        {blog.category?.name || "-"}

                                    </td>

                                    <td className="px-6 py-4">

                                        {blog.publish_at || "-"}

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-2">

                                            <Link
                                                to={`/blogs/${blog.slug}`}
                                                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                                title="Preview"
                                            >

                                                <Eye size={18} />

                                            </Link>

                                            <Link
                                                to={`/admin/blogs/edit/${blog.id}`}
                                                className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                                                title="Edit"
                                            >

                                                <Pencil size={18} />

                                            </Link>

                                            <button
                                                onClick={() => handlePublishNow(blog.id)}
                                                className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                                                title="Publish Now"
                                            >

                                                <Upload size={18} />

                                            </button>

                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                                title="Delete"
                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ScheduledBlogs;