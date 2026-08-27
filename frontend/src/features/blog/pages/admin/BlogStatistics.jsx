import { useEffect } from "react";
import {
    FileText,
    Eye,
    MessageSquare,
    Star,
    Clock,
    PenSquare,
} from "lucide-react";

import useBlog from "../../hooks/useBlog";

const StatCard = ({
    title,
    value,
    icon,
    color,
}) => (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-sm text-gray-500">

                    {title}

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    {value}

                </h2>

            </div>

            <div
                className={`rounded-xl p-4 ${color}`}
            >

                {icon}

            </div>

        </div>

    </div>

);

const BlogStatistics = () => {

    const {

        statistics,
        getStatistics,
        loading,

    } = useBlog();

    useEffect(() => {

        getStatistics();

    }, [getStatistics]);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading statistics...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Blog Statistics

                </h1>

                <p className="text-gray-500 mt-2">

                    Overview of blog performance.

                </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Blogs"
                    value={statistics.total_blogs}
                    icon={<FileText className="text-white" />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Published"
                    value={statistics.published_blogs}
                    icon={<PenSquare className="text-white" />}
                    color="bg-green-600"
                />

                <StatCard
                    title="Drafts"
                    value={statistics.draft_blogs}
                    icon={<Clock className="text-white" />}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Featured"
                    value={statistics.featured_blogs}
                    icon={<Star className="text-white" />}
                    color="bg-purple-600"
                />

                <StatCard
                    title="Views"
                    value={statistics.total_views}
                    icon={<Eye className="text-white" />}
                    color="bg-cyan-600"
                />

                <StatCard
                    title="Comments"
                    value={statistics.total_comments}
                    icon={<MessageSquare className="text-white" />}
                    color="bg-pink-600"
                />

            </div>

            {/* Most Viewed */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold">

                    Most Viewed Blogs

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-3 text-left">

                                Blog

                            </th>

                            <th className="py-3 text-left">

                                Views

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {statistics.popular_blogs?.map((blog) => (

                            <tr
                                key={blog.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {blog.title}

                                </td>

                                <td>

                                    {blog.views}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Categories */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold">

                    Category Statistics

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-3 text-left">

                                Category

                            </th>

                            <th className="py-3 text-left">

                                Blogs

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {statistics.categories?.map((category) => (

                            <tr
                                key={category.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {category.name}

                                </td>

                                <td>

                                    {category.total}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default BlogStatistics;