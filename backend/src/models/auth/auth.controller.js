import authService from "./auth.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

class AuthController {
    /**
     * Register
     */
    register = asyncHandler(async (req, res) => {
        const registrationData = {
            ...req.validatedData,

            // Multer uploaded file
            profileImage: req.file
                ? req.file.filename
                : null,
        };

        const result =
            await authService.register(registrationData);

        return res.status(201).json(
            new ApiResponse(
                201,
                "Registration successful.",
                result
            )
        );
    });

    /**
     * Login
     */
    login = asyncHandler(async (req, res) => {
        const {
            email,
            password,
        } = req.validatedData;

        const result =
            await authService.login(
                email,
                password
            );

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    7 *
                    24 *
                    60 *
                    60 *
                    1000,
            }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Login successful.",
                {
                    user: result.user,
                    accessToken:
                        result.accessToken,
                }
            )
        );
    });

    /**
     * Refresh Access Token
     */
    refreshToken = asyncHandler(
        async (req, res) => {
            const token =
                req.cookies.refreshToken;

            const result =
                await authService.refreshToken(
                    token
                );

            res.cookie(
                "refreshToken",
                result.refreshToken,
                {
                    httpOnly: true,
                    secure:
                        process.env.NODE_ENV ===
                        "production",
                    sameSite: "strict",
                    maxAge:
                        7 *
                        24 *
                        60 *
                        60 *
                        1000,
                }
            );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Access token refreshed.",
                    {
                        accessToken:
                            result.accessToken,
                    }
                )
            );
        }
    );

    /**
     * Logout
     */
    logout = asyncHandler(async (req, res) => {
        const token =
            req.cookies.refreshToken;

        await authService.logout(token);

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
            }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Logout successful."
            )
        );
    });

    /**
     * Forgot Password
     */
    forgotPassword = asyncHandler(
        async (req, res) => {
            const { email } =
                req.validatedData;

            await authService.forgotPassword(
                email
            );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "If an account exists, password reset instructions have been sent."
                )
            );
        }
    );

    /**
     * Reset Password
     */
    resetPassword = asyncHandler(
        async (req, res) => {
            const {
                token,
                password,
            } = req.validatedData;

            await authService.resetPassword(
                token,
                password
            );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Password reset successfully."
                )
            );
        }
    );

    /**
     * Current User
     */
    me = asyncHandler(async (req, res) => {
        const user =
            await authService.me(
                req.user.id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Current user retrieved successfully.",
                user
            )
        );
    });
}

export default new AuthController();
