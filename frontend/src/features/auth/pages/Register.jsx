// frontend/src/components/auth/Register.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { registerSchema } from "../../utils/validators";

import UserForm from "../../pages/shared/forms/UserForm";
import SubmitButton from "../../pages/shared/forms/SubmitButton";
import PageTransition from "../../pages/shared/components/PageTransition";

import "./Auth.css";

const Register = () => {
    const { register: registerUser } = useAuth();

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            position: "",
            profileImage: null,
            facebookUsername: "",
            password: "",
            confirmPassword: "",
            bio: "",
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
        const result = await registerUser(data);

        if (result.success) {
            toast.success("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

            return;
        }

        toast.error(
            result.error?.message ||
                "Registration failed."
        );

        const serverErrors =
            result.error?.errors;

        if (serverErrors) {
            Object.entries(serverErrors).forEach(
                ([field, value]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(value)
                            ? value[0]
                            : String(value),
                    });
                }
            );
        }
    } catch (error) {
        console.error(
            "Registration error:",
            error
        );

        toast.error(
            "Something went wrong during registration."
        );
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <PageTransition>
            <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#667eea] to-[#764ba2] p-4">
                <div className="my-4 w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6 md:my-8 md:p-10">

                    {/* Header */}
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="text-2xl font-bold text-slate-600 md:text-3xl">
                            Create Account
                        </h2>

                        <p className="text-sm font-semibold text-slate-400">
                            Join our community of bloggers
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 gap-4 px-0 sm:px-2 md:grid-cols-2 md:gap-6 md:px-4"
                    >
                        <UserForm
                            register={register}
                            errors={errors}
                            watch={watch}
                            isSubmitting={isSubmitting}
                            showPassword={true}
                            showEmail={true}
                            currentImage={null}
                        />

                        <SubmitButton
                            loading={isSubmitting}
                            text="Create Account"
                            loadingText="Creating Account..."
                            className="md:col-span-2"
                        />
                    </form>

                    {/* Login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-[#667eea] hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Register;