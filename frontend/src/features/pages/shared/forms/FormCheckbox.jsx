import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const FormCheckbox = ({
    control,
    name,
    label,
    disabled = false,
    className = "",
}) => {

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <label
                    className={`flex items-center gap-3 cursor-pointer ${className}`}
                >
                    <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={disabled}
                        className="
                            h-5
                            w-5
                            rounded
                            border-gray-300
                            text-blue-600
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <span className="text-sm text-gray-700">
                        {label}
                    </span>
                </label>
            )}
        />
    );

};

FormCheckbox.propTypes = {

    control: PropTypes.object.isRequired,

    name: PropTypes.string.isRequired,

    label: PropTypes.string.isRequired,

    disabled: PropTypes.bool,

    className: PropTypes.string,

};

export default FormCheckbox;