import slugify from "slugify";

import blogRepository from "./blog.repository.js";
import categoryRepository from "../category/category.repository.js";
import tagRepository from "../tag/tag.repository.js";

import blogMapper from "./blog.mapper.js";

import ApiError from "../../utils/ApiError.js";

import {
    optimizeImage,
} from "../../utils/image.js";

import {
    deleteUploadedFile,
    deleteUploadedFiles,
} from "../../utils/file.js";

import {
    BLOG_STATUS,
    ACTIVITY_ACTION,
    STATUS_CODES,
    MESSAGES,
    ROLES,
} from "../../constants/index.js";


/**
 * Calculate estimated reading time.
 */
const calculateReadingTime = (content = "") => {

    const cleanContent =
        String(content)
            .replace(/<[^>]*>/g, "")
            .trim();

    if (!cleanContent) {
        return 1;
    }

    const words =
        cleanContent
            .split(/\s+/)
            .filter(Boolean)
            .length;

    return Math.max(
        1,
        Math.ceil(words / 200)
    );
};


const extractInlineImagePaths = (content = "") => {
    const matches = String(content).matchAll(
        /\/uploads\/(blogs\/inline\/optimized\/[^"'\s)]+)/g
    );

    return [...matches].map((match) => match[1]);
};


/**
 * Generate blog slug.
 */
const generateSlug = (title) => {

    return slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });

};


class BlogService {

