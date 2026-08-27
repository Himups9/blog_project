import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Eye, Tag, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import useBlog from "../../hooks/useBlog";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatBlogDate } from "../../utils/formatBlogDate";
import { normalizeBlogContentForDisplay } from "../../utils/contentImages";

const getAuthorName = (blog) => {
    const author = blog.author;

    return author
        ? [author.firstName, author.lastName].filter(Boolean).join(" ") || "Unknown author"
        : "Unknown author";
};

const truncateExcerpt = (excerpt, limit = 110) => {
    const text = excerpt?.trim();

    if (!text) return "Read the full article for more details...";
    if (text.length <= limit) return `${text.replace(/[.。]+$/, "")}...`;

    return `${text.slice(0, limit).trimEnd()}...`;
};

const BlogImage = ({ blog, small = false }) => {
    const [failed, setFailed] = useState(false);
    const imageUrl = getImageUrl(blog.featuredImage);

    if (!imageUrl || failed) {
        return (
            <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                Blog image
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={blog.title || "Blog post"}
            className={`${small ? "rounded-lg" : ""} aspect-[16/9] w-full object-cover`}
            onError={() => setFailed(true)}
        />
    );
};

const LatestBlogCard = ({ blog }) => (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="p-4 pb-3">
            <h3 className="line-clamp-2 font-semibold leading-snug text-slate-900">
                {blog.title}
            </h3>
        </div>
        <BlogImage blog={blog} small />
        <div className="p-4 pt-3">
            <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                {truncateExcerpt(blog.excerpt)}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-500">
                <span className="inline-flex min-w-0 items-center gap-1.5 truncate">
                    <User size={14} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{getAuthorName(blog)}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                    <Clock3 size={14} aria-hidden="true" />
                    {formatBlogDate(blog.publishedAt || blog.createdAt)}
                </span>
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

const BlogDetails = () => {
    const { slug } = useParams();
    const articleRef = useRef(null);
    const [articleHeight, setArticleHeight] = useState(null);
    const {
        blog,
        blogs,
        loading,
        error,
        fetchBlogBySlug,
        fetchBlogs,
    } = useBlog();

    useEffect(() => {
        let active = true;

        const loadArticle = async () => {
            try {
                await fetchBlogBySlug(slug);

                if (active) {
                    await fetchBlogs({ status: "published", limit: 6 });
                }
            } catch {
                // The hook owns the user-facing error state.
            }
        };

        loadArticle();

        return () => {
            active = false;
        };
    }, [fetchBlogBySlug, fetchBlogs, slug]);

    const latestBlogs = blog
        ? blogs.filter((item) => item.slug !== blog.slug).slice(0, 5)
        : [];

    useLayoutEffect(() => {
        const article = articleRef.current;

        if (!article) return undefined;

        const updateHeight = () => setArticleHeight(article.offsetHeight);

        updateHeight();

        if (typeof ResizeObserver === "undefined") return undefined;

        const observer = new ResizeObserver(updateHeight);
        observer.observe(article);

        return () => observer.disconnect();
    }, [blog?.content, latestBlogs.length]);

    if (loading || !blog) {
        return (
            <div className="container mx-auto py-20 text-center">
                <div className="text-lg text-gray-600">
                    {error || (loading ? "Loading article..." : "Blog not found")}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-red-600">{error}</h2>
            </div>
        );
    }

    return (
        <section className="bg-slate-50 py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link
                    to="/blogs"
                    className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft size={18} aria-hidden="true" />
                    Back to Blogs
                </Link>

                <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
                    <article
                        ref={articleRef}
                        className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        <div className="px-6 pb-6 pt-6 md:px-10 md:pb-8 md:pt-8">
                            <h1 className="text-[35px] font-bold leading-tight text-gray-900">
                                {blog.title}
                            </h1>
                        </div>

                        <BlogImage blog={blog} />

                        <div className="p-6 md:p-10">
                            <div className="mb-8 flex flex-wrap gap-5 text-sm text-gray-500">
                                <span className="inline-flex items-center gap-2">
                                    <User size={16} aria-hidden="true" />
                                    {getAuthorName(blog)}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Clock3 size={16} aria-hidden="true" />
                                    {formatBlogDate(blog.publishedAt || blog.createdAt)}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Clock3 size={16} aria-hidden="true" />
                                    {blog.readingTime ?? 0} min read
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Eye size={16} aria-hidden="true" />
                                    {blog.viewCount ?? 0} views
                                </span>
                            </div>

                            <div className="prose prose-2xl max-w-none text-[22px] leading-[2] prose-blockquote:leading-[2] prose-blockquote:text-[22px] prose-img:mx-auto prose-img:h-auto prose-img:max-w-full prose-li:text-[22px] prose-li:leading-[2] prose-p:text-[22px] prose-p:leading-[2]">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: normalizeBlogContentForDisplay(
                                            blog.content
                                        ),
                                    }}
                                />
                            </div>

                            {blog.tags?.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="mb-4 text-lg font-semibold">Tags</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {blog.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="rounded-full bg-gray-100 px-4 py-2 text-sm"
                                            >
                                                <Tag size={14} className="mr-2 inline" aria-hidden="true" />
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    <aside
                        className="hidden min-h-0 space-y-4 overflow-y-auto overscroll-contain pr-1 lg:block"
                        style={articleHeight ? { height: `${articleHeight}px` } : undefined}
                    >
                        <h2 className="text-xl font-bold text-slate-900">Latest Blogs</h2>
                        {latestBlogs.map((latestBlog) => (
                            <LatestBlogCard key={latestBlog.id} blog={latestBlog} />
                        ))}
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;
