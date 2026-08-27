import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Palette,
    Copy,
    RotateCcw,
    Check,
} from "lucide-react";

const ColorPicker = ({
    label,
    value = "#2563eb",
    defaultColor = "#2563eb",
    onChange,
    disabled = false,
}) => {

    const [color, setColor] = useState(value);

    const [copied, setCopied] = useState(false);

    useEffect(() => {

        setColor(value);

    }, [value]);

    const handleColorChange = (newColor) => {

        setColor(newColor);

        onChange?.(newColor);

    };

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(color);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 1500);

        } catch (error) {

            console.error(error);

        }

    };

    const handleReset = () => {

        handleColorChange(defaultColor);

    };

    return (

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <Palette
                        size={18}
                        className="text-blue-600"
                    />

                    <span className="font-medium text-gray-800">

                        {label}

                    </span>

                </div>

                <div
                    className="h-8 w-8 rounded-lg border"
                    style={{
                        backgroundColor: color,
                    }}
                />

            </div>

            <input
                type="color"
                value={color}
                disabled={disabled}
                onChange={(event) =>
                    handleColorChange(event.target.value)
                }
                className="h-12 w-full cursor-pointer rounded-lg border border-gray-300"
            />

            <div className="mt-4">

                <label className="mb-2 block text-sm text-gray-600">

                    Hex Color

                </label>

                <input
                    type="text"
                    value={color}
                    disabled={disabled}
                    onChange={(event) =>
                        handleColorChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >

                    {copied
                        ? (
                            <Check size={16} />
                        )
                        : (
                            <Copy size={16} />
                        )}

                    {copied
                        ? "Copied"
                        : "Copy"}

                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
                >

                    <RotateCcw size={16} />

                    Reset

                </button>

            </div>

        </div>

    );

};

ColorPicker.propTypes = {

    label: PropTypes.string.isRequired,

    value: PropTypes.string,

    defaultColor: PropTypes.string,

    onChange: PropTypes.func.isRequired,

    disabled: PropTypes.bool,

};

ColorPicker.defaultProps = {

    value: "#2563eb",

    defaultColor: "#2563eb",

    disabled: false,

};

export default ColorPicker;