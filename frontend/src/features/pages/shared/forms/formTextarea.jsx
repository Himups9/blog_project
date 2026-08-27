import React from "react";

const FormTextarea = ({
    label,
    name,
    register,
    errors,
    disabled = false,
    rows = 4,
    maxLength,
    placeholder = "",
    className = "",
    watch,
}) => {
    const value = watch ? watch(name) || "" : "";

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label */}
            <div className="flex items-center justify-between">
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>

                {maxLength && (
                    <span className="text-xs text-gray-500">
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>

            {/* Textarea */}
            <textarea
                id={name}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={!!errors?.[name]}
                {...register(name)}
                className={`w-full rounded-lg border px-4 py-3 outline-none transition
                    ${
                        errors[name]
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }
                    ${
                        disabled
                            ? "cursor-not-allowed bg-gray-100"
                            : "bg-white"
                    }`}
            />

            {/* Error */}
            {errors ?. [name] && (
                <p className="text-sm text-red-500">
                    {errors?.[name]?.message}
                </p>
            )}
        </div>
    );
};

export default FormTextarea;