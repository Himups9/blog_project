const CategorySelect = ({
    label = "Category",
    name = "category",
    value = "",
    onChange,
    categories = [],
    loading = false,
    error,
    required = false,
    disabled = false,
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
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || loading}
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
                <option value="">
                    {loading
                        ? "Loading categories..."
                        : "Select Category"}
                </option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
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

export default CategorySelect;