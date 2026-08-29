// frontend/src/components/auth/ForgotPassword.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

import PageTransition from "../../pages/shared/components/PageTransition";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Please enter your email address.");
            return;
        }

        try {
            setIsSubmitting(true);

            /*
             * Connect this to your backend:
             *
             * POST /api/auth/forgot-password
             *
             * Example:
             *
             * await api.post("/auth/forgot-password", {
             *     email: trimmedEmail,
             * });
             */

            // Temporary UI simulation
            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            setIsSent(true);

            toast.success(
                "If an account exists, a reset link has been sent."
            );
        } catch (error) {
            console.error(
                "Forgot password error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Unable to send password reset link."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageTransition>
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#667eea] to-[#764ba2] px-4 py-10">

                {/* Background Grid */}

                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize:
                            "40px 40px",
                    }}
                />

                {/* Decorative Circles */}

                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full border-80 border-white/5" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full border-80 border-black/10" />

                {/* Card */}

                <div className="relative z-10 w-full max-w-md">

                    <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10">

                        {/* Icon */}

                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                                {isSent ? (
                                    <CheckCircle2
                                        size={30}
                                    />
                                ) : (
                                    <Mail
                                        size={30}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Header */}

                        <div className="text-center">

                            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                {isSent
                                    ? "Check Your Email"
                                    : "Forgot Password?"}
                            </h1>

                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                                {isSent
                                    ? "If an account exists for this email address, we've sent you a password reset link."
                                    : "Enter your registered email address and we'll send you a secure link to reset your password."}
                            </p>

                        </div>

                        {!isSent ? (
                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="mt-8 space-y-5"
                            >

                                {/* Email */}

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            type="email"
                                            value={
                                                email
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setEmail(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                    </div>
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
                                            Sending Link...
                                        </>
                                    ) : (
                                        <>
                                            <Send
                                                size={17}
                                            />
                                            Send Reset Link
                                        </>
                                    )}
                                </button>

                            </form>
                        ) : (
                            <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-4 text-center">
                                <p className="text-sm leading-6 text-green-700">
                                    Please check your inbox
                                    and follow the password
                                    reset instructions.
                                </p>
                            </div>
                        )}

                        {/* Back to Login */}

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

                    {/* Branding */}

                    <p className="mt-6 text-center text-xs text-white/60">
                        © {new Date().getFullYear()} Himalaya
                        Tech. All rights reserved.
                    </p>

                </div>
            </main>
        </PageTransition>
    );
};

export default ForgotPassword;