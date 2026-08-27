import prisma from "../../config/prisma.js";

/*
|--------------------------------------------------------------------------
| User Select
|--------------------------------------------------------------------------
*/

const userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    profileImage: true,
    bio: true,
    facebookUsername: true,
    gender: true,
    dateOfBirth: true,
    position: true,
    role: true,
    isActive: true,
    isVerified: true,
    emailVerifiedAt: true,
    lastLogin: true,
    createdAt: true,
    updatedAt: true,
};


/*
|--------------------------------------------------------------------------
| User Repository
|--------------------------------------------------------------------------
*/

class UserRepository {

    /*
    |--------------------------------------------------------------------------
    | Find User By ID
    |--------------------------------------------------------------------------
    */

    async findById(id) {
        return prisma.user.findFirst({
            where: {
                id,
                deletedAt: null,
            },
            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Find User By Email
    |--------------------------------------------------------------------------
    */

    async findByEmail(email) {
        return prisma.user.findFirst({
            where: {
                email,
                deletedAt: null,
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Current Logged-in User
    |--------------------------------------------------------------------------
    */

    async findCurrentUser(id) {
        return prisma.user.findFirst({
            where: {
                id,
                deletedAt: null,
            },
            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Get Users
    |--------------------------------------------------------------------------
    */

    async getUsers({
        page = 1,
        limit = 10,
        search = "",
        ordering = "-createdAt",
    } = {}) {

        const safePage = Math.max(
            Number(page) || 1,
            1
        );

        const safeLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            100
        );

        const skip =
            (safePage - 1) * safeLimit;


        const allowedSortFields = [
            "createdAt",
            "updatedAt",
            "firstName",
            "lastName",
            "email",
            "lastLogin",
        ];


        const requestedField =
            typeof ordering === "string"
                ? ordering.replace(/^-/, "")
                : "createdAt";


        const sortField =
            allowedSortFields.includes(requestedField)
                ? requestedField
                : "createdAt";


        const sortOrder =
            typeof ordering === "string" &&
            ordering.startsWith("-")
                ? "desc"
                : "asc";


        const trimmedSearch =
            typeof search === "string"
                ? search.trim()
                : "";


        const where = {
            deletedAt: null,

            ...(trimmedSearch && {
                OR: [
                    {
                        firstName: {
                            contains: trimmedSearch,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastName: {
                            contains: trimmedSearch,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: trimmedSearch,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        };


        const [users, total] =
            await Promise.all([
                prisma.user.findMany({
                    where,
                    skip,
                    take: safeLimit,

                    orderBy: {
                        [sortField]: sortOrder,
                    },

                    select: userSelect,
                }),

                prisma.user.count({
                    where,
                }),
            ]);


        return {
            users,
            total,
        };
    }


    /*
    |--------------------------------------------------------------------------
    | Find All Users
    |--------------------------------------------------------------------------
    */

    async findAll({
        skip = 0,
        take = 10,
        search = "",
        role,
        isActive,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = {}) {

        const allowedSortFields = [
            "createdAt",
            "updatedAt",
            "firstName",
            "lastName",
            "email",
            "lastLogin",
            "role",
        ];


        const sortField =
            allowedSortFields.includes(sortBy)
                ? sortBy
                : "createdAt";


        const order =
            sortOrder === "asc"
                ? "asc"
                : "desc";


        return prisma.user.findMany({
            where: {
                deletedAt: null,

                ...(search && {
                    OR: [
                        {
                            firstName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            lastName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            email: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),

                ...(role && {
                    role,
                }),

                ...(typeof isActive === "boolean" && {
                    isActive,
                }),
            },

            skip,
            take,

            orderBy: {
                [sortField]: order,
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Count Users
    |--------------------------------------------------------------------------
    */

    async count({
        search = "",
        role,
        isActive,
    } = {}) {

        return prisma.user.count({
            where: {
                deletedAt: null,

                ...(search && {
                    OR: [
                        {
                            firstName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            lastName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            email: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),

                ...(role && {
                    role,
                }),

                ...(typeof isActive === "boolean" && {
                    isActive,
                }),
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    */

    async update(id, data) {
        const user = await this.findById(id);

        if (!user) {
            return null;
        }

        try {
            return await prisma.user.update({
                where: {
                    id,
                },
                data,
                select: userSelect,
            });
        } catch (error) {
            console.error(
                "========== PRISMA ERROR =========="
            );
            console.error(error);
            console.error(
                "=================================="
            );

            throw error;
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Update User - Compatibility
    |--------------------------------------------------------------------------
    */

    async updateUser(id, data = {}) {
        return this.update(id, data);
    }


    /*
    |--------------------------------------------------------------------------
    | Activate User
    |--------------------------------------------------------------------------
    */

    async activate(id) {

        const user =
            await this.findById(id);

        if (!user) {
            return null;
        }

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                isActive: true,
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    async deactivate(id) {

        const user =
            await this.findById(id);

        if (!user) {
            return null;
        }

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                isActive: false,
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Soft Delete User
    |--------------------------------------------------------------------------
    */

    async softDelete(id) {

        const user =
            await this.findById(id);

        if (!user) {
            return null;
        }

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                deletedAt: new Date(),
                isActive: false,
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Soft Delete User - Compatibility
    |--------------------------------------------------------------------------
    */

    async softDeleteUser(id) {
        return this.softDelete(id);
    }


    /*
    |--------------------------------------------------------------------------
    | Hard Delete User
    |--------------------------------------------------------------------------
    */

    async delete(id) {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Restore User
    |--------------------------------------------------------------------------
    */

    async restore(id) {

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                deletedAt: null,
                isActive: true,
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Verify Email
    |--------------------------------------------------------------------------
    */

    async verifyEmail(id) {

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                isVerified: true,
                emailVerifiedAt: new Date(),
            },

            select: userSelect,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Update Last Login
    |--------------------------------------------------------------------------
    */

    async updateLastLogin(id) {

        return prisma.user.update({
            where: {
                id,
            },

            data: {
                lastLogin: new Date(),
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Create Activity Log
    |--------------------------------------------------------------------------
    */

    async createActivityLog({
        userId,
        action,
        entity = null,
        entityId = null,
        ipAddress = null,
        userAgent = null,
    }) {

        return prisma.activityLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                ipAddress,
                userAgent,
            },
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Check If User Exists
    |--------------------------------------------------------------------------
    */

    async exists(id) {

        const count =
            await prisma.user.count({
                where: {
                    id,
                    deletedAt: null,
                },
            });

        return count > 0;
    }


    /*
    |--------------------------------------------------------------------------
    | Check Email Exists
    |--------------------------------------------------------------------------
    */

    async emailExists(email) {

        const count =
            await prisma.user.count({
                where: {
                    email,
                    deletedAt: null,
                },
            });

        return count > 0;
    }


    /*
    |--------------------------------------------------------------------------
    | User Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {

        const [
            totalUsers,
            activeUsers,
            inactiveUsers,
            verifiedUsers,
        ] = await Promise.all([

            prisma.user.count({
                where: {
                    deletedAt: null,
                },
            }),

            prisma.user.count({
                where: {
                    deletedAt: null,
                    isActive: true,
                },
            }),

            prisma.user.count({
                where: {
                    deletedAt: null,
                    isActive: false,
                },
            }),

            prisma.user.count({
                where: {
                    deletedAt: null,
                    isVerified: true,
                },
            }),

        ]);


        return {
            totalUsers,
            activeUsers,
            inactiveUsers,
            verifiedUsers,
        };
    }
}


export default new UserRepository();