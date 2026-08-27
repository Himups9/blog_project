// backend/src/middleware/authorize.js

const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        /*
        |--------------------------------------------------------------------------
        | Authentication Check
        |--------------------------------------------------------------------------
        */

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | User Role
        |--------------------------------------------------------------------------
        */

        const userRole =
            typeof req.user.role === "string"
                ? req.user.role.toUpperCase()
                : req.user.role?.name?.toUpperCase();

        /*
        |--------------------------------------------------------------------------
        | Authorization Check
        |--------------------------------------------------------------------------
        */

        const normalizedRoles = allowedRoles.map((role) =>
            role.toUpperCase()
        );

        if (!userRole || !normalizedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Authorized
        |--------------------------------------------------------------------------
        */

        next();
    };
};

export default authorize;