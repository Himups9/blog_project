import { useEffect, useState } from "react";
import {
    AlertTriangle,
    Eye,
    CheckCircle,
    Trash2,
    Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import useBlog from "../../hooks/useBlog";

const ReportedBlogs = () => {

    const {
        blogs,
        loading,
        error,
        fetchBlogs,
        deleteBlog,
    } = useBlog();

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchBlogs({
            reported: true,
        });

    }, [fetchBlogs]);

    const filteredBlogs = blogs.filter((blog) => {

        const keyword = search.toLowerCase();

        return (
            blog.title?.toLowerCase().includes(keyword) ||
            blog.author_name?.toLowerCase().includes(keyword)
        );

    });

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteBlog(id);

            toast.success("Blog deleted successfully.");

        } catch {

            toast.error("Unable to delete blog.");

        }

    };

    const handleResolve = (title) => {

        toast.success(`Report resolved for "${title}".`);

    };

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading reported blogs...

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

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Reported Blogs

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Review blogs reported by users.

                    </p>

                </div>

                <div className="relative w-80">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border py-2 pl-10 pr-4"
                    />

                </div>

            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Blog

                            </th>

                            <th className="px-6 py-4 text-left">

                                Author

                            </th>

                            <th className="px-6 py-4 text-left">

                                Reports

                            </th>

                            <th className="px-6 py-4 text-left">

                                Status

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
                                    colSpan="5"
                                    className="py-12 text-center text-gray-500"
                                >

                                    No reported blogs found.

                                </td>

                            </tr>

                        ) : (

                            filteredBlogs.map((blog) => (

                                <tr
                                    key={blog.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">

                                        <div className="font-medium">

                                            {blog.title}

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        {blog.author_name}

                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">

                                            <AlertTriangle size={15} />

                                            {blog.report_count || 1}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                                            Under Review

                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <Link
                                                to={`/admin/blogs/${blog.id}`}
                                                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                            >

                                                <Eye size={18} />

                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleResolve(blog.title)
                                                }
                                                className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                                            >

                                                <CheckCircle size={18} />

                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(blog.id)
                                                }
                                                className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
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

export default ReportedBlogs;