import { useEffect } from "react";
import {
    Eye,
    Users,
    Heart,
    MessageSquare,
    Clock,
    TrendingUp,
    FileText,
    User,
} from "lucide-react";

import useBlog from "../../hooks/useBlog";

const AnalyticsCard = ({
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

                <h2 className="mt-2 text-3xl font-bold text-gray-900">

                    {value}

                </h2>

            </div>

            <div className={`rounded-xl p-4 ${color}`}>

                {icon}

            </div>

        </div>

    </div>

);

const BlogAnalytics = () => {

    const {

        analytics,
        getAnalytics,
        loading,

    } = useBlog();

    useEffect(() => {

        getAnalytics();

    }, [getAnalytics]);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading analytics...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Blog Analytics

                </h1>

                <p className="mt-2 text-gray-500">

                    Analyze blog performance and reader engagement.

                </p>

            </div>

            {/* Summary Cards */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <AnalyticsCard
                    title="Total Views"
                    value={analytics.total_views}
                    icon={<Eye className="text-white" />}
                    color="bg-blue-600"
                />

                <AnalyticsCard
                    title="Unique Visitors"
                    value={analytics.unique_visitors}
                    icon={<Users className="text-white" />}
                    color="bg-green-600"
                />

                <AnalyticsCard
                    title="Likes"
                    value={analytics.total_likes}
                    icon={<Heart className="text-white" />}
                    color="bg-pink-600"
                />

                <AnalyticsCard
                    title="Comments"
                    value={analytics.total_comments}
                    icon={<MessageSquare className="text-white" />}
                    color="bg-yellow-500"
                />

                <AnalyticsCard
                    title="Average Reading Time"
                    value={`${analytics.average_read_time} min`}
                    icon={<Clock className="text-white" />}
                    color="bg-indigo-600"
                />

                <AnalyticsCard
                    title="Published Blogs"
                    value={analytics.total_blogs}
                    icon={<FileText className="text-white" />}
                    color="bg-purple-600"
                />

            </div>

            {/* Trending Blogs */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">

                    <TrendingUp size={22} />

                    Trending Blogs

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

                            <th className="py-3 text-left">

                                Likes

                            </th>

                            <th className="py-3 text-left">

                                Comments

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {analytics.trending_blogs?.map((blog) => (

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

                                <td>

                                    {blog.likes}

                                </td>

                                <td>

                                    {blog.comments}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Top Authors */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">

                    <User size={22} />

                    Top Authors

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-3 text-left">

                                Author

                            </th>

                            <th className="py-3 text-left">

                                Blogs

                            </th>

                            <th className="py-3 text-left">

                                Views

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {analytics.top_authors?.map((author) => (

                            <tr
                                key={author.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {author.name}

                                </td>

                                <td>

                                    {author.total_blogs}

                                </td>

                                <td>

                                    {author.total_views}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Top Categories */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-semibold">

                    Top Categories

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

                            <th className="py-3 text-left">

                                Views

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {analytics.categories?.map((category) => (

                            <tr
                                key={category.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {category.name}

                                </td>

                                <td>

                                    {category.total_blogs}

                                </td>

                                <td>

                                    {category.total_views}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default BlogAnalytics;