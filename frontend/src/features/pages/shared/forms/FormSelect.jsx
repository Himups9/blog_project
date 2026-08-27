import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const FormSelect = ({
    control,
    errors,
    name,
    label,
    options = [],
    placeholder = "Select an option",
    disabled = false,
    required = false,
    className = "",
}) => {

    return (
        <div className={className}>

            {label && (
                <label
                    htmlFor={name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (

                    <select
                        {...field}
                        id={name}
                        disabled={disabled}
                        className={`
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-gray-900
                            transition
                            duration-200
                            focus:border-blue-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            disabled:cursor-not-allowed
                            disabled:bg-gray-100
                            ${errors?.[name] ? "border-red-500" : ""}
                        `}
                    >

                        <option value="">
                            {placeholder}
                        </option>

                        {options.map((option) => (

                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>

                        ))}

                    </select>

                )}
            />

            {errors?.[name] && (
                <p className="mt-1 text-sm text-red-600">
                    {errors[name].message}
                </p>
            )}

        </div>
    );

};

FormSelect.propTypes = {

    control: PropTypes.object.isRequired,

    errors: PropTypes.object,

    name: PropTypes.string.isRequired,

    label: PropTypes.string,

    options: PropTypes.arrayOf(

        PropTypes.shape({

            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,

            label: PropTypes.string.isRequired,

        })

    ),

    placeholder: PropTypes.string,

    disabled: PropTypes.bool,

    required: PropTypes.bool,

    className: PropTypes.string,

};

export default FormSelect;