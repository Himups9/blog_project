import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Search,
    Calendar,
    User,
    ArrowRight,
    X,
} from "lucide-react";

import useBlog from "../../hooks/useBlog";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatBlogDate } from "../../utils/formatBlogDate";

const SearchBlog = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);

    const {
        blogs,
        loading,
        error,
        fetchBlogs,
    } = useBlog();

    useEffect(() => {

        if (initialQuery.trim()) {

            fetchBlogs({
                search: initialQuery,
                status: "published",
            });

        }

    }, [initialQuery, fetchBlogs]);

    const handleSearch = (event) => {

        event.preventDefault();

        const keyword = query.trim();

        if (!keyword) {

            setSearchParams({});

            return;

        }

        setSearchParams({
            q: keyword,
        });

    };

    const clearSearch = () => {

        setQuery("");

        setSearchParams({});

    };

    return (

        <section className="bg-gray-50 py-16">

            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold">

                        Search Blogs

                    </h1>

                    <p className="mt-3 text-gray-500">

                        Search articles by title, category, tags or keywords.

                    </p>

                </div>

                <form
                    onSubmit={handleSearch}
                    className="mx-auto mb-12 max-w-3xl"
                >

                    <div className="relative">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search blogs..."
                            className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-28 focus:border-blue-500 focus:outline-none"
                        />

                        {query && (

                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-28 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                            >

                                <X size={18} />

                            </button>

                        )}

                        <button
                            type="submit"
                            className="absolute right-2 top-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >

                            Search

                        </button>

                    </div>

                </form>

                {loading && (

                    <div className="py-16 text-center">

                        <h2 className="text-lg font-semibold">

                            Searching...

                        </h2>

                    </div>

                )}

                {error && (

                    <div className="py-16 text-center">

                        <h2 className="text-red-600">

                            {error}

                        </h2>

                    </div>

                )}

                {!loading &&
                    !error &&
                    initialQuery &&
                    blogs.length === 0 && (

                    <div className="rounded-2xl bg-white p-16 text-center shadow">

                        <h2 className="text-2xl font-semibold">

                            No blogs found

                        </h2>

                        <p className="mt-4 text-gray-500">

                            No articles matched your search.

                        </p>

                    </div>

                )}

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

                                {blog.category && (

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                                        {blog.category.name}

                                    </span>

                                )}

                                <h2 className="mt-4 text-2xl font-semibold">

                                    {blog.title}

                                </h2>

                                <p className="mt-4 line-clamp-3 text-gray-600">

                                    {blog.excerpt}

                                </p>

                                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">

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

            </div>

        </section>

    );

};

export default SearchBlog;
