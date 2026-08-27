import React from "react";

const SubmitButton = ({
    text,
    loading = false,
    loadingText = "Please wait...",
    className = "",
    disabled = false,
}) => {
    return (
        <button
            type="submit"
            disabled={loading || disabled}
            className={`
                w-full rounded-lg bg-[#667eea]
                px-6 py-3
                font-semibold text-white
                transition duration-300
                hover:bg-[#5a67d8]
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${className}
            `}
        >
            {loading ? loadingText : text}
        </button>
    );
};

export default SubmitButton;