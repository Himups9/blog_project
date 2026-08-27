const blogMapper = {
    /**
     * Blog List Response
     */
    toListResponse(blog) {
        return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            featuredImage: blog.featuredImage,
            status: blog.status,
            isFeatured: blog.isFeatured,
            viewCount: blog.viewCount,
            readingTime: blog.readingTime,
            publishedAt: blog.publishedAt,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,

            author: blog.author
                ? {
                      id: blog.author.id,
                      firstName: blog.author.firstName,
                      lastName: blog.author.lastName,
                  }
                : null,

            category: blog.category
                ? {
                      id: blog.category.id,
                      name: blog.category.name,
                      slug: blog.category.slug,
                  }
                : null,

            tags:
                blog.tags?.map((tag) => ({
                    id: tag.id,
                    name: tag.name,
                    slug: tag.slug,
                })) || [],
        };
    },

    /**
     * Blog Details Response
     */
    toDetailsResponse(blog) {
        return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            featuredImage: blog.featuredImage,

            seoTitle: blog.seoTitle,
            seoDescription: blog.seoDescription,

            status: blog.status,
            isFeatured: blog.isFeatured,

            readingTime: blog.readingTime,
            viewCount: blog.viewCount,

            publishedAt: blog.publishedAt,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,

            author: blog.author
                ? {
                      id: blog.author.id,
                      firstName: blog.author.firstName,
                      lastName: blog.author.lastName,
                      profileImage: blog.author.profileImage,
                  }
                : null,

            category: blog.category
                ? {
                      id: blog.category.id,
                      name: blog.category.name,
                      slug: blog.category.slug,
                  }
                : null,

            tags:
                blog.tags?.map((tag) => ({
                    id: tag.id,
                    name: tag.name,
                    slug: tag.slug,
                })) || [],

            comments:
                blog.comments?.map((comment) => ({
                    id: comment.id,
                    content: comment.content,
                    status: comment.status,
                    createdAt: comment.createdAt,

                    user: comment.user
                        ? {
                              id: comment.user.id,
                              firstName: comment.user.firstName,
                              lastName: comment.user.lastName,
                              profileImage: comment.user.profileImage,
                          }
                        : null,
                })) || [],
        };
    },

    /**
     * Admin Response
     */
    toAdminResponse(blog) {
        return {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            status: blog.status,
            isFeatured: blog.isFeatured,
            viewCount: blog.viewCount,
            readingTime: blog.readingTime,
            publishedAt: blog.publishedAt,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,

            author: blog.author
                ? {
                      id: blog.author.id,
                      firstName: blog.author.firstName,
                      lastName: blog.author.lastName,
                      email: blog.author.email,
                  }
                : null,

            category: blog.category
                ? {
                      id: blog.category.id,
                      name: blog.category.name,
                  }
                : null,

            tags:
                blog.tags?.map((tag) => ({
                    id: tag.id,
                    name: tag.name,
                })) || [],

            commentsCount: blog._count?.comments ?? 0,
        };
    },
};

export default blogMapper;