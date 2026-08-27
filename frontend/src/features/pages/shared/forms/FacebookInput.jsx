import React from "react";

const FacebookInput = ({
    label = "Facebook Username",
    name = "facebookUsername",
    register,
    errors,
    disabled = false,
    placeholder = "john.doe",
}) => {
    return (
        <div className="space-y-2">
            {/* Label */}
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            {/* Input */}
            <div
                className={`flex overflow-hidden rounded-lg border ${
                    errors[name]
                        ? "border-red-500"
                        : "border-gray-300 focus-within:border-blue-500"
                }`}
            >
                <span className="bg-gray-100 px-3 py-3 text-sm text-gray-600 border-r border-gray-300 whitespace-nowrap">
                    facebook.com/
                </span>

                <input
                    id={name}
                    type="text"
                    disabled={disabled}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(name)}
                    className="w-full px-4 py-3 outline-none disabled:bg-gray-100"
                />
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500">
                Enter only your Facebook username.
            </p>

            {/* Error */}
            {errors[name] && (
                <p className="text-sm text-red-500">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default FacebookInput;