const DEFAULT_OPTIONS = [
    {
        value: "draft",
        label: "Draft",
    },
    {
        value: "published",
        label: "Published",
    },
];

const BlogStatusSelect = ({
    label = "Status",
    name = "status",
    value = "draft",
    onChange,
    options = DEFAULT_OPTIONS,
    error,
    required = false,
    disabled = false,
    loading = false,
}) => {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700"
            >
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                disabled={disabled || loading}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }
                    ${
                        disabled || loading
                            ? "cursor-not-allowed bg-gray-100"
                            : "bg-white"
                    }`}
            >
                {options.map((status) => (
                    <option
                        key={status.value}
                        value={status.value}
                    >
                        {status.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default BlogStatusSelect;