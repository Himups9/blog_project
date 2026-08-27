import slugify from "slugify";

import tagRepository from "./tag.repository.js";
import tagMapper from "./tag.mapper.js";

import ApiError from "../../utils/ApiError.js";

import {
    STATUS_CODES,
    MESSAGES,
    ACTIVITY_ACTION,
} from "../../constants/index.js";

class TagService {

    /**
     * Create Tag
     */
    async create(data, userId) {

        const existingName =
            await tagRepository.findByName(data.name);

        if (existingName) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.TAG_ALREADY_EXISTS
            );
        }

        const slug = data.slug?.trim()
            ? slugify(data.slug, { lower: true, strict: true })
            : slugify(data.name, { lower: true, strict: true });

        const existingSlug =
            await tagRepository.findBySlug(slug);

        if (existingSlug) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.TAG_SLUG_EXISTS
            );
        }

        const tag = await tagRepository.create({
            ...data,
            slug,
        });

        await tagRepository.createActivityLog({
            userId,
            action: ACTIVITY_ACTION.CREATE_TAG,
            entity: "Tag",
            entityId: tag.id,
        });

        return tagMapper.toResponse(tag);
    }

    /**
     * Get All Tags
     */
    async getAll(query) {

        const page = Number(query.page || 1);
        const limit = Number(query.limit || 10);

        const skip = (page - 1) * limit;

        const [tags, total] = await Promise.all([

            tagRepository.findAll({
                skip,
                take: limit,
                search: query.search,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),

            tagRepository.count(query.search),

        ]);

        return {

            items: tagMapper.toResponseList(tags),

            pagination: {

                page,

                limit,

                total,

                totalPages: Math.ceil(total / limit),

            },

        };

    }

    /**
     * Get Tag By ID
     */
    async getById(id) {

        const tag =
            await tagRepository.findById(id);

        if (!tag) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.TAG_NOT_FOUND
            );

        }

        return tagMapper.toResponse(tag);

    }

    /**
     * Get Tag By Slug
     */
    async getBySlug(slug) {

        const tag =
            await tagRepository.findBySlug(slug);

        if (!tag) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.TAG_NOT_FOUND
            );

        }

        return tagMapper.toResponse(tag);

    }

    /**
     * Update Tag
     */
    async update(id, data, userId) {

        const tag =
            await tagRepository.findById(id);

        if (!tag) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.TAG_NOT_FOUND
            );

        }

        if (data.name && data.name !== tag.name) {

            const existingName =
                await tagRepository.findByName(data.name);

            if (existingName) {

                throw new ApiError(
                    STATUS_CODES.CONFLICT,
                    MESSAGES.TAG_ALREADY_EXISTS
                );

            }

        }

        let slug = tag.slug;

        if (data.slug || data.name) {

            slug = slugify(
                data.slug || data.name,
                {
                    lower: true,
                    strict: true,
                }
            );

            const existingSlug =
                await tagRepository.findBySlug(slug);

            if (
                existingSlug &&
                existingSlug.id !== id
            ) {

                throw new ApiError(
                    STATUS_CODES.CONFLICT,
                    MESSAGES.TAG_SLUG_EXISTS
                );

            }

        }

        const updated =
            await tagRepository.update(id, {

                ...data,

                slug,

            });

        await tagRepository.createActivityLog({

            userId,

            action: ACTIVITY_ACTION.UPDATE_TAG,

            entity: "Tag",

            entityId: id,

        });

        return tagMapper.toResponse(updated);

    }

    /**
     * Delete Tag
     */
    async delete(id, userId) {

        const tag =
            await tagRepository.findById(id);

        if (!tag) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.TAG_NOT_FOUND
            );

        }

        const hasBlogs =
            await tagRepository.hasBlogs(id);

        if (hasBlogs) {

            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.TAG_HAS_BLOGS
            );

        }

        await tagRepository.delete(id);

        await tagRepository.createActivityLog({

            userId,

            action: ACTIVITY_ACTION.DELETE_TAG,

            entity: "Tag",

            entityId: id,

        });

        return true;

    }

    /**
     * Tag Statistics
     */
    async getStatistics() {

        const statistics =
            await tagRepository.getStatistics();

        return tagMapper.toStatistics(statistics);

    }

    /**
     * Blogs By Tag
     */
    async getTagBlogs(id, query) {

        const tag =
            await tagRepository.findById(id);

        if (!tag) {

            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.TAG_NOT_FOUND
            );

        }

        const page = Number(query.page || 1);

        const limit = Number(query.limit || 10);

        const blogs =
            await tagRepository.getTagBlogs(id, {

                skip: (page - 1) * limit,

                take: limit,

            });

        return blogs;

    }

}

export default new TagService();