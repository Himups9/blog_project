const authMapper = {
    toUserResponse(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone ?? null,
            profileImage: user.profileImage ?? null,
            bio: user.bio ?? null,
            facebookUsername: user.facebookUsername ?? null,
            gender: user.gender ?? null,
            dateOfBirth: user.dateOfBirth ?? null,
            position: user.position ?? null,
            role: user.role,
            isActive: user.isActive,
            isVerified: user.isVerified,
            lastLogin: user.lastLogin ?? null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },
};

export default authMapper;