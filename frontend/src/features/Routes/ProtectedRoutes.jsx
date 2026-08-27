// frontend/src/features/admin/routes/ProtectedRoutes.jsx

import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

const ProtectedRoute = ({
    adminOnly = false,
    redirectPath = "/login",
}) => {
    const {
        user,
        isAuthenticated,
        loading,
    } = useAuth();


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                    <p className="text-gray-600">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }


    if (!isAuthenticated) {
        return (
            <Navigate
                to={redirectPath}
                replace
            />
        );
    }



    if (adminOnly) {
        const role =
            typeof user?.role === "string"
                ? user.role.toUpperCase()
                : user?.role?.name?.toUpperCase();

        if (role !== "ADMIN") {
            return (
                <Navigate
                    to="/"
                    replace
                />
            );
        }
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    adminOnly: PropTypes.bool,
    redirectPath: PropTypes.string,
};

export default ProtectedRoute;