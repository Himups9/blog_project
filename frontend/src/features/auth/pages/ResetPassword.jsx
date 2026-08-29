// frontend/src/components/auth/ResetPassword.jsx

import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import PageTransition from "../../pages/shared/components/PageTransition";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [isSuccess, setIsSuccess] =
        useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            toast.error(
                "Invalid or missing password reset token."
            );
            return;
        }

        if (!password) {
            toast.error(
                "Please enter your new password."
            );
            return;
        }

        if (password.length < 8) {
            toast.error(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (!confirmPassword) {
            toast.error(
                "Please confirm your password."
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error(
                "Passwords do not match."
            );
            return;
        }

        try {
            setIsSubmitting(true);

            /*
             * Connect this to your backend:
             *
             * POST /api/auth/reset-password/:token
             *
             * Example:
             *
             * await api.post(
             *     `/auth/reset-password/${token}`,
             *     {
             *         password,
             *         confirmPassword,
             *     }
             * );
             */

            // Temporary UI simulation
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            setIsSuccess(true);

            toast.success(
                "Password reset successfully."
            );

        } catch (error) {
            console.error(
                "Reset password error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Unable to reset password."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <PageTransition>
                <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#667eea] to-[#764ba2] px-4 py-10">

                    <div className="relative z-10 w-full max-w-md">

                        <div className="rounded-3xl border border-white/20 bg-white/95 p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                <CheckCircle2
                                    size={34}
                                />
                            </div>

                            <h1 className="mt-6 text-2xl font-bold text-slate-800">
                                Password Reset Complete
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Your password has been
                                successfully updated. You can
                                now log in using your new
                                password.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/login",
                                        {
                                            replace: true,
                                        }
                                    )
                                }
                                className="mt-8 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Continue to Login
                            </button>

                        </div>

                    </div>
                </main>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#667eea] to-[#764ba2] px-4 py-10">

                {/* Background */}

                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize:
                            "40px 40px",
                    }}
                />

                {/* Decorative circles */}

                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border-80 border-white/5" />

                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full border-80 border-black/10" />

                {/* Card */}

                <div className="relative z-10 w-full max-w-md">

                    <div className="rounded-3xl border border-white/20 bg-white/95 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10">

                        {/* Icon */}

                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                                <LockKeyhole
                                    size={30}
                                />
                            </div>
                        </div>

                        {/* Header */}

                        <div className="text-center">

                            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                Reset Password
                            </h1>

                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                                Create a strong new password
                                for your Himalaya Tech account.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* New Password */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    New Password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            password
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setPassword(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                        disabled={
                                            isSubmitting
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (
                                                    current
                                                ) =>
                                                    !current
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff
                                                size={
                                                    18
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                size={
                                                    18
                                                }
                                            />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Confirm Password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            confirmPassword
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setConfirmPassword(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                        disabled={
                                            isSubmitting
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (
                                                    current
                                                ) =>
                                                    !current
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff
                                                size={
                                                    18
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                size={
                                                    18
                                                }
                                            />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Password requirements */}

                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                                <p className="mb-2 text-xs font-semibold text-slate-600">
                                    Password requirements
                                </p>

                                <ul className="space-y-1 text-xs text-slate-500">
                                    <li>
                                        • At least 8
                                        characters
                                    </li>
                                    <li>
                                        • Use a combination of
                                        letters and numbers
                                    </li>
                                    <li>
                                        • Avoid using easily
                                        guessed passwords
                                    </li>
                                </ul>

                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Updating Password...
                                    </>
                                ) : (
                                    <>
                                        <LockKeyhole
                                            size={17}
                                        />
                                        Confirm New Password
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Back */}

                        <div className="mt-8 text-center">

                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                            >
                                <ArrowLeft
                                    size={16}
                                />
                                Back to Login
                            </Link>

                        </div>

                    </div>

                    <p className="mt-6 text-center text-xs text-white/60">
                        © {new Date().getFullYear()} Himalaya
                        Tech. All rights reserved.
                    </p>

                </div>
            </main>
        </PageTransition>
    );
};

export default ResetPassword;