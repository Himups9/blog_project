import React from "react";

const FormRadio = ({
    label,
    name,
    options,
    register,
    errors,
    disabled = false,
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="flex flex-wrap gap-6">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            value={option.value}
                            {...register(name)}
                            disabled={disabled}
                            className="h-4 w-4 accent-blue-600"
                        />

                        <span className="text-gray-700">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>

            {errors[name] && (
                <p className="text-sm text-red-500">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default FormRadio;