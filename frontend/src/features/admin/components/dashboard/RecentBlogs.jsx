import DashboardSection from "./DashboardSection";

export default function RecentBlogs({
    blogs = [],
}) {
    return (
        <DashboardSection title="Recent Blogs">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-3 text-left">
                                Title
                            </th>

                            <th className="py-3 text-left">
                                Category
                            </th>

                            <th className="py-3 text-left">
                                Status
                            </th>

                            <th className="py-3 text-left">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {blogs.map((blog) => (

                            <tr
                                key={blog.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="py-3">
                                    {blog.title}
                                </td>

                                <td className="py-3">
                                    {blog.category?.name || "-"}
                                </td>

                                <td className="py-3">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            blog.status === "PUBLISHED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {blog.status}
                                    </span>

                                </td>

                                <td className="py-3">
                                    {blog.createdAt
                                        ? new Date(
                                              blog.createdAt
                                          ).toLocaleDateString()
                                        : "-"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            {!blogs.length && (
                <div className="py-10 text-center text-slate-500">

                    No blogs found.

                </div>
            )}

        </DashboardSection>
    );
}
