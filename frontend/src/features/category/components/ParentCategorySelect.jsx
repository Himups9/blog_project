import { Controller } from "react-hook-form";
import { GitBranch } from "lucide-react";

const ParentCategorySelect = ({
    control,
    categories = [],
    currentCategoryId,
    error,
}) => {
    const availableCategories =
        categories.filter(
            (category) =>
                category.id !== currentCategoryId
        );

    return (
        <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Parent Category
                    </label>

                    <div className="relative">
                        <GitBranch
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <select
                            {...field}
                            value={field.value || ""}
                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-10 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                No Parent Category
                            </option>

                            {availableCategories.map(
                                (category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error.message}
                        </p>
                    )}

                    <p className="mt-2 text-xs text-gray-500">
                        Leave empty to make this a top-level category.
                    </p>
                </div>
            )}
        />
    );
};

export default ParentCategorySelect;