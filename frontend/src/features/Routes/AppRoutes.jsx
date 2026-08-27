import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import { AuthProvider } from "../auth/context/AuthContext";

import Header from "../pages/shared/components/Header";
import Footer from "../pages/shared/components/Footer";
import ScrollToTop from "../pages/shared/components/ScrollToTop";

import publicRoutes from "./PublicRoutes";
import privateRoutes from "./PrivateRoutes";
import adminRoutes from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoutes";

import AdminLayout from "../admin/layouts/AdminLayout";

/*
|--------------------------------------------------------------------------
| Render Route Configuration
|--------------------------------------------------------------------------
*/

const renderRoutes = (routes) => {
    return routes.map(
        (
            {
                index,
                path,
                element,
                children,
            },
            routeIndex
        ) => (
            <Route
                key={
                    index
                        ? `index-${routeIndex}`
                        : path || `route-${routeIndex}`
                }
                index={index}
                path={index ? undefined : path}
                element={element}
            >
                {children && renderRoutes(children)}
            </Route>
        )
    );
};

/*
|--------------------------------------------------------------------------
| App Routes
|--------------------------------------------------------------------------
*/

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AuthProvider>
            <ScrollToTop />

            <div className="app flex min-h-screen flex-col mt-20">

                <Header />

                <main className="main-content flex-1">

                    <AnimatePresence
                        mode="wait"
                    >
                        <Routes
                            location={location}
                            key={location.pathname}
                        >

                            {/* Public Routes */}

                            {renderRoutes(
                                publicRoutes
                            )}

                            {/* Private/User Routes */}

                            <Route
                                element={
                                    <ProtectedRoute />
                                }
                            >
                                {renderRoutes(
                                    privateRoutes
                                )}
                            </Route>

                            {/* Admin Routes */}

                            <Route
                                element={
                                    <ProtectedRoute
                                        adminOnly
                                    />
                                }
                            >
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminLayout />
                                    }
                                >
                                    {renderRoutes(
                                        adminRoutes
                                    )}
                                </Route>
                            </Route>

                            {/* 404 */}

                            <Route
                                path="*"
                                element={
                                    <div className="flex min-h-[50vh] items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-4xl font-bold">
                                                404
                                            </h1>

                                            <p className="mt-2 text-gray-600">
                                                Page Not Found
                                            </p>
                                        </div>
                                    </div>
                                }
                            />

                        </Routes>
                    </AnimatePresence>

                </main>

                <Footer />

                <Toaster
                    position="top-right"
                    gutter={12}
                    containerClassName="mt-4"
                    toastOptions={{
                        duration: 4000,

                        className:
                            "rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-2xl px-4 py-3",

                        success: {
                            duration: 3000,
                            className:
                                "rounded-2xl border border-emerald-600 bg-emerald-600 text-white shadow-xl px-4 py-3",
                        },

                        error: {
                            duration: 4000,
                            className:
                                "rounded-2xl border border-red-600 bg-red-600 text-white shadow-xl px-4 py-3",
                        },
                    }}
                />

            </div>
        </AuthProvider>
    );
};

export default AppRoutes;