    /**
     * Process inline article images without changing the Blog schema.
     */
    async uploadInlineImages(files = []) {
        if (!Array.isArray(files) || files.length === 0) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "At least one inline image is required."
            );
        }

        const uploadedImages = [];

        try {
            for (const file of files) {
                const imagePaths = await optimizeImage(file, "blogs/inline", {
                    width: 1600,
                    preserveOriginal: false,
                    generateThumbnail: false,
                });

                if (!imagePaths?.optimizedPath) {
                    throw new ApiError(
                        STATUS_CODES.BAD_REQUEST,
                        "Unable to process inline image."
                    );
                }

                uploadedImages.push({
                    path: imagePaths.optimizedPath,
                    url: `/uploads/${imagePaths.optimizedPath}`,
                });
            }

            return uploadedImages;
        } catch (error) {
            await deleteUploadedFiles(
                uploadedImages.map((image) => image.path)
            );

            throw error;
        }
    }

    /**
     * Create Blog
     */
    async create(data, file, userId) {

        let featuredImage = null;

        // --------------------------------
        // 1. Validate Category
        // --------------------------------

        const category =
            await categoryRepository.findById(
                data.categoryId
            );

        if (!category) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.CATEGORY_NOT_FOUND
            );

        }


        // --------------------------------
        // 2. Generate Slug
        // --------------------------------

        const slug =
            data.slug || generateSlug(data.title);

        if (!slug) {

            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Unable to generate blog slug."
            );

        }


        // --------------------------------
        // 3. Check Slug
        // --------------------------------

        const existing =
            await blogRepository.findBySlug(slug);

        if (existing) {

            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.BLOG_SLUG_EXISTS
            );

        }


        // --------------------------------
        // 4. Validate Tags
        // --------------------------------

        if (data.tagIds?.length) {

            for (const tagId of data.tagIds) {

                const tag =
                    await tagRepository.findById(
                        tagId
                    );

                if (!tag) {

                    throw new ApiError(
                        STATUS_CODES.NOT_FOUND,
                        MESSAGES.TAG_NOT_FOUND
                    );

                }

            }

        }


        // --------------------------------
        // 5. Process Featured Image
        // --------------------------------

        if (file) {

            const imagePaths =
                await optimizeImage(
                    file,
                    "blogs"
                );

            featuredImage =
                imagePaths?.optimizedPath
                    ? `/uploads/${imagePaths.optimizedPath}`
                    : null;

        }


        // --------------------------------
        // 6. Normalize Status
        // --------------------------------

        const status =
            data.status ??
            BLOG_STATUS.DRAFT;


        // --------------------------------
        // 7. Calculate Reading Time
        // --------------------------------

        const readingTime =
            calculateReadingTime(
                data.content
            );


        try {

            // --------------------------------
            // 8. Create Blog
            // --------------------------------

            const blog =
                await blogRepository.create({

                    title: data.title,

                    slug,

                    excerpt:
                        data.excerpt ?? null,

                    content:
                        data.content,

                    featuredImage,

                    seoTitle:
                        data.seoTitle ?? null,

                    seoDescription:
                        data.seoDescription ?? null,

                    status,

                    isFeatured:
                        data.isFeatured ?? false,

                    readingTime,

                    author: {
                        connect: {
                            id: userId,
                        },
                    },

                    category: {
                        connect: {
                            id: data.categoryId,
                        },
                    },

                    tags: {
                        connect:
                            data.tagIds?.map(
                                (id) => ({
                                    id,
                                })
                            ) || [],
                    },

                    publishedAt:
                        status === BLOG_STATUS.PUBLISHED
                            ? new Date()
                            : null,

                });


            // --------------------------------
            // 9. Activity Log
            // --------------------------------

            await blogRepository.createActivityLog({

                userId,

                action:
                    ACTIVITY_ACTION.CREATE_BLOG,

                entity: "Blog",

                entityId:
                    blog.id,

            });


            // --------------------------------
            // 10. Response
            // --------------------------------

            return blogMapper.toDetailsResponse(
                blog
            );

        } catch (error) {

            // --------------------------------
            // Cleanup Uploaded Image
            // --------------------------------

            if (featuredImage) {

                await deleteUploadedFile(
                    featuredImage
                );

            }

            await deleteUploadedFiles(
                extractInlineImagePaths(data.content)
            );

            throw error;
        }

    }


    /**
     * Get Blog by ID
     */
    async getById(id) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }

        return blogMapper.toDetailsResponse(
            blog
        );

    }


    /**
     * Get Blog by Slug
     */
    async getBySlug(slug) {

        const blog =
            await blogRepository.findBySlug(slug);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }

        await blogRepository.incrementViews(
            blog.id
        );

        return blogMapper.toDetailsResponse(
            blog
        );

    }

    /**
     * Get Related Blogs
     */
    async getRelatedBlogs(id, limit = 5) {

        // Find current blog
        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }

        // Get tag IDs
        const tagIds =
            blog.tags?.map(
                (tag) => tag.id
            ) || [];

        const relatedBlogs =
            await blogRepository.findRelatedBlogs(
                blog.id,
                blog.category?.id,
                tagIds,
                limit
            );

        return relatedBlogs.map(
            blogMapper.toListResponse
        );

    }



    /**
     * Update Blog
     */
    async update(id, data, file, user) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }

        const previousInlineImages =
            extractInlineImagePaths(blog.content);


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            blog.author.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        // --------------------------------
        // Category Validation
        // --------------------------------

        if (data.categoryId) {

            const category =
                await categoryRepository.findById(
                    data.categoryId
                );

            if (!category) {

                throw new ApiError(
                    STATUS_CODES.NOT_FOUND,
                    MESSAGES.CATEGORY_NOT_FOUND
                );

            }

        }


        // --------------------------------
        // Slug
        // --------------------------------

        let slug =
            data.slug || blog.slug;

        if (
            !data.slug &&
            data.title &&
            data.title !== blog.title
        ) {

            slug =
                generateSlug(
                    data.title
                );

        }

        if (!slug) {

            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Unable to generate blog slug."
            );

        }

        if (slug !== blog.slug) {

            const existing =
                await blogRepository.findBySlug(
                    slug
                );

            if (
                existing &&
                existing.id !== id
            ) {

                throw new ApiError(
                    STATUS_CODES.CONFLICT,
                    MESSAGES.BLOG_SLUG_EXISTS
                );

            }

        }


        // --------------------------------
        // Tag Validation
        // --------------------------------

        if (data.tagIds?.length) {

            for (const tagId of data.tagIds) {

                const tag =
                    await tagRepository.findById(
                        tagId
                    );

                if (!tag) {

                    throw new ApiError(
                        STATUS_CODES.NOT_FOUND,
                        MESSAGES.TAG_NOT_FOUND
                    );

                }

            }

        }


        // --------------------------------
        // Image Processing
        // --------------------------------

        let newFeaturedImage =
            blog.featuredImage;

        let uploadedNewImage = null;

        if (file) {

            uploadedNewImage =
                await optimizeImage(
                    file,
                    "blogs"
                );

            newFeaturedImage =
                uploadedNewImage?.optimizedPath
                    ? `/uploads/${uploadedNewImage.optimizedPath}`
                    : null;

        }


        // --------------------------------
        // Status
        // --------------------------------

        const status =
            data.status ??
            blog.status;


        // --------------------------------
        // Published Date
        // --------------------------------

        let publishedAt =
            blog.publishedAt;

        if (
            status === BLOG_STATUS.PUBLISHED &&
            !blog.publishedAt
        ) {

            publishedAt =
                new Date();

        }


        // --------------------------------
        // Update
        // --------------------------------

        try {

            const updated =
                await blogRepository.update(
                    id,
                    {

                        title:
                            data.title ??
                            blog.title,

                        slug,

                        excerpt:
                            data.excerpt ??
                            blog.excerpt,

                        content:
                            data.content ??
                            blog.content,

                        featuredImage:
                            newFeaturedImage,

                        seoTitle:
                            data.seoTitle ??
                            blog.seoTitle,

                        seoDescription:
                            data.seoDescription ??
                            blog.seoDescription,

                        status,

                        isFeatured:
                            data.isFeatured ??
                            blog.isFeatured,

                        readingTime:
                            calculateReadingTime(
                                data.content ??
                                blog.content
                            ),

                        publishedAt,

                        category:
                            data.categoryId
                                ? {
                                    connect: {
                                        id:
                                            data.categoryId,
                                    },
                                }
                                : undefined,

                        tags:
                            data.tagIds
                                ? {
                                    set: [],
                                    connect:
                                        data.tagIds.map(
                                            (tagId) => ({
                                                id: tagId,
                                            })
                                        ),
                                }
                                : undefined,

                    }
                );


            // --------------------------------
            // Delete Old Image
            // --------------------------------

            if (
                uploadedNewImage &&
                blog.featuredImage
            ) {

                await deleteUploadedFile(
                    blog.featuredImage
                );

            }

            const currentInlineImages =
                extractInlineImagePaths(
                    data.content ?? blog.content
                );

            await deleteUploadedFiles(
                previousInlineImages.filter(
                    (imagePath) =>
                        !currentInlineImages.includes(imagePath)
                )
            );


            // --------------------------------
            // Activity Log
            // --------------------------------

            await blogRepository.createActivityLog({

                userId: user.id,

                action:
                    ACTIVITY_ACTION.UPDATE_BLOG,

                entity: "Blog",

                entityId:
                    updated.id,

            });


            return blogMapper.toDetailsResponse(
                updated
            );

        } catch (error) {

            // Remove newly uploaded image
            // if database update fails.

            if (uploadedNewImage) {

                await deleteUploadedFile(
                    uploadedNewImage.optimizedPath
                );

            }

            await deleteUploadedFiles(
                extractInlineImagePaths(data.content)
            );

            throw error;
        }

    }


    /**
     * Delete Blog
     */
    async delete(id, user) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            blog.author.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        // --------------------------------
        // Delete Database Record
        // --------------------------------

        await blogRepository.delete(id);


        // --------------------------------
        // Delete Featured Image
        // --------------------------------

        if (blog.featuredImage) {

            await deleteUploadedFile(
                blog.featuredImage
            );

        }

        await deleteUploadedFiles(
            extractInlineImagePaths(blog.content)
        );


        // --------------------------------
        // Activity Log
        // --------------------------------

        await blogRepository.createActivityLog({

            userId: user.id,

            action:
                ACTIVITY_ACTION.DELETE_BLOG,

            entity: "Blog",

            entityId: id,

        });


        return {
            success: true,
        };

    }


    /**
     * Publish Blog
     */
    async publish(id, user) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            blog.author.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        const updated =
            await blogRepository.update(
                id,
                {

                    status:
                        BLOG_STATUS.PUBLISHED,

                    publishedAt:
                        blog.publishedAt ??
                        new Date(),

                }
            );


        await blogRepository.createActivityLog({

            userId: user.id,

            action:
                ACTIVITY_ACTION.PUBLISH_BLOG,

            entity: "Blog",

            entityId: id,

        });


        return blogMapper.toDetailsResponse(
            updated
        );

    }


    /**
     * Archive Blog
     */
    async archive(id, user) {

        const blog =
            await blogRepository.findById(id);

        if (!blog) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.BLOG_NOT_FOUND
            );

        }


        // --------------------------------
        // Authorization
        // --------------------------------

        if (
            user.role !== ROLES.ADMIN &&
            blog.author.id !== user.id
        ) {

            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.FORBIDDEN
            );

        }


        const updated =
            await blogRepository.update(
                id,
                {

                    status:
                        BLOG_STATUS.ARCHIVED,

                }
            );


        await blogRepository.createActivityLog({

            userId: user.id,

            action:
                ACTIVITY_ACTION.UPDATE_BLOG,

            entity: "Blog",

            entityId: id,

        });


        return blogMapper.toDetailsResponse(
            updated
        );

    }


    /**
     * Get All Blogs
     */
    async getAll(query) {

        const {
            page = 1,
            limit = 10,
            search = "",
            status,
            categoryId,
            authorId,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = query;


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );

        const pageLimit =
            Math.max(
                1,
                Number(limit) || 10
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        const [
            blogs,
            total,
        ] = await Promise.all([

            blogRepository.findAll({

                skip,

                take:
                    pageLimit,

                search,

                status,

                categoryId,

                authorId,

                sortBy,

                sortOrder,

            }),

            blogRepository.count({

                search,

                status,

                categoryId,

                authorId,

            }),

        ]);


        return {

            data:
                blogs.map(
                    blogMapper.toListResponse
                ),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }


    /**
     * Public Published Blogs
     */
    async getPublished(query) {

        const {
            page = 1,
            limit = 10,
            search = "",
            categoryId,
        } = query;


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );

        const pageLimit =
            Math.max(
                1,
                Number(limit) || 10
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        const [
            blogs,
            total,
        ] = await Promise.all([

            blogRepository.findPublished({

                skip,

                take:
                    pageLimit,

                search,

                categoryId,

            }),

            blogRepository.count({

                status:
                    BLOG_STATUS.PUBLISHED,

                search,

                categoryId,

            }),

        ]);


        return {

            data:
                blogs.map(
                    blogMapper.toListResponse
                ),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }

    /**
     * Get Featured Blogs
     */
    async getFeaturedBlogs(query) {

        const {
            page = 1,
            limit = 10,
        } = query;


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );


        const pageLimit =
            Math.min(
                50,
                Math.max(
                    1,
                    Number(limit) || 10
                )
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        const [
            blogs,
            total,
        ] = await Promise.all([

            blogRepository.findFeaturedBlogs({

                skip,

                take:
                    pageLimit,

            }),

            blogRepository.countFeaturedBlogs(),

        ]);


        return {

            data:
                blogs.map(
                    blogMapper.toListResponse
                ),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }



    /**
     * Logged-in User Blogs
     */
    async getMyBlogs(userId, query) {

        const {
            page = 1,
            limit = 10,
            search = "",
            status,
        } = query;


        const pageNumber =
            Math.max(
                1,
                Number(page) || 1
            );

        const pageLimit =
            Math.max(
                1,
                Number(limit) || 10
            );


        const skip =
            (pageNumber - 1) *
            pageLimit;


        const [
            blogs,
            total,
        ] = await Promise.all([

            blogRepository.findAll({

                authorId:
                    userId,

                skip,

                take:
                    pageLimit,

                search,

                status,

            }),

            blogRepository.count({

                authorId:
                    userId,

                search,

                status,

            }),

        ]);


        return {

            data:
                blogs.map(
                    blogMapper.toListResponse
                ),

            pagination: {

                total,

                page:
                    pageNumber,

                limit:
                    pageLimit,

                totalPages:
                    Math.ceil(
                        total /
                        pageLimit
                    ),

            },

        };

    }


    /**
     * Blog Statistics
     */
    async statistics() {

        return blogRepository.getStatistics();

    }

}


export default new BlogService();
