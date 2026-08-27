// frontend/src/context/AuthContext.jsx

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";

import { toast } from "react-hot-toast";
import api from "../../api";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Restore Authentication
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const initializeAuth = async () => {
            const accessToken =
                localStorage.getItem("access_token");

            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const currentUser = response.data.data;

                setUser(currentUser);
                setIsAuthenticated(true);

                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );
            } catch (error) {
                /*
                 * Access token may have expired.
                 * Try to refresh it.
                 */
                const refreshed =
                    await refreshAccessToken();

                if (refreshed) {
                    try {
                        const response =
                            await api.get("/auth/me");

                        const currentUser =
                            response.data.data;

                        setUser(currentUser);
                        setIsAuthenticated(true);

                        localStorage.setItem(
                            "user",
                            JSON.stringify(currentUser)
                        );
                    } catch (meError) {
                        console.error(
                            "Failed to restore user after token refresh:",
                            meError
                        );

                        clearAuth();
                    }
                } else {
                    clearAuth();
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Register
    |--------------------------------------------------------------------------
    */

    const register = async (formData) => {
        try {
            /*
             * IMPORTANT:
             *
             * formData is already a FormData object.
             * Do NOT convert it into a normal JSON object.
             */
            const response = await api.post(
                "/auth/register",
                formData
            );

            const registeredUser =
                response.data?.data;

            return {
                success: true,
                message:
                    response.data?.message ||
                    "Registration successful!",
                user: registeredUser,
            };
        } catch (error) {
            console.error(
                "Registration error:",
                error?.response?.data || error
            );

            return {
                success: false,
                error:
                    error?.response?.data || {
                        message:
                            error?.message ||
                            "Registration failed.",
                    },
            };
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    const login = async (credentials) => {
        try {
            const response = await api.post(
                "/auth/login",
                credentials
            );

            const {
                user,
                accessToken,
            } = response.data.data;

            localStorage.setItem(
                "access_token",
                accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setUser(user);
            setIsAuthenticated(true);

            toast.success(
                response.data?.message ||
                "Welcome back!"
            );

            return {
                success: true,
                message:
                    response.data?.message ||
                    "Login successful!",
                user,
            };
        } catch (error) {
            console.error(
                "Login error:",
                error?.response?.data || error
            );

            return {
                success: false,
                error:
                    error?.response?.data || {
                        message:
                            error?.message ||
                            "Login failed.",
                    },
            };
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error(
                "Logout request failed:",
                error
            );
        } finally {
            clearAuth();

            toast.success(
                "Logged out successfully"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Refresh Access Token
    |--------------------------------------------------------------------------
    */

    const refreshAccessToken = async () => {
        try {
            const response = await api.post(
                "/auth/refresh-token"
            );

            const accessToken =
                response.data?.data?.accessToken;

            if (!accessToken) {
                return false;
            }

            localStorage.setItem(
                "access_token",
                accessToken
            );

            return true;
        } catch (error) {
            console.error(
                "Token refresh failed:",
                error?.response?.data || error
            );

            return false;
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Get Current User
    |--------------------------------------------------------------------------
    */

    const getCurrentUser = async () => {
        try {
            const accessToken =
                localStorage.getItem(
                    "access_token"
                );

            if (!accessToken) {
                return null;
            }

            const response = await api.get(
                "/auth/me"
            );

            const currentUser =
                response.data.data;

            setUser(currentUser);
            setIsAuthenticated(true);

            localStorage.setItem(
                "user",
                JSON.stringify(currentUser)
            );

            return currentUser;
        } catch (error) {
            console.error(
                "Get current user failed:",
                error?.response?.data || error
            );

            return null;
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Clear Authentication
    |--------------------------------------------------------------------------
    */

    const clearAuth = () => {
        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Context Value
    |--------------------------------------------------------------------------
    */

    const value = {
        user,
        setUser,
        loading,
        isAuthenticated,

        register,
        login,
        logout,

        refreshToken:
            refreshAccessToken,

        getCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};