import userRepository from "./user.repository.js";
import userMapper from "./user.mapper.js";

import ApiError from "../../utils/ApiError.js";
import { hashPassword } from "../../utils/password.js";
import { optimizeImage } from "../../utils/image.js";

import {
    STATUS_CODES,
    MESSAGES,
    ACTIVITY_ACTION,
} from "../../constants/index.js";


class UserService {

    /*
    |--------------------------------------------------------------------------
    | Current User
    |--------------------------------------------------------------------------
    */

    async me(userId) {
        const user =
            await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        return userMapper.toUserResponse(user);
    }


    /*
    |--------------------------------------------------------------------------
    | Get User By ID
    |--------------------------------------------------------------------------
    */

    async getUser(id) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        return userMapper.toUserResponse(user);
    }


    /*
    |--------------------------------------------------------------------------
    | Get All Users
    |--------------------------------------------------------------------------
    */

    async getUsers(query = {}) {
        const page =
            Number(query.page) || 1;

        const limit =
            Number(query.limit) || 10;

        const search =
            typeof query.search === "string"
                ? query.search.trim()
                : "";

        const ordering =
            typeof query.ordering === "string"
                ? query.ordering
                : "-createdAt";

        const result =
            await userRepository.getUsers({
                page,
                limit,
                search,
                ordering,
            });

        return userMapper.toPagination({
            users: result.users,
            total: result.total,
            page,
            limit,
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Admin Update User
    |--------------------------------------------------------------------------
    */


    async updateUser(id, data = {}, file = null) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Build allowed update fields
        |--------------------------------------------------------------------------
        */

        const updateData = {};

        const allowedFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "gender",
            "position",
            "facebookUsername",
            "bio",
            "role",
        ];

        allowedFields.forEach((field) => {
            if (
                data[field] !== undefined &&
                data[field] !== null
            ) {
                updateData[field] = data[field];
            }
        });

        /*
        |--------------------------------------------------------------------------
        | Boolean Fields
        |--------------------------------------------------------------------------
        */

        if (data.isActive !== undefined) {
            updateData.isActive =
                typeof data.isActive === "string"
                    ? data.isActive === "true"
                    : Boolean(data.isActive);
        }

        if (data.isVerified !== undefined) {
            updateData.isVerified =
                typeof data.isVerified === "string"
                    ? data.isVerified === "true"
                    : Boolean(data.isVerified);
        }

        /*
        |--------------------------------------------------------------------------
        | Profile Image
        |--------------------------------------------------------------------------
        */

        if (file) {
            const imageResult =
                await optimizeImage(
                    file,
                    "users",
                    {
                        width: 800,
                        quality: 85,
                        generateThumbnail: true,
                        preserveOriginal: true,
                    }
                );

            updateData.profileImage =
                imageResult.optimizedPath;
        }

        /*
        |--------------------------------------------------------------------------
        | Password
        |--------------------------------------------------------------------------
        */

        if (data.password) {
            updateData.password =
                await hashPassword(data.password);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        const updatedUser =
            await userRepository.updateUser(
                id,
                updateData
            );

        if (!updatedUser) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Activity Log
        |--------------------------------------------------------------------------
        */

        await userRepository.createActivityLog({
            userId: id,
            action: ACTIVITY_ACTION.UPDATE_USER,
            entity: "User",
            entityId: id,
        });

        return userMapper.toUserResponse(
            updatedUser
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Activate User
    |--------------------------------------------------------------------------
    */

    async activateUser(id) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        const updatedUser =
            await userRepository.updateUser(
                id,
                {
                    isActive: true,
                }
            );

        await userRepository.createActivityLog({
            userId: id,
            action: ACTIVITY_ACTION.UPDATE_USER,
            entity: "User",
            entityId: id,
        });

        return userMapper.toUserResponse(
            updatedUser
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    async deactivateUser(id) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        const updatedUser =
            await userRepository.updateUser(
                id,
                {
                    isActive: false,
                }
            );

        await userRepository.createActivityLog({
            userId: id,
            action: ACTIVITY_ACTION.UPDATE_USER,
            entity: "User",
            entityId: id,
        });

        return userMapper.toUserResponse(
            updatedUser
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    async deleteUser(id) {
        const user =
            await userRepository.findById(id);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                MESSAGES.USER_NOT_FOUND
            );
        }

        await userRepository.softDeleteUser(id);

        await userRepository.createActivityLog({
            userId: id,
            action: ACTIVITY_ACTION.DELETE_USER,
            entity: "User",
            entityId: id,
        });

        return {
            success: true,
            message: "User deleted successfully.",
        };
    }


    /*
    |--------------------------------------------------------------------------
    | User Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {
        const stats =
            await userRepository.getStatistics();

        return userMapper.toStatistics(
            stats
        );
    }
}


export default new UserService();