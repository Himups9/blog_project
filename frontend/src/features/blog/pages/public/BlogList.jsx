import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

import PageTransition from "../../../pages/shared/components/PageTransition";
import Hero from "../../../pages/shared/components/Hero";
import { heroData } from "../../../pages/data/heroData";

import useBlog from "../../hooks/useBlog";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatBlogDate } from "../../utils/formatBlogDate";

const truncateExcerpt = (excerpt, limit = 180) => {
    const text = excerpt?.trim();

    if (!text) return "Read the full article for more details...";
    if (text.length <= limit) return `${text.replace(/[.。]+$/, "")}...`;

    return `${text.slice(0, limit).trimEnd()}...`;
};

const getAuthorName = (blog) => {
    const author = blog.author;

    return author
        ? [author.firstName, author.lastName].filter(Boolean).join(" ") || "Unknown author"
        : "Unknown author";
};

const BlogImage = ({ blog }) => {
    const [failed, setFailed] = useState(false);
    const imageUrl = getImageUrl(blog.featuredImage);

    if (!imageUrl || failed) {
        return (
            <div
                className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-400"
            >
                Blog image
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={blog.title || "Blog post"}
            className="aspect-[16/9] w-full object-cover"
            onError={() => setFailed(true)}
        />
    );
};

const BlogMeta = ({ blog }) => (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
            <User size={15} aria-hidden="true" />
            {getAuthorName(blog)}
        </span>
        <span className="inline-flex items-center gap-2">
            <Clock3 size={15} aria-hidden="true" />
            {formatBlogDate(blog.publishedAt || blog.createdAt)}
        </span>
    </div>
);

const LargeBlogCard = ({ blog }) => (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="px-6 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
            <h2 className="text-[35px] font-semibold leading-tight text-slate-900">
                {blog.title}
            </h2>
        </div>
        <BlogImage blog={blog} />
        <div className="p-6 md:p-8">
            <p className="text-[18px] leading-8 text-slate-600">
                {truncateExcerpt(blog.excerpt)}
            </p>
            <div className="mt-6">
                <BlogMeta blog={blog} />
            </div>
            <Link
                to={`/blogs/${blog.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-700"
            >
                Read More
                <ArrowRight size={16} aria-hidden="true" />
            </Link>
        </div>
    </article>
);

const SmallBlogCard = ({ blog }) => (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="p-4 pb-3">
            <h3 className="line-clamp-2 font-semibold leading-snug text-slate-900">
                {blog.title}
            </h3>
        </div>
        <BlogImage blog={blog} />
        <div className="p-4 pt-3">
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
                {truncateExcerpt(blog.excerpt, 100)}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                <p className="inline-flex min-w-0 items-center gap-1.5 truncate">
                    <User size={14} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{getAuthorName(blog)}</span>
                </p>
                <p className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                    <Clock3 size={14} aria-hidden="true" />
                    {formatBlogDate(blog.publishedAt || blog.createdAt)}
                </p>
            </div>
            <Link
                to={`/blogs/${blog.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
                Read More
                <ArrowRight size={14} aria-hidden="true" />
            </Link>
        </div>
    </article>
);

const BlogList = () => {
    const { blogs, loading, error, fetchBlogs } = useBlog();
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBlogs({ status: "published" });
    }, [fetchBlogs]);

    const filteredBlogs = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return blogs;

        return blogs.filter((blog) => {
            const authorName = getAuthorName(blog).toLowerCase();

            return (
                blog.title?.toLowerCase().includes(keyword) ||
                blog.excerpt?.toLowerCase().includes(keyword) ||
                blog.category?.name?.toLowerCase().includes(keyword) ||
                authorName.includes(keyword)
            );
        });
    }, [blogs, search]);

    const featuredBlogs = filteredBlogs.slice(0, 3);
    const remainingBlogs = filteredBlogs.slice(3);

    if (loading) {
        return <div className="py-20 text-center text-xl font-semibold">Loading blogs...</div>;
    }

    if (error) {
        return <div className="py-20 text-center text-red-600">{error}</div>;
    }

    return (
        <PageTransition>
            <Hero {...heroData.blog} />
            <section className="bg-slate-50 py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {filteredBlogs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center text-xl font-semibold text-slate-700">
                            No blogs found.
                        </div>
                    ) : (
                        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
                            <main className="space-y-8">
                                {featuredBlogs.map((blog) => (
                                    <LargeBlogCard key={blog.id} blog={blog} />
                                ))}
                            </main>

                            <aside className="space-y-3 lg:sticky lg:top-6">
                                <div className="rounded-2xl">
                                    <label htmlFor="public-blog-search" className="sr-only">
                                        Search blogs
                                    </label>
                                    <div className="relative">
                                        <Search
                                            size={18}
                                            aria-hidden="true"
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            id="public-blog-search"
                                            type="search"
                                            placeholder="Search blogs..."
                                            value={search}
                                            onChange={(event) => setSearch(event.target.value)}
                                            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {remainingBlogs.map((blog) => (
                                        <SmallBlogCard key={blog.id} blog={blog} />
                                    ))}
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default BlogList;
