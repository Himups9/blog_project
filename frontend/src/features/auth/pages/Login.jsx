// frontend/src/components/auth/Login.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../../utils/validators";

import PageTransition from "../../pages/shared/components/PageTransition";

const Login = () => {
    // ==========================
    // Hooks
    // ==========================

    const { login } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    // ==========================
    // React Hook Form
    // ==========================

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    });

    // ==========================
    // Submit
    // ==========================

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            const result = await login(data);

            // ==========================
            // Login Failed
            // ==========================

            if (!result?.success) {
                toast.error(
                    result?.error?.message ||
                    result?.error?.detail ||
                    "Login failed."
                );

                return;
            }

            // ==========================
            // Logged-in User
            // ==========================

            const loggedInUser = result?.user;

            console.log(
                "Logged-in user:",
                loggedInUser
            );

            console.log(
                "Logged-in role:",
                loggedInUser?.role
            );

            // ==========================
            // Determine Role
            // ==========================

            const role =
                typeof loggedInUser?.role === "string"
                    ? loggedInUser.role.toUpperCase()
                    : loggedInUser?.role?.name?.toUpperCase();

            // ==========================
            // Role Based Redirect
            // ==========================

            if (role === "ADMIN") {
                navigate("/admin", {
                    replace: true,
                });

                return;
            }

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {
            console.error(
                "Login submit error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to login."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    // ==========================
    // UI
    // ==========================

    return (
        <PageTransition>
            <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-[#667eea] to-[#764ba2] p-4">

                <div className="w-full max-w-120 animate-slideUp rounded-2xl bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                    {/* Header */}

                    <div className="mb-2 text-center">

                        <h3 className="text-xl font-bold leading-9 text-slate-700 sm:text-2xl">

                            Welcome to Himalaya Tech

                        </h3>

                        <p className="text-sm text-slate-600">

                            Login to your account to continue blogging

                        </p>

                    </div>

                    {/* Login Form */}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-10 flex flex-col gap-5"
                    >

                        {/* Email */}

                        <div className="flex flex-col font-semibold text-slate-600">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                className={`form-input ${
                                    errors.email
                                        ? "error"
                                        : ""
                                }`}
                                disabled={isSubmitting}
                            />

                            {errors.email && (
                                <span className="error-message">
                                    {errors.email.message}
                                </span>
                            )}

                        </div>

                        {/* Password */}

                        <div className="flex flex-col font-semibold text-slate-600">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                className={`form-input ${
                                    errors.password
                                        ? "error"
                                        : ""
                                }`}
                                disabled={isSubmitting}
                            />

                            {errors.password && (
                                <span className="error-message">
                                    {errors.password.message}
                                </span>
                            )}

                        </div>

                        {/* Forgot Password */}

                        <div className="-mt-2 flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="spinner">
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>

                    </form>

                    {/* Footer */}

                    <div className="auth-footer">

                        <p>

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="auth-link"
                            >
                                Register here
                            </Link>

                        </p>

                    </div>

                </div>

            </div>
        </PageTransition>
    );
};

export default Login;