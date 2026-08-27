// frontend/src/features/settings/pages/AccountSettings.jsx

import React, { useState } from "react";
import {
    Mail,
    Lock,
    Save,
    AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/context/AuthContext";

const AccountSettings = () => {
    const { user } = useAuth();

    const [email, setEmail] = useState(
        user?.email || ""
    );

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] =
        useState(false);

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleEmailSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim()) {
            toast.error("Email address is required.");
            return;
        }

        try {
            setEmailLoading(true);

            /*
             * TODO:
             * Connect to your account/email update API.
             *
             * Example:
             * await userService.updateEmail({ email });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            toast.success(
                "Email update request submitted."
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update email."
            );
        } finally {
            setEmailLoading(false);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {
            toast.error(
                "Please fill in all password fields."
            );
            return;
        }

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {
            toast.error(
                "New password and confirmation do not match."
            );
            return;
        }

        try {
            setPasswordLoading(true);

            /*
             * TODO:
             * Connect to your change-password API.
             *
             * Example:
             * await userService.changePassword({
             *     currentPassword,
             *     newPassword,
             * });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            toast.success(
                "Password changed successfully."
            );

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to change password."
            );
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Account Settings
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your email address and account
                    security.
                </p>
            </div>

            {/* Email Settings */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-3">
                        <Mail className="h-6 w-6 text-gray-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Email Address
                        </h2>

                        <p className="text-sm text-gray-500">
                            Update the email address associated
                            with your account.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleEmailSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={emailLoading}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />

                            {emailLoading
                                ? "Saving..."
                                : "Update Email"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Password Settings */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-3">
                        <Lock className="h-6 w-6 text-gray-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Change Password
                        </h2>

                        <p className="text-sm text-gray-500">
                            Update your account password.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-5"
                >
                    {/* Current Password */}
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </label>

                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={
                                passwordData.currentPassword
                            }
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Enter current password"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Enter new password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={
                                passwordData.confirmPassword
                            }
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />

                            {passwordLoading
                                ? "Updating..."
                                : "Change Password"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Notice */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                        <h3 className="text-sm font-semibold text-amber-900">
                            Security Notice
                        </h3>

                        <p className="mt-1 text-sm text-amber-800">
                            Use a strong, unique password and
                            never share your account credentials
                            with anyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;