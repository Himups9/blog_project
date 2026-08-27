// backend/src/models/auth/auth.service.js

import authRepository from "./auth.repository.js";
import authMapper from "./auth.mapper.js";

import ApiError from "../../utils/ApiError.js";
import {
    hashPassword,
    comparePassword,
} from "../../utils/password.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../../utils/jwt.js";

import { jwtConfig } from "../../config/jwt.js";

import crypto from "crypto";

import {
    ROLES,
    ACTIVITY_ACTION,
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";

import emailService from "../services/email.service.js";


class AuthService {

    /**
     * =========================================================
     * Register User
     * =========================================================
     */
    async register(data) {

        const existingUser =
            await authRepository.findUserByEmail(
                data.email
            );

        if (existingUser) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                MESSAGES.EMAIL_ALREADY_EXISTS
            );
        }

        /*
         * Hash password
         */
        const hashedPassword =
            await hashPassword(data.password);

        /*
         * Remove fields that should NOT
         * be stored directly in User.
         */
        const {
            confirmPassword,
            ...userData
        } = data;

        /*
         * Create user
         */
        const user =
            await authRepository.createUser({
                ...userData,

                password: hashedPassword,

                role: ROLES.USER,
            });

        /*
         * Activity log
         */
        await authRepository.createActivityLog({
            userId: user.id,

            action:
                ACTIVITY_ACTION.CREATE_USER,

            entity: "User",

            entityId: user.id,
        });

        /*
         * Return safe user response
         */
        return authMapper.toUserResponse(user);
    }


    /**
     * =========================================================
     * Login User
     * =========================================================
     */
    async login(email, password) {

        const user =
            await authRepository.findAuthUserByEmail(
                email
            );

        if (!user) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.LOGIN_FAILED
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                MESSAGES.ACCOUNT_DEACTIVATED
            );
        }

        const matched =
            await comparePassword(
                password,
                user.password
            );

        if (!matched) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.LOGIN_FAILED
            );
        }

        /*
         * Generate access token
         */
        const accessToken =
            generateAccessToken({
                id: user.id,
                role: user.role,
            });

        /*
         * Generate refresh token
         */
        const refreshToken =
            generateRefreshToken({
                id: user.id,
            });

        /*
         * Store refresh token
         */
        await authRepository.createRefreshToken({
            token: refreshToken,

            userId: user.id,

            expiresAt: new Date(
                Date.now() +
                jwtConfig.refreshTokenExpiresMs
            ),
        });

        /*
         * Update last login
         */
        await authRepository.updateLastLogin(
            user.id
        );

        /*
         * Activity log
         */
        await authRepository.createActivityLog({
            userId: user.id,

            action: ACTIVITY_ACTION.LOGIN,

            entity: "User",

            entityId: user.id,
        });

        return {
            user:
                authMapper.toUserResponse(user),

            accessToken,

            refreshToken,
        };
    }


    /**
     * =========================================================
     * Refresh Access Token
     * =========================================================
     */
    async refreshToken(token) {

        if (!token) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.INVALID_REFRESH_TOKEN
            );
        }

        const storedToken =
            await authRepository.findRefreshToken(
                token
            );

        if (!storedToken) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.INVALID_REFRESH_TOKEN
            );
        }

        /*
         * Check database expiration
         */
        if (
            storedToken.expiresAt <
            new Date()
        ) {

            await authRepository.deleteRefreshToken(
                token
            );

            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.REFRESH_TOKEN_EXPIRED
            );
        }

        let payload;

        try {

            payload =
                verifyRefreshToken(token);

        } catch {

            await authRepository.deleteRefreshToken(
                token
            );

            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.INVALID_REFRESH_TOKEN
            );
        }

        /*
         * Make sure token belongs to
         * the stored user.
         */
        if (
            payload.id !==
            storedToken.user.id
        ) {

            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                MESSAGES.INVALID_REFRESH_TOKEN
            );
        }

        /*
         * Remove old refresh token
         */
        await authRepository.deleteRefreshToken(
            token
        );

        /*
         * Generate new access token
         */
        const accessToken =
            generateAccessToken({
                id: storedToken.user.id,
                role: storedToken.user.role,
            });

        /*
         * Generate new refresh token
         */
        const newRefreshToken =
            generateRefreshToken({
                id: storedToken.user.id,
            });

        /*
         * Store new refresh token
         */
        await authRepository.createRefreshToken({
            token: newRefreshToken,

            userId: storedToken.user.id,

            expiresAt: new Date(
                Date.now() +
                jwtConfig.refreshTokenExpiresMs
            ),
        });

        return {
            accessToken,

            refreshToken:
                newRefreshToken,
        };
    }


    /**
     * =========================================================
     * Logout
     * =========================================================
     */
    async logout(token) {

        if (!token) {
            return;
        }

        const storedToken =
            await authRepository.findRefreshToken(
                token
            );

        if (!storedToken) {
            return;
        }

        await authRepository.deleteRefreshToken(
            token
        );

        await authRepository.createActivityLog({
            userId:
                storedToken.user.id,

            action:
                ACTIVITY_ACTION.LOGOUT,

            entity: "User",

            entityId:
                storedToken.user.id,
        });

        return {
            success: true,
        };
    }


    /**
     * =========================================================
     * Current User
     * =========================================================
     */
    async me(userId) {

        const user =
            await authRepository.findCurrentUser(
                userId
            );

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        return authMapper.toUserResponse(
            user
        );
    }


    /**
     * =========================================================
     * Forgot Password
     * =========================================================
     */
    async forgotPassword(email) {

        const user =
            await authRepository.findUserByEmail(
                email
            );

        /*
         * Never reveal whether email exists.
         */
        if (!user) {
            return true;
        }

        /*
         * Remove previous reset tokens.
         */
        await authRepository
            .deleteUserPasswordResetTokens(
                user.id
            );

        /*
         * Generate secure token.
         */
        const token =
            crypto
                .randomBytes(32)
                .toString("hex");

        /*
         * Save reset token.
         */
        await authRepository
            .createPasswordResetToken({
                token,

                userId: user.id,

                expiresAt: new Date(
                    Date.now() +
                    60 * 60 * 1000
                ),
            });

        /*
         * Activity log.
         */
        await authRepository.createActivityLog({
            userId: user.id,

            action:
                ACTIVITY_ACTION.UPDATE_USER,

            entity: "User",

            entityId: user.id,
        });

        /*
         * Send reset email.
         */
        try {

            await emailService.sendResetPasswordEmail(
                user.email,
                token
            );

        } catch (error) {

            await authRepository
                .deleteUserPasswordResetTokens(
                    user.id
                );

            throw new ApiError(
                STATUS_CODES.INTERNAL_SERVER_ERROR,
                MESSAGES.EMAIL_SEND_FAILED
            );
        }

        return {
            success: true,
        };
    }


    /**
     * =========================================================
     * Reset Password
     * =========================================================
     */
    async resetPassword(
        token,
        password
    ) {

        const resetToken =
            await authRepository
                .findPasswordResetToken(
                    token
                );

        if (!resetToken) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.INVALID_RESET_TOKEN
            );
        }

        /*
         * Check expiration.
         */
        if (
            resetToken.expiresAt <
            new Date()
        ) {

            await authRepository
                .deletePasswordResetToken(
                    token
                );

            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                MESSAGES.RESET_TOKEN_EXPIRED
            );
        }

        /*
         * Hash new password.
         */
        const hashedPassword =
            await hashPassword(password);

        /*
         * Update password.
         */
        await authRepository.updatePassword(
            resetToken.user.id,
            hashedPassword
        );

        /*
         * Invalidate all sessions.
         */
        await authRepository
            .deleteUserRefreshTokens(
                resetToken.user.id
            );

        /*
         * Delete reset tokens.
         */
        await authRepository
            .deleteUserPasswordResetTokens(
                resetToken.user.id
            );

        /*
         * Activity log.
         */
        await authRepository.createActivityLog({
            userId:
                resetToken.user.id,

            action:
                ACTIVITY_ACTION.UPDATE_USER,

            entity: "User",

            entityId:
                resetToken.user.id,
        });

        return {
            success: true,
        };
    }
}


export default new AuthService();