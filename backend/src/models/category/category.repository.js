import prisma from "../../config/prisma.js";


const categorySelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    image: true,
    featuredImage: true,
    createdAt: true,
    updatedAt: true,
};


class CategoryRepository {

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    async create(data) {
        return prisma.category.create({
            data,
            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Find By ID
    |--------------------------------------------------------------------------
    */

    async findById(id) {

        if (!id) {
            return null;
        }

        return prisma.category.findUnique({
            where: {
                id,
            },
            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Find By Name
    |--------------------------------------------------------------------------
    */

    async findByName(name) {

        if (
            typeof name !== "string" ||
            !name.trim()
        ) {
            return null;
        }

        return prisma.category.findUnique({
            where: {
                name: name.trim(),
            },
            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Find By Slug
    |--------------------------------------------------------------------------
    */

    async findBySlug(slug) {

        if (
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            return null;
        }

        return prisma.category.findUnique({
            where: {
                slug: slug.trim(),
            },
            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Find All
    |--------------------------------------------------------------------------
    */

    async findAll({
        skip = 0,
        take = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "desc",
    } = {}) {

        const allowedSortFields = [
            "name",
            "createdAt",
            "updatedAt",
        ];

        const sortField =
            allowedSortFields.includes(sortBy)
                ? sortBy
                : "createdAt";

        const order =
            sortOrder === "asc"
                ? "asc"
                : "desc";

        const normalizedSearch =
            typeof search === "string"
                ? search.trim()
                : "";

        return prisma.category.findMany({

            where: normalizedSearch
                ? {
                    OR: [
                        {
                            name: {
                                contains: normalizedSearch,
                                mode: "insensitive",
                            },
                        },
                        {
                            slug: {
                                contains: normalizedSearch,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {},

            skip,
            take,

            orderBy: {
                [sortField]: order,
            },

            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Count
    |--------------------------------------------------------------------------
    */

    async count(search = "") {

        const normalizedSearch =
            typeof search === "string"
                ? search.trim()
                : "";

        return prisma.category.count({

            where: normalizedSearch
                ? {
                    OR: [
                        {
                            name: {
                                contains: normalizedSearch,
                                mode: "insensitive",
                            },
                        },
                        {
                            slug: {
                                contains: normalizedSearch,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {},
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    async update(id, data) {

        return prisma.category.update({
            where: {
                id,
            },

            data,

            select: categorySelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    async delete(id) {

        return prisma.category.delete({
            where: {
                id,
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Has Blogs
    |--------------------------------------------------------------------------
    */

    async hasBlogs(id) {

        const count =
            await prisma.blog.count({
                where: {
                    categoryId: id,
                },
            });

        return count > 0;
    }


    /*
    |--------------------------------------------------------------------------
    | Category Blogs
    |--------------------------------------------------------------------------
    */

    async getCategoryBlogs(
        id,
        {
            skip = 0,
            take = 10,
        } = {}
    ) {

        return prisma.blog.findMany({

            where: {
                categoryId: id,
            },

            skip,
            take,

            orderBy: {
                createdAt: "desc",
            },

            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },

                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {

        const totalCategories =
            await prisma.category.count();

        const categoriesWithBlogs =
            await prisma.category.count({
                where: {
                    blogs: {
                        some: {},
                    },
                },
            });

        return {
            totalCategories,

            categoriesWithBlogs,

            emptyCategories:
                totalCategories -
                categoriesWithBlogs,
        };
    }
}


export default new CategoryRepository();
