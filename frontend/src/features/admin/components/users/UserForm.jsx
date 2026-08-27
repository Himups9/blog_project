import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getImageUrl } from "../../../utils/imageUrl";

import {
    User,
    Mail,
    Phone,
    AtSign,
    AlignLeft,
    Shield,
    Camera,
    Trash2,
} from "lucide-react";

import { adminUserSchema } from "../../validators/adminUserSchema";

export default function UserForm({
    user,
    onSubmit,
}) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: yupResolver(adminUserSchema),

        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            bio: "",
            facebookUsername: "",
            position: "",
            role: "USER",
            isActive: true,
            isVerified: false,
            profileImage: null,
            removeImage: false,
        },
    });

    const fileInputRef = useRef(null);

    const [previewImage, setPreviewImage] =
        useState(null);

    const [imageError, setImageError] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const firstName =
        watch("firstName") || user?.firstName || "";

    const lastName =
        watch("lastName") || user?.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim() || "User";

    const initials =
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`
            .toUpperCase() || "U";

    /*
    |--------------------------------------------------------------------------
    | Existing Server Image
    |--------------------------------------------------------------------------
    */

    const imageUrl =
        user?.profileImage
            ? getImageUrl(user.profileImage)
            : null;

    /*
    |--------------------------------------------------------------------------
    | Load User
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!user) {
            return;
        }

        reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            gender: user.gender || "",
            bio: user.bio || "",
            facebookUsername:
                user.facebookUsername || "",
            position: user.position || "",
            role: user.role || "USER",
            isActive: Boolean(user.isActive),
            isVerified: Boolean(user.isVerified),
            profileImage: null,
            removeImage: false,
        });

        setPreviewImage(null);
        setImageError(false);

    }, [user, reset]);

    /*
    |--------------------------------------------------------------------------
    | Image Change
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        const maxSize =
            2 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            alert(
                "Only JPG, PNG and WEBP images are allowed."
            );

            event.target.value = "";

            return;
        }

        if (file.size > maxSize) {
            alert(
                "Maximum image size is 2 MB."
            );

            event.target.value = "";

            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Store File In React Hook Form
        |--------------------------------------------------------------------------
        */

        setValue(
            "profileImage",
            file,
            {
                shouldValidate: true,
                shouldDirty: true,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Reset Remove Flag
        |--------------------------------------------------------------------------
        */

        setValue(
            "removeImage",
            false
        );

        /*
        |--------------------------------------------------------------------------
        | Create Preview
        |--------------------------------------------------------------------------
        */

        const objectUrl =
            URL.createObjectURL(file);

        setPreviewImage(objectUrl);

        setImageError(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Image
    |--------------------------------------------------------------------------
    */

    const handleRemoveImage = () => {

        setPreviewImage(null);

        setImageError(false);

        setValue(
            "profileImage",
            null,
            {
                shouldDirty: true,
            }
        );

        setValue(
            "removeImage",
            true,
            {
                shouldDirty: true,
            }
        );

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Image To Display
    |--------------------------------------------------------------------------
    */

    const displayImage =
        previewImage ||
        imageUrl ||
        null;

    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const inputStyle =
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100";

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submitForm = (data) => {

        console.log(
            "USER FORM DATA:",
            data
        );

        console.log(
            "PROFILE IMAGE:",
            data.profileImage
        );

        onSubmit(data);
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <form
            id="edit-user-form"
            onSubmit={handleSubmit(submitForm)}
            className="space-y-6"
        >

            {/* ====================================================
                Personal Information
            ==================================================== */}

            <section>

                <h3 className="mb-5 text-lg font-semibold text-slate-800">
                    Personal Information
                </h3>

                {/* Profile Picture */}

                <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-6">

                    <h3 className="mb-6 text-lg font-semibold text-slate-800">
                        Profile Picture
                    </h3>

                    <div className="flex flex-col items-center gap-5">

                        {displayImage && !imageError ? (

                            <img
                                src={displayImage}
                                alt={fullName}
                                className="h-32 w-32 rounded-full border-4 border-teal-500 object-cover shadow-lg"
                                onError={() => {
                                    setImageError(true);
                                }}
                            />

                        ) : (

                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-600 text-4xl font-bold text-white shadow-lg">

                                {initials}

                            </div>

                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <div className="flex gap-3">

                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 disabled:opacity-50"
                            >
                                <Camera size={18} />

                                Change Picture
                            </button>

                            <button
                                type="button"
                                disabled={
                                    isSubmitting ||
                                    !displayImage
                                }
                                onClick={
                                    handleRemoveImage
                                }
                                className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                                <Trash2 size={18} />

                                Remove
                            </button>

                        </div>

                    </div>

                </div>

                {/* First / Last Name */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                            <User size={18} />
                            First Name
                        </label>

                        <input
                            {...register("firstName")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.firstName?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                            <User size={18} />
                            Last Name
                        </label>

                        <input
                            {...register("lastName")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.lastName?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                            <Mail size={18} />
                            Email Address
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.email?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                            <Phone size={18} />
                            Phone Number
                        </label>

                        <input
                            {...register("phone")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.phone?.message}
                        </p>

                    </div>

                </div>

            </section>

            {/* ====================================================
                Additional Information
            ==================================================== */}

            <section>

                <h3 className="mb-5 text-lg font-semibold text-slate-800">
                    Additional Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">
                            Gender
                        </label>

                        <select
                            {...register("gender")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.gender?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">
                            Position
                        </label>

                        <input
                            {...register("position")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.position?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                            <AtSign size={18} />
                            Facebook Username
                        </label>

                        <input
                            {...register("facebookUsername")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.facebookUsername?.message}
                        </p>

                    </div>

                    <div>

                        <label className="flex items-center gap-2 font-medium text-slate-700">
                            <Shield size={18} />
                            Role
                        </label>

                        <select
                            {...register("role")}
                            disabled={isSubmitting}
                            className={inputStyle}
                        >
                            <option value="USER">
                                User
                            </option>

                            <option value="AUTHOR">
                                Author
                            </option>

                            <option value="EDITOR">
                                Editor
                            </option>

                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.role?.message}
                        </p>

                    </div>

                </div>

            </section>

            {/* ====================================================
                Bio
            ==================================================== */}

            <section>

                <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">

                    <AlignLeft size={18} />

                    Biography

                </label>

                <textarea
                    rows={5}
                    {...register("bio")}
                    disabled={isSubmitting}
                    className={inputStyle}
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.bio?.message}
                </p>

            </section>

            {/* ====================================================
                Account Settings
            ==================================================== */}

            <section>

                <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">

                    <Shield size={18} />

                    Account Settings

                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-teal-500 hover:bg-slate-50">

                        <input
                            type="checkbox"
                            {...register("isActive")}
                            disabled={isSubmitting}
                            className="h-5 w-5 accent-teal-600"
                        />

                        <div>

                            <p className="font-medium">
                                Active Account
                            </p>

                            <p className="text-sm text-slate-500">
                                Allow this user to log in.
                            </p>

                        </div>

                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-teal-500 hover:bg-slate-50">

                        <input
                            type="checkbox"
                            {...register("isVerified")}
                            disabled={isSubmitting}
                            className="h-5 w-5 accent-teal-600"
                        />

                        <div>

                            <p className="font-medium">
                                Email Verified
                            </p>

                            <p className="text-sm text-slate-500">
                                Mark this user's email as verified.
                            </p>

                        </div>

                    </label>

                </div>

            </section>

            {/* Hidden Submit */}

            <button
                type="submit"
                disabled={isSubmitting}
                className="hidden"
            />

        </form>
    );
}