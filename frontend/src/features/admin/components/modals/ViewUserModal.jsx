import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils/imageUrl";

import {
    X,
    Calendar,
    Mail,
    Phone,
    User,
    Shield,
    Clock,
    Briefcase,
    CheckCircle,
    XCircle,
} from "lucide-react";

export default function ViewUserModal({
    user,
    isOpen,
    onClose,
}) {

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [imageError, setImageError] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Escape Key
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const handleEscape = (event) => {

            if (
                event.key === "Escape" &&
                isOpen
            ) {
                onClose();
            }

        };

        if (isOpen) {
            window.addEventListener(
                "keydown",
                handleEscape
            );
        }

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, [isOpen, onClose]);


    /*
    |--------------------------------------------------------------------------
    | Reset Image Error
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        setImageError(false);
    }, [
        user?.id,
        user?.profileImage,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Don't Render
    |--------------------------------------------------------------------------
    */

    if (!isOpen || !user) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const fullName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Unknown User";


    const initials =
        `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
            .toUpperCase() || "U";


    /*
    |--------------------------------------------------------------------------
    | Role
    |--------------------------------------------------------------------------
    */

    const role =
        typeof user.role === "string"
            ? user.role
            : user.role?.name || "User";


    /*
    |--------------------------------------------------------------------------
    | Profile Image
    |--------------------------------------------------------------------------
    */

    const imageUrl =
        getImageUrl(user.profileImage);


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const isActive =
        Boolean(user.isActive);


    /*
    |--------------------------------------------------------------------------
    | Date Formatter
    |--------------------------------------------------------------------------
    */

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "Not available";
        }

        return parsedDate.toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Date Time Formatter
    |--------------------------------------------------------------------------
    */

    const formatDateTime = (date) => {

        if (!date) {
            return "Never";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "Never";
        }

        return parsedDate.toLocaleString(
            undefined,
            {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >

            <div
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-slate-800">
                            User Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View complete information about this user.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        aria-label="Close"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* =====================================================
                    Body
                ====================================================== */}

                <div className="max-h-[75vh] overflow-y-auto">

                    {/* =================================================
                        Profile Header
                    ================================================== */}

                    <div className="bg-linear-to-r from-teal-600 to-cyan-600 px-6 py-8">

                        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

                            {/* Avatar */}

                            {imageUrl && !imageError ? (

                                <img
                                    src={imageUrl}
                                    alt={fullName}
                                    className="h-24 w-24 rounded-full border-4 border-white/80 object-cover shadow-lg"
                                    onError={() =>
                                        setImageError(true)
                                    }
                                />

                            ) : (

                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/80 bg-white/20 text-2xl font-bold text-white shadow-lg backdrop-blur-sm">

                                    {initials}

                                </div>

                            )}


                            {/* User Name */}

                            <div className="mt-4 sm:ml-5 sm:mt-0">

                                <h3 className="text-2xl font-bold text-white">
                                    {fullName}
                                </h3>

                                <p className="mt-1 text-sm text-white/80">
                                    {user.email}
                                </p>

                                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">

                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                        {role}
                                    </span>

                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                            isActive
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >

                                        {isActive ? (
                                            <CheckCircle size={13} />
                                        ) : (
                                            <XCircle size={13} />
                                        )}

                                        {isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        Information
                    ================================================== */}

                    <div className="p-6">

                        <div className="mb-6">

                            <h4 className="text-lg font-bold text-slate-800">
                                Account Information
                            </h4>

                            <p className="mt-1 text-sm text-slate-500">
                                Basic information associated with this account.
                            </p>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <InfoCard
                                icon={<Mail size={18} />}
                                title="Email"
                                value={
                                    user.email ||
                                    "Not provided"
                                }
                            />

                            <InfoCard
                                icon={<Phone size={18} />}
                                title="Phone"
                                value={
                                    user.phone ||
                                    "Not provided"
                                }
                            />

                            <InfoCard
                                icon={<User size={18} />}
                                title="Gender"
                                value={
                                    user.gender ||
                                    "Not provided"
                                }
                            />

                            <InfoCard
                                icon={<Calendar size={18} />}
                                title="Date of Birth"
                                value={formatDate(
                                    user.dateOfBirth
                                )}
                            />

                            <InfoCard
                                icon={<Briefcase size={18} />}
                                title="Position"
                                value={
                                    user.position ||
                                    "Not provided"
                                }
                            />

                            <InfoCard
                                icon={<Shield size={18} />}
                                title="Role"
                                value={role}
                            />

                            <InfoCard
                                icon={<Calendar size={18} />}
                                title="Joined"
                                value={formatDate(
                                    user.createdAt
                                )}
                            />

                            <InfoCard
                                icon={<Clock size={18} />}
                                title="Last Login"
                                value={formatDateTime(
                                    user.lastLogin
                                )}
                            />

                        </div>


                        {/* =================================================
                            Account Status
                        ================================================== */}

                        <div className="mt-8">

                            <h4 className="mb-3 text-lg font-bold text-slate-800">
                                Account Status
                            </h4>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Account Status */}

                                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-lg bg-slate-200 p-2">

                                            <Shield
                                                size={18}
                                                className="text-slate-600"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-sm font-medium text-slate-800">
                                                Account Status
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                User access
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            isActive
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </span>

                                </div>


                                {/* Email Verification */}

                                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-lg bg-slate-200 p-2">

                                            <Mail
                                                size={18}
                                                className="text-slate-600"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-sm font-medium text-slate-800">
                                                Email Verification
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Email status
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            user.isVerified
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                        }`}
                                    >
                                        {user.isVerified
                                            ? "Verified"
                                            : "Unverified"}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            Biography
                        ================================================== */}

                        <div className="mt-8">

                            <h4 className="mb-3 text-lg font-bold text-slate-800">
                                Biography
                            </h4>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                    {user.bio ||
                                        "No biography available."}
                                </p>

                            </div>

                        </div>


                        {/* =================================================
                            Facebook
                        ================================================== */}

                        {user.facebookUsername && (

                            <div className="mt-6">

                                <InfoCard
                                    icon={<User size={18} />}
                                    title="Facebook Username"
                                    value={
                                        user.facebookUsername
                                    }
                                />

                            </div>

                        )}

                    </div>

                </div>


                {/* =====================================================
                    Footer
                ====================================================== */}

                <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-linear-to-r from-teal-600 to-cyan-600 px-6 py-2.5 font-medium text-white shadow-sm transition hover:from-teal-700 hover:to-cyan-700 hover:shadow-md"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Information Card
|--------------------------------------------------------------------------
*/

function InfoCard({
    icon,
    title,
    value,
}) {

    return (

        <div className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-200 hover:bg-teal-50/30">

            <div className="flex items-start gap-3">

                <div className="rounded-lg bg-teal-50 p-2.5 text-teal-600 transition group-hover:bg-teal-100">

                    {icon}

                </div>

                <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {title}
                    </p>

                    <p className="mt-1 wrap-break-words text-sm font-medium text-slate-700">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}