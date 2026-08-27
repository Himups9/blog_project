import userService from "./user.service.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import {
    STATUS_CODES,
    MESSAGES,
} from "../../constants/index.js";


class UserController {

    /*
    |--------------------------------------------------------------------------
    | Current Logged-in User
    |--------------------------------------------------------------------------
    */

    me = asyncHandler(async (req, res) => {

        const user =
            await userService.me(
                req.user.id
            );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                user
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Get All Users
    |--------------------------------------------------------------------------
    */

    getUsers = asyncHandler(async (req, res) => {

        const result =
            await userService.getUsers(
                req.query
            );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                result
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Get User By ID
    |--------------------------------------------------------------------------
    */

    getUser = asyncHandler(async (req, res) => {

        const user =
            await userService.getUser(
                req.params.id
            );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                user
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Update Current User Profile
    |--------------------------------------------------------------------------
    */

    updateProfile = asyncHandler(async (req, res) => {

        const data = {
            ...(req.validatedData || req.body),
        };

        /*
        |--------------------------------------------------------------------------
        | Uploaded Profile Image
        |--------------------------------------------------------------------------
        */

        if (req.file) {
            data.profileImage = req.file;
        }

        const user =
            await userService.updateProfile(
                req.user.id,
                data
            );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.USER_UPDATED,
                user
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Update User - Admin
    |--------------------------------------------------------------------------
    */

    updateUser = asyncHandler(async (req, res) => {

        const data = {
            ...(req.validatedData || req.body),
        };


        /*
        |--------------------------------------------------------------------------
        | Do NOT put req.file inside data
        |--------------------------------------------------------------------------
        |
        | The service receives the uploaded file separately.
        |
        */


        const user =
            await userService.updateUser(
                req.params.id,
                data,
                req.file || null
            );


        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.USER_UPDATED,
                user
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Activate User
    |--------------------------------------------------------------------------
    */

    activateUser = asyncHandler(async (req, res) => {

        await userService.activateUser(
            req.params.id
        );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.USER_ACTIVATED
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    deactivateUser = asyncHandler(async (req, res) => {

        await userService.deactivateUser(
            req.params.id
        );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.USER_DEACTIVATED
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    deleteUser = asyncHandler(async (req, res) => {

        await userService.deleteUser(
            req.params.id
        );

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.USER_DELETED
            )
        );
    });


    /*
    |--------------------------------------------------------------------------
    | User Statistics
    |--------------------------------------------------------------------------
    */

    statistics = asyncHandler(async (req, res) => {

        const statistics =
            await userService.getStatistics();

        return res.status(
            STATUS_CODES.OK
        ).json(
            new ApiResponse(
                STATUS_CODES.OK,
                MESSAGES.SUCCESS,
                statistics
            )
        );
    });

}


export default new UserController();
