import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Calendar,
    User,
    FolderOpen,
    ArrowRight,
} from "lucide-react";

import useBlog from "../../hooks/useBlog";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatBlogDate } from "../../utils/formatBlogDate";

const CategoryBlogs = () => {

    const { slug } = useParams();

    const {
        blogs,
        loading,
        error,
        fetchBlogs,
    } = useBlog();

    useEffect(() => {

        fetchBlogs({
            category: slug,
            status: "published",
        });

    }, [slug, fetchBlogs]);

    if (loading) {

        return (

            <section className="py-20 text-center">

                <h2 className="text-xl font-semibold">

                    Loading blogs...

                </h2>

            </section>

        );

    }

    if (error) {

        return (

            <section className="py-20 text-center">

                <h2 className="text-red-600">

                    {error}

                </h2>

            </section>

        );

    }

    return (

        <section className="bg-gray-50 py-16">

            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-12">

                    <div className="mb-4 flex items-center gap-3">

                        <FolderOpen
                            size={28}
                            className="text-blue-600"
                        />

                        <h1 className="text-4xl font-bold">

                            {slug?.replaceAll("-", " ")}

                        </h1>

                    </div>

                    <p className="text-gray-500">

                        Browse all articles in this category.

                    </p>

                </div>

                {blogs.length === 0 ? (

                    <div className="rounded-2xl bg-white p-16 text-center shadow">

                        <h3 className="text-2xl font-semibold">

                            No blogs found

                        </h3>

                        <p className="mt-4 text-gray-500">

                            There are currently no published blogs in this
                            category.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {blogs.map((blog) => (

                            <article
                                key={blog.id}
                                className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                {getImageUrl(blog.featuredImage) && (

                                    <img
                                        src={getImageUrl(blog.featuredImage)}
                                        alt={blog.title}
                                        className="h-56 w-full object-cover"
                                    />

                                )}

                                <div className="p-6">

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                                        {blog.category?.name}

                                    </span>

                                    <h2 className="mt-4 text-2xl font-semibold">

                                        {blog.title}

                                    </h2>

                                    <p className="mt-4 line-clamp-3 text-gray-600">

                                        {blog.excerpt}

                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">

                                        <span className="flex items-center gap-2">

                                            <User size={15} />

                                            {blog.author
                                                ? [blog.author.firstName, blog.author.lastName].filter(Boolean).join(" ")
                                                : "Unknown author"}

                                        </span>

                                        <span className="flex items-center gap-2">

                                            <Calendar size={15} />

                                            {formatBlogDate(blog.publishedAt || blog.createdAt)}

                                        </span>

                                    </div>

                                    <Link
                                        to={`/blogs/${blog.slug}`}
                                        className="mt-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                                    >

                                        Read More

                                        <ArrowRight size={16} />

                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

};

export default CategoryBlogs;
