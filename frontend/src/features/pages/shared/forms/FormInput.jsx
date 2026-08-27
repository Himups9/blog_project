const FormInput = ({
    label,
    name,
    type = "text",
    placeholder,
    register,
    errors,
    disabled,
}) => {

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                disabled={disabled}
                className={`form-input ${errors[name] ? "error" : ""
                }`}
            />

            {errors[name] && (
                <span className="error-message">
                    {errors[name].message}
                </span>
            )}
        </div>
    );
};

export default FormInput;