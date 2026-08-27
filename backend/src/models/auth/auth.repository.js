import prisma from "../../config/prisma.js";

/**
 * Fields returned by the Current User (/me) endpoint.
 * Reuse this object whenever only public user data is needed.
 */
const currentUserSelect = {
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
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
};

class AuthRepository {
  // ======================================================
  // User
  // ======================================================

  /**
   * Find user by email.
   * Used during login and registration.
   */
  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        refreshTokens: true,
      },
    });
  }

  /**
   * Find user by ID.
   */
  async findUserById(id) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        blogs: true,
        comments: true,
        gallery: true,
      },
    });
  }

  /**
   * Check if email already exists.
   */
  async emailExists(email) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    return !!user;
  }

  /**
   * Create user.
   */
  async createUser(data) {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Update user.
   */
  async updateUser(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Update password.
   */
  async updatePassword(userId, password) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  /**
   * Update last login timestamp.
   */
  async updateLastLogin(id) {
    return prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  /**
   * Current authenticated user.
   */
  async findCurrentUser(id) {
    return prisma.user.findUnique({
      where: { id },
      select: currentUserSelect,
    });
  }

  /**
   * List users.
   * (Search, pagination, filters will be added later.)
   */
  async findUsers(options = {}) {
    return prisma.user.findMany(options);
  }

  /**
   * Count all users.
   */
  async countUsers() {
    return prisma.user.count();
  }

  /**
   * Count active users.
   */
  async countActiveUsers() {
    return prisma.user.count({
      where: {
        isActive: true,
      },
    });
  }

  /**
   * Count inactive users.
   */
  async countInactiveUsers() {
    return prisma.user.count({
      where: {
        isActive: false,
      },
    });
  }

  // ======================================================
  // Refresh Tokens
  // ======================================================

  /**
   * Save refresh token.
   */
  async createRefreshToken(data) {
    return prisma.refreshToken.create({
      data,
    });
  }

  /**
   * Find refresh token.
   */
  async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Delete refresh token.
   */
  async deleteRefreshToken(token) {
    return prisma.refreshToken.delete({
      where: {
        token,
      },
    });
  }

  /**
   * Delete all refresh tokens for a user.
   */
  async deleteUserRefreshTokens(userId) {
    return prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  // ======================================================
  // Password Reset
  // ======================================================

  /**
   * Create password reset token.
   */
  async createPasswordResetToken(data) {
    return prisma.passwordResetToken.create({
      data,
    });
  }

  /**
   * Find password reset token.
   */
  async findPasswordResetToken(token) {
    return prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }

  async findAuthUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
  }

  /**
   * Delete password reset token.
   */
  async deletePasswordResetToken(token) {
    return prisma.passwordResetToken.delete({
      where: {
        token,
      },
    });
  }

  /**
   * Delete all password reset tokens for a user.
   */
  async deleteUserPasswordResetTokens(userId) {
    return prisma.passwordResetToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  // ======================================================
  // Activity Log
  // ======================================================

  /**
   * Save activity log.
   */
  async createActivityLog(data) {
    return prisma.activityLog.create({
      data,
    });
  }
}

export default new AuthRepository();