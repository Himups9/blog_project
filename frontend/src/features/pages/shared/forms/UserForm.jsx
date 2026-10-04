import FormInput from "./FormInput";
import FormRadio from "./FormRadio";
import FormTextarea from "./formTextarea";
import FormFileUpload from "./FormFileUpload";
import FacebookInput from "./FacebookInput";

const UserForm = ({
    user,
    register,
    errors,
    watch,
    isSubmitting = false,
    showPassword = false,
    showEmail = true,
    currentImage = null,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">

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
                    user?.profileImage || currentImage || null
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

            {user && (
                <FormInput
                    name="role"
                    label="Role"
                    register={register}
                    errors={errors}
                    disabled={isSubmitting}
                />
            )}

            {/* =========================================================
                Account Status
            ========================================================== */}

            {user && (
                <div className="grid gap-4 md:grid-cols-2">

                    {/* Active */}

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("isActive")}
                            disabled={isSubmitting}
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
                            {...register("isVerified")}
                            disabled={isSubmitting}
                            className="h-4 w-4"
                        />

                        <span className="text-sm font-medium text-slate-700">
                            Email Verified
                        </span>
                    </label>

                </div>
            )}

            {/* =========================================================
                Password
            ========================================================== */}

            {showPassword && (
                <div className="grid gap-4 md:grid-cols-2 col-span-2">

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

        </div>
    );
};

export default UserForm;