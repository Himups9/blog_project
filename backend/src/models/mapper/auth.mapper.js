class AuthMapper {

  /**
   * Basic user information.
   * Used after login/register.
   */
  toUserResponse(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    };
  }

  /**
   * Current authenticated user (/me).
   */
  toCurrentUser(user) {
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
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

}

export default AuthMapper();