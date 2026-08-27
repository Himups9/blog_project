import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils/imageUrl";

import {
    UserRound,
    X,
    Mail,
    ShieldCheck,
} from "lucide-react";


export const EditUserModal = ({
    user,
    isOpen,
    onClose,
    loading = false,
    children,
}) => {

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [imageError, setImageError] =
        useState(false);


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
    | Escape Key
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const handleEscape = (event) => {

            if (
                event.key === "Escape" &&
                !loading
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

    }, [
        isOpen,
        loading,
        onClose,
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
        `${user?.firstName || ""} ${user?.lastName || ""}`
            .trim() || "User";


    const initials =
        `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`
            .toUpperCase() || "U";


    const imageUrl =
        getImageUrl(
            user?.profileImage
        );


    const role =
        typeof user?.role === "string"
            ? user.role
            : user?.role?.name || "User";


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => {

                if (!loading) {
                    onClose();
                }

            }}
        >

            {/* =========================================================
                Modal
            ========================================================== */}

            <div
                className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="relative overflow-hidden bg-linear-to-r from-teal-600 to-cyan-600 px-6 py-5">

                    {/* Decorative circles */}

                    <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />

                    <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-white/5" />


                    <div className="relative flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">

                                <UserRound
                                    size={22}
                                    className="text-white"
                                />

                            </div>


                            <div>

                                <h2 className="text-xl font-bold text-white">
                                    Edit User
                                </h2>

                                <p className="mt-0.5 text-sm text-teal-50">
                                    Update account information
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Close modal"
                            className="rounded-xl p-2 text-white/80 transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            <X size={21} />

                        </button>

                    </div>

                </div>


                {/* =====================================================
                    Body
                ====================================================== */}

                <div className="flex-1 overflow-y-auto">

                    <div className="p-6">

                        {/* =================================================
                            User Summary
                        ================================================== */}

                        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

                                {/* User */}

                                <div className="flex items-center gap-4">

                                    {imageUrl && !imageError ? (

                                        <img
                                            src={imageUrl}
                                            alt={fullName}
                                            className="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-white shadow-md"
                                            onError={() =>
                                                setImageError(true)
                                            }
                                        />

                                    ) : (

                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-600 text-lg font-bold text-white ring-4 ring-white shadow-md">
                                            {initials}
                                        </div>

                                    )}


                                    <div className="min-w-0">

                                        <h3 className="truncate text-lg font-semibold text-slate-800">
                                            {fullName}
                                        </h3>


                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">

                                            <Mail size={14} />

                                            <span className="truncate">
                                                {user.email}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Role */}

                                <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm sm:self-center">

                                    <ShieldCheck
                                        size={15}
                                        className="text-teal-600"
                                    />

                                    <span className="text-xs font-semibold capitalize text-slate-700">
                                        {role}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            Form
                        ================================================== */}

                        <div>
                            {children}
                        </div>

                    </div>

                </div>


                {/* =====================================================
                    Footer
                ====================================================== */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Status */}

                    <p className="hidden text-xs text-slate-500 sm:block">
                        Make sure the information is correct before saving.
                    </p>


                    <div className="flex justify-end gap-3">

                        {/* Cancel */}

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>


                        {/* Save */}

                        <button
                            type="submit"
                            form="edit-user-form"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-teal-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-teal-700 hover:to-cyan-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (

                                <>

                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                    Saving...

                                </>

                            ) : (

                                "Save Changes"

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default EditUserModal;