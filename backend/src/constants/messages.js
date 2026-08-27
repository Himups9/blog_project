const MESSAGES = {
  // ==========================
  // General
  // ==========================
  SUCCESS: "Success.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Validation failed.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
  UNAUTHORIZED: "Unauthorized.",
  FORBIDDEN: "Forbidden.",

  // ==========================
  // Authentication
  // ==========================
  REGISTER_SUCCESS: "Registration successful.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",

  LOGIN_FAILED: "Invalid email or password.",
  EMAIL_ALREADY_EXISTS: "Email already exists.",
  ACCOUNT_DEACTIVATED: "Your account has been deactivated.",
  USER_NOT_FOUND: "User not found.",

  CURRENT_USER: "Current user retrieved successfully.",

  ACCESS_TOKEN_REFRESHED: "Access token refreshed successfully.",

  INVALID_REFRESH_TOKEN: "Invalid refresh token.",
  REFRESH_TOKEN_EXPIRED: "Refresh token has expired.",

  PASSWORD_RESET_EMAIL_SENT:
    "If an account exists, password reset instructions have been sent.",

  PASSWORD_RESET_SUCCESS:
    "Password reset successfully.",

  INVALID_RESET_TOKEN:
    "Invalid password reset token.",

  RESET_TOKEN_EXPIRED:
    "Password reset token has expired.",

  // ==========================
  // Users
  // ==========================
  USER_UPDATED: "User updated successfully.",
  USER_DELETED: "User deleted successfully.",
  USER_ACTIVATED: "User activated successfully.",
  USER_DEACTIVATED: "User deactivated successfully.",
  USER_NOT_FOUND: "User not found.",
  SUCCESS: "Success.",

  // ==========================
  // Blogs
  // ==========================
  BLOG_CREATED: "Blog created successfully.",
  BLOG_UPDATED: "Blog updated successfully.",
  BLOG_DELETED: "Blog deleted successfully.",

  // ==========================
  // Categories
  // ==========================
  CATEGORY_CREATED: "Category created successfully.",
  CATEGORY_UPDATED: "Category updated successfully.",
  CATEGORY_DELETED: "Category deleted successfully.",

  CATEGORY_ALREADY_EXISTS: "Category already exists.",
  CATEGORY_SLUG_EXISTS: "Category slug already exists.",
  CATEGORY_NOT_FOUND: "Category not found.",
  CATEGORY_HAS_BLOGS: "Cannot delete category because it contains blogs.",

  // ==========================
  // Tags
  // ==========================
  TAG_CREATED: "Tag created successfully.",
  TAG_UPDATED: "Tag updated successfully.",
  TAG_DELETED: "Tag deleted successfully.",

  TAG_ALREADY_EXISTS: "Tag already exists.",
  TAG_SLUG_EXISTS: "Tag slug already exists.",
  TAG_NOT_FOUND: "Tag not found.",
  TAG_HAS_BLOGS: "Cannot delete tag because it is assigned to one or more blogs.",

  // ==========================
  // Comments
  // ==========================
  COMMENT_CREATED: "Comment added successfully.",
  COMMENT_UPDATED: "Comment updated successfully.",
  COMMENT_DELETED: "Comment deleted successfully.",

  // ==========================
  // Gallery
  // ==========================
  IMAGE_UPLOADED: "Image uploaded successfully.",
  IMAGE_DELETED: "Image deleted successfully.",

  // ==========================
  // Settings
  // ==========================
  SETTINGS_UPDATED: "Settings updated successfully.",

  // ==========================
  // Contact
  // ==========================
  MESSAGE_SENT: "Message sent successfully.",
};

export default MESSAGES;