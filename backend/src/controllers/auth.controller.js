import authService from "../services/auth.service.js";

import ApiResponse from "../../../utils/ApiResponse.js";

class AuthController {
  /**
   * Register User
   */
  async register(req, res, next) {
    try {
      const user = await authService.register(req.validatedData);

      return res.status(201).json(
        new ApiResponse(
          201,
          "User registered successfully.",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   */
  async login(req, res, next) {
    try {

        const { email, password } = req.validatedData;

        const result =
            await authService.login(email, password);

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Login successful.",
                {
                    user: result.user,
                    accessToken: result.accessToken,
                }
            )
        );

    } catch (error) {

        next(error);

    }
}

  /**
   * Refresh Access Token
   */
  async refreshToken(req, res, next) {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    "Refresh token missing."
                )
            );
        }

        const result =
            await authService.refreshToken(refreshToken);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Access token refreshed.",
                result
            )
        );

    } catch (error) {

        next(error);

    }
}

  /**
   * Logout
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;

      await authService.logout(refreshToken);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Logout successful."
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Current User
   */
  async me(req, res, next) {
    try {
      const user = await authService.me(req.user.id);

      return res.status(200).json(
        new ApiResponse(
          200,
          "Current user fetched successfully.",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();