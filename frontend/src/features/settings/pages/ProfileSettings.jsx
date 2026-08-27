// frontend/src/features/settings/pages/ProfileSettings.jsx

import React, { useEffect, useState } from "react";
import { User, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/context/AuthContext";

const ProfileSettings = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        bio: "",
        facebookUsername: "",
        position: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }

        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            bio: user.bio || "",
            facebookUsername: user.facebookUsername || "",
            position: user.position || "",
        });
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            /*
             * TODO:
             * Connect this form to the user profile update API.
             *
             * Example:
             * await userService.updateProfile(formData);
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            toast.success("Profile updated successfully.");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Profile Settings
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update your personal profile information.
                </p>
            </div>

            {/* Profile Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-3">
                        <User className="h-6 w-6 text-gray-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Personal Information
                        </h2>

                        <p className="text-sm text-gray-500">
                            Keep your profile information up to date.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Name */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>

                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                                placeholder="Enter first name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    {/* Phone + Position */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="position"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Position
                            </label>

                            <input
                                id="position"
                                name="position"
                                type="text"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                                placeholder="Enter your position"
                            />
                        </div>
                    </div>

                    {/* Facebook */}
                    <div>
                        <label
                            htmlFor="facebookUsername"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Facebook Username
                        </label>

                        <input
                            id="facebookUsername"
                            name="facebookUsername"
                            type="text"
                            value={formData.facebookUsername}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Enter Facebook username"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label
                            htmlFor="bio"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            name="bio"
                            rows={5}
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Tell us something about yourself..."
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end border-t border-gray-200 pt-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />

                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;