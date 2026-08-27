import { useState } from "react";
import { X } from "lucide-react";

const MAX_TAGS = 10;
const MAX_LENGTH = 30;

const TagInput = ({
    label = "Tags",
    value = [],
    onChange,
    options = [],
    error,
    placeholder = "Type a tag and press Enter",
    required = false,
}) => {
    const [input, setInput] = useState("");

    const addTag = () => {
        const tag = input.trim();

        if (!tag) return;

        if (tag.length > MAX_LENGTH) return;

        const selectedOption = options.find(
            (option) =>
                option.label.toLowerCase() === tag.toLowerCase() ||
                option.value === tag
        );

        if (!selectedOption) return;

        if (value.includes(selectedOption.value)) {
            setInput("");
            return;
        }

        if (value.length >= MAX_TAGS) return;

        onChange([...value, selectedOption.value]);
        setInput("");
    };

    const removeTag = (tag) => {
        onChange(value.filter((item) => item !== tag));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }

        if (
            e.key === "Backspace" &&
            input === "" &&
            value.length
        ) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <div className="rounded-xl border border-gray-300 bg-white p-3 focus-within:border-blue-500">
                <div className="mb-2 flex flex-wrap gap-2">
                    {value.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                        >
                            {options.find((option) => option.value === tag)?.label || tag}

                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-blue-700 hover:text-red-600"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>

                <input
                    type="text"
                    value={input}
                    placeholder={
                        options.length
                            ? placeholder
                            : "No tags available"
                    }
                    disabled={!options.length}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border-none outline-none"
                />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>
                    {value.length}/{MAX_TAGS} tags
                </span>

                <span>
                    Max {MAX_LENGTH} characters per tag
                </span>
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TagInput;
