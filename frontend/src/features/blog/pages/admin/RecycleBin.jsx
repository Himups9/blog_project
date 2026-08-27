import { useEffect, useMemo, useState } from "react";
import {
    Trash2,
    RotateCcw,
    Search,
    Eye,
    AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import useBlog from "../../hooks/useBlog";

const RecycleBin = () => {

    const {
        blogs,
        loading,
        error,
        fetchBlogs,
        restoreBlog,
        permanentlyDeleteBlog,
    } = useBlog();

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchBlogs({
            deleted: true,
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

    const handleRestore = async (id) => {

        try {

            await restoreBlog(id);

            toast.success("Blog restored successfully.");

        } catch {

            toast.error("Unable to restore blog.");

        }

    };

    const handlePermanentDelete = async (id) => {

        const confirmed = window.confirm(

            "This action cannot be undone.\n\nPermanently delete this blog?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await permanentlyDeleteBlog(id);

            toast.success("Blog permanently deleted.");

        } catch {

            toast.error("Unable to delete blog.");

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center py-24">

                Loading recycle bin...

            </div>

        );

    }

    if (error) {

        return (

            <div className="py-24 text-center text-red-600">

                {error}

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">

                        Recycle Bin

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Restore deleted blogs or permanently remove them.

                    </p>

                </div>

                <div className="relative w-full lg:w-80">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                    />

                </div>

            </div>

            {/* Warning */}

            <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-5">

                <AlertTriangle
                    size={22}
                    className="mt-0.5 text-yellow-600"
                />

                <div>

                    <h3 className="font-semibold text-yellow-800">

                        Recycle Bin

                    </h3>

                    <p className="mt-1 text-sm text-yellow-700">

                        Blogs stored here are not visible on the website.
                        They can be restored or permanently deleted.

                    </p>

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

                                Deleted At

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

                                    <Trash2
                                        size={60}
                                        className="mx-auto mb-4 text-gray-300"
                                    />

                                    <p className="text-lg font-medium text-gray-500">

                                        Recycle Bin is empty.

                                    </p>

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

                                        {blog.deleted_at || "-"}

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

                                            <button
                                                onClick={() => handleRestore(blog.id)}
                                                className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                                                title="Restore"
                                            >

                                                <RotateCcw size={18} />

                                            </button>

                                            <button
                                                onClick={() => handlePermanentDelete(blog.id)}
                                                className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                                title="Delete Permanently"
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

export default RecycleBin;