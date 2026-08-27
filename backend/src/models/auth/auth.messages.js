const AUTH_MESSAGES = {
    // ======================================================
    // Registration
    // ======================================================

    REGISTRATION_SUCCESS:
        "Account created successfully.",

    EMAIL_ALREADY_EXISTS:
        "An account with this email already exists.",

    REGISTRATION_FAILED:
        "Registration failed.",


    // ======================================================
    // Login
    // ======================================================

    LOGIN_SUCCESS:
        "Login successful.",

    INVALID_CREDENTIALS:
        "Invalid email or password.",

    ACCOUNT_INACTIVE:
        "Your account is inactive.",

    ACCOUNT_NOT_VERIFIED:
        "Your account has not been verified.",


    // ======================================================
    // Logout
    // ======================================================

    LOGOUT_SUCCESS:
        "Logout successful.",


    // ======================================================
    // Current User
    // ======================================================

    USER_FETCH_SUCCESS:
        "User information retrieved successfully.",

    USER_NOT_FOUND:
        "User not found.",


    // ======================================================
    // Password
    // ======================================================

    PASSWORD_CHANGED:
        "Password changed successfully.",

    CURRENT_PASSWORD_INCORRECT:
        "Current password is incorrect.",

    PASSWORD_RESET_REQUEST_SUCCESS:
        "If an account exists with this email, a password reset link has been sent.",

    INVALID_RESET_TOKEN:
        "Invalid or expired password reset token.",

    RESET_TOKEN_EXPIRED:
        "Password reset token has expired.",

    PASSWORD_RESET_SUCCESS:
        "Password reset successfully.",


    // ======================================================
    // Refresh Token
    // ======================================================

    REFRESH_TOKEN_REQUIRED:
        "Refresh token is required.",

    INVALID_REFRESH_TOKEN:
        "Invalid refresh token.",

    REFRESH_TOKEN_EXPIRED:
        "Refresh token has expired.",

    TOKEN_REFRESH_SUCCESS:
        "Access token refreshed successfully.",


    // ======================================================
    // General Authentication Errors
    // ======================================================

    AUTHENTICATION_REQUIRED:
        "Authentication is required.",

    UNAUTHORIZED:
        "You are not authorized to perform this action.",

    AUTHENTICATION_FAILED:
        "Authentication failed.",
};

export default AUTH_MESSAGES;