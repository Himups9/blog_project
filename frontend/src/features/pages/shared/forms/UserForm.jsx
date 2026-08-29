import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "./FormInput";
import FormRadio from "./FormRadio";
import FormTextarea from "./formTextarea";
import FormFileUpload from "./FormFileUpload";
import FacebookInput from "./FacebookInput";

import { updateUserSchema } from "../../../utils/validators";


const UserForm = ({
    user,
    onSubmit,
    isSubmitting = false,
    showPassword = false,
    showEmail = true,
}) => {

    /*
    |--------------------------------------------------------------------------
    | React Hook Form
    |--------------------------------------------------------------------------
    */

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {
            errors,
        },
    } = useForm({

        resolver: zodResolver(
            updateUserSchema
        ),

        defaultValues: {

            email:
                user?.email || "",

            phone:
                user?.phone || "",

            firstName:
                user?.firstName || "",

            lastName:
                user?.lastName || "",

            gender:
                user?.gender || "",

            position:
                user?.position || "",

            facebookUsername:
                user?.facebookUsername || "",

            bio:
                user?.bio || "",

            role:
                typeof user?.role === "string"
                    ? user.role
                    : user?.role?.name || "USER",

            isActive:
                user?.isActive ?? true,

            isVerified:
                user?.isVerified ?? false,

            profileImage:
                null,

            password:
                "",

            confirmPassword:
                "",
        },
    });


    /*
    |--------------------------------------------------------------------------
    | Reset Form When User Changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!user) {
            return;
        }

        reset({

            email:
                user.email || "",

            phone:
                user.phone || "",

            firstName:
                user.firstName || "",

            lastName:
                user.lastName || "",

            gender:
                user.gender || "",

            position:
                user.position || "",

            facebookUsername:
                user.facebookUsername || "",

            bio:
                user.bio || "",

            role:
                typeof user.role === "string"
                    ? user.role
                    : user.role?.name || "USER",

            isActive:
                user.isActive ?? true,

            isVerified:
                user.isVerified ?? false,

            /*
             * Never put the existing image URL
             * into the file input.
             */
            profileImage:
                null,

            password:
                "",

            confirmPassword:
                "",
        });

    }, [user, reset]);


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

        /*
        |--------------------------------------------------------------------------
        | Profile Image Debug
        |--------------------------------------------------------------------------
        */

        if (
            data.profileImage instanceof FileList
        ) {

            console.log(
                "PROFILE IMAGE COUNT:",
                data.profileImage.length
            );

            if (
                data.profileImage.length > 0
            ) {

                console.log(
                    "SELECTED PROFILE IMAGE:",
                    data.profileImage[0]
                );

            }

        }

        /*
        |--------------------------------------------------------------------------
        | Send Data To Users.jsx
        |--------------------------------------------------------------------------
        */

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
            onSubmit={
                handleSubmit(submitForm)
            }
            className="space-y-6"
        >

            {/* =========================================================
                Email
            ========================================================== */}

            {showEmail && (

                <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    register={register}
                    errors={errors}
                    disabled={isSubmitting}
                />

            )}


            {/* =========================================================
                Phone
            ========================================================== */}

            <FormInput
                name="phone"
                type="tel"
                label="Phone Number"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />


            {/* =========================================================
                First Name
            ========================================================== */}

            <FormInput
                name="firstName"
                label="First Name"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />


            {/* =========================================================
                Last Name
            ========================================================== */}

            <FormInput
                name="lastName"
                label="Last Name"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />


            {/* =========================================================
                Gender
            ========================================================== */}

            <FormRadio
                label="Gender"
                name="gender"
                register={register}
                errors={errors}
                disabled={isSubmitting}
                options={[
                    {
                        label: "Male",
                        value: "MALE",
                    },
                    {
                        label: "Female",
                        value: "FEMALE",
                    },
                    {
                        label: "Other",
                        value: "OTHER",
                    },
                ]}
            />


            {/* =========================================================
                Position
            ========================================================== */}

            <FormTextarea
                label="Position"
                name="position"
                register={register}
                errors={errors}
                watch={watch}
                rows={1}
                maxLength={100}
                placeholder="Enter your position"
                disabled={isSubmitting}
            />


            {/* =========================================================
                Profile Image
            ========================================================== */}

            <FormFileUpload
                label="Profile Picture"
                name="profileImage"
                register={register}
                errors={errors}
                watch={watch}
                disabled={isSubmitting}
                currentImage={
                    user?.profileImage || null
                }
            />


            {/* =========================================================
                Facebook
            ========================================================== */}

            <FacebookInput
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />


            {/* =========================================================
                Role
            ========================================================== */}

            <FormInput
                name="role"
                label="Role"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />


            {/* =========================================================
                Account Status
            ========================================================== */}

            <div className="grid gap-4 md:grid-cols-2">

                {/* Active */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        {...register(
                            "isActive"
                        )}
                        disabled={
                            isSubmitting
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm font-medium text-slate-700">
                        Active User
                    </span>

                </label>


                {/* Verified */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        {...register(
                            "isVerified"
                        )}
                        disabled={
                            isSubmitting
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm font-medium text-slate-700">
                        Email Verified
                    </span>

                </label>

            </div>


            {/* =========================================================
                Password
            ========================================================== */}

            {showPassword && (

                <div className="grid gap-4 md:grid-cols-2">

                    <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        register={register}
                        errors={errors}
                        disabled={isSubmitting}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        register={register}
                        errors={errors}
                        disabled={isSubmitting}
                    />

                </div>

            )}


            {/* =========================================================
                Bio
            ========================================================== */}

            <FormTextarea
                label="Bio"
                name="bio"
                register={register}
                errors={errors}
                watch={watch}
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself"
                className="md:col-span-2"
                disabled={isSubmitting}
            />

        </form>
    );
};


export default UserForm;