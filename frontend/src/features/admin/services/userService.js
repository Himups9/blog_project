import api from "../../api";

const userService = {

    /*
    |--------------------------------------------------------------------------
    | Get Users
    |--------------------------------------------------------------------------
    */

    async getUsers({
        page = 1,
        limit = 10,
        search = "",
        ordering = "-createdAt",
    } = {}) {

        const response = await api.get(
            "/users",
            {
                params: {
                    page,
                    limit,
                    search,
                    ordering,
                },
            }
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Get User By ID
    |--------------------------------------------------------------------------
    */

    async getUserById(id) {

        if (!id) {
            throw new Error(
                "User ID is required."
            );
        }

        const response = await api.get(
            `/users/${id}`
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    |
    | Handles:
    |
    | - Normal fields
    | - Boolean fields
    | - Profile image
    |
    | Users.jsx does NOT create FormData.
    |
    */

    async updateUser(id, data = {}) {
        if (!id) {
            throw new Error("User ID is required.");
        }

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (
                value === undefined ||
                value === null
            ) {
                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Profile Image
            |--------------------------------------------------------------------------
            */

            if (key === "profileImage") {

                if (
                    value instanceof FileList &&
                    value.length > 0
                ) {
                    formData.append(
                        "profileImage",
                        value[0]
                    );
                }

                else if (value instanceof File) {
                    formData.append(
                        "profileImage",
                        value
                    );
                }

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Boolean
            |--------------------------------------------------------------------------
            */

            if (typeof value === "boolean") {
                formData.append(
                    key,
                    String(value)
                );

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Normal Fields
            |--------------------------------------------------------------------------
            */

            formData.append(
                key,
                String(value)
            );
        });

        /*
        |--------------------------------------------------------------------------
        | Debug
        |--------------------------------------------------------------------------
        */

        console.log(
            "Updating user:",
            id
        );

        for (
            const [key, value]
            of formData.entries()
        ) {
            console.log(
                key,
                value instanceof File
                    ? {
                        name: value.name,
                        type: value.type,
                        size: value.size,
                    }
                    : value
            );
        }

        const response = await api.put(
            `/users/${id}`,
            formData
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Activate User
    |--------------------------------------------------------------------------
    */

    async activateUser(id) {

        if (!id) {
            throw new Error(
                "User ID is required."
            );
        }

        const response = await api.patch(
            `/users/${id}/activate`
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    async deactivateUser(id) {

        if (!id) {
            throw new Error(
                "User ID is required."
            );
        }

        const response = await api.patch(
            `/users/${id}/deactivate`
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    async deleteUser(id) {

        if (!id) {
            throw new Error(
                "User ID is required."
            );
        }

        const response = await api.delete(
            `/users/${id}`
        );

        return response.data;
    },


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    async getStatistics() {

        const response = await api.get(
            "/users/statistics"
        );

        return response.data;
    },

};

export default userService;