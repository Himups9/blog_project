class UserMapper {
    /**
     * User Response
     */
    toUserResponse(user) {
        if (!user) return null;

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
            bio: user.bio,
            facebookUsername: user.facebookUsername,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            position: user.position,

            role: user.role,

            isActive: user.isActive,
            isVerified: user.isVerified,
            emailVerifiedAt: user.emailVerifiedAt,

            lastLogin: user.lastLogin,

            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    /**
     * User List Response
     */
    toUserList(users = []) {
        return users.map((user) => this.toUserResponse(user));
    }

    /**
     * Admin User Table
     */
    toAdminTable(users = []) {
        return users.map((user) => ({
            id: user.id,

            fullName: `${user.firstName} ${user.lastName}`,

            email: user.email,

            role: user.role,

            isActive: user.isActive,

            isVerified: user.isVerified,

            lastLogin: user.lastLogin,

            createdAt: user.createdAt,

            profileImage: user.profileImage,
        }));
    }

    /**
     * Pagination Response
     */
    toPagination({
        users,
        total,
        page,
        limit,
    }) {
        return {
            users: this.toUserList(users),

            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),

                hasNextPage:
                    page < Math.ceil(total / limit),

                hasPreviousPage:
                    page > 1,
            },
        };
    }

    /**
     * Dashboard Statistics
     */
    toStatistics(stats) {
        return {
            totalUsers: stats.totalUsers,
            activeUsers: stats.activeUsers,
            inactiveUsers: stats.inactiveUsers,
            verifiedUsers: stats.verifiedUsers,
        };
    }
}

export default new UserMapper();