import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Palette,
    RotateCcw,
} from "lucide-react";

import { settingsSchemas } from "../schemas/settingsSchema";

import FormInput from "../../pages/shared/forms/FacebookInput";
import FormSelect from "../../pages/shared/forms/FormSelect";
import FormCheckbox from "../../pages/shared/forms/FormCheckbox";

import ColorPicker from "./ColorPicker";
import SaveSettingsButton from "./SaveSettingsButton";

const fontOptions = [
    { value: "Sora", label: "Sora" },
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Poppins", label: "Poppins" },
];

const radiusOptions = [
    { value: "4", label: "Small" },
    { value: "8", label: "Medium" },
    { value: "12", label: "Large" },
    { value: "16", label: "Extra Large" },
];

const ThemeCustomizer = ({
    initialValues,
    onSubmit,
    onReset,
    loading = false,
}) => {

    const {
        control,
        watch,
        reset,
        handleSubmit,
        setValue,
        formState: {
            errors,
        },
    } = useForm({

        resolver: yupResolver(settingsSchema),

        defaultValues: {

            primary_color: "#2563eb",

            secondary_color: "#4f46e5",

            accent_color: "#14b8a6",

            success_color: "#16a34a",

            warning_color: "#f59e0b",

            danger_color: "#dc2626",

            background_color: "#ffffff",

            surface_color: "#f8fafc",

            text_color: "#111827",

            border_radius: "12",

            font_family: "Sora",

            base_font_size: "16",

            dark_mode: false,

            compact_layout: false,

            rtl_support: false,

            ...initialValues,

        },

    });

    useEffect(() => {

        if (initialValues) {

            reset({

                ...initialValues,

            });

        }

    }, [initialValues, reset]);

    const primaryColor = watch("primary_color");

    const secondaryColor = watch("secondary_color");

    const accentColor = watch("accent_color");

    const successColor = watch("success_color");

    const warningColor = watch("warning_color");

    const dangerColor = watch("danger_color");

    const backgroundColor = watch("background_color");

    const surfaceColor = watch("surface_color");

    const textColor = watch("text_color");

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
        >

            {/* ==========================================
                Theme Colors
            ========================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div className="flex items-center gap-3">

                    <Palette
                        size={24}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">

                            Theme Colors

                        </h2>

                        <p className="text-sm text-gray-500">

                            Configure your application's color palette.

                        </p>

                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <ColorPicker
                        label="Primary Color"
                        value={primaryColor}
                        onChange={(value) =>
                            setValue("primary_color", value)
                        }
                    />

                    <ColorPicker
                        label="Secondary Color"
                        value={secondaryColor}
                        onChange={(value) =>
                            setValue("secondary_color", value)
                        }
                    />

                    <ColorPicker
                        label="Accent Color"
                        value={accentColor}
                        onChange={(value) =>
                            setValue("accent_color", value)
                        }
                    />

                    <ColorPicker
                        label="Success Color"
                        value={successColor}
                        onChange={(value) =>
                            setValue("success_color", value)
                        }
                    />

                    <ColorPicker
                        label="Warning Color"
                        value={warningColor}
                        onChange={(value) =>
                            setValue("warning_color", value)
                        }
                    />

                    <ColorPicker
                        label="Danger Color"
                        value={dangerColor}
                        onChange={(value) =>
                            setValue("danger_color", value)
                        }
                    />

                </div>

            </section>

                        {/* ==========================================
                Typography
            ========================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Typography

                    </h2>

                    <p className="text-sm text-gray-500">

                        Customize the application's font family and base font size.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormSelect
                        control={control}
                        errors={errors}
                        name="font_family"
                        label="Font Family"
                        options={fontOptions}
                    />

                    <FormInput
                        control={control}
                        errors={errors}
                        name="base_font_size"
                        label="Base Font Size (px)"
                        type="number"
                        placeholder="16"
                    />

                </div>

            </section>

            {/* ==========================================
                Appearance
            ========================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Appearance

                    </h2>

                    <p className="text-sm text-gray-500">

                        Customize the application's visual appearance.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-3">

                    <ColorPicker
                        label="Background Color"
                        value={backgroundColor}
                        onChange={(value) =>
                            setValue("background_color", value)
                        }
                    />

                    <ColorPicker
                        label="Surface Color"
                        value={surfaceColor}
                        onChange={(value) =>
                            setValue("surface_color", value)
                        }
                    />

                    <ColorPicker
                        label="Text Color"
                        value={textColor}
                        onChange={(value) =>
                            setValue("text_color", value)
                        }
                    />

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <FormSelect
                        control={control}
                        errors={errors}
                        name="border_radius"
                        label="Border Radius"
                        options={radiusOptions}
                    />

                    <div className="space-y-5">

                        <FormCheckbox
                            control={control}
                            name="dark_mode"
                            label="Enable Dark Mode"
                        />

                        <FormCheckbox
                            control={control}
                            name="compact_layout"
                            label="Enable Compact Layout"
                        />

                        <FormCheckbox
                            control={control}
                            name="rtl_support"
                            label="Enable RTL Support"
                        />

                    </div>

                </div>

            </section>

                        {/* ==========================================
                Live Theme Preview
            ========================================== */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">

                        Live Theme Preview

                    </h2>

                    <p className="text-sm text-gray-500">

                        Preview how your selected colors and typography will
                        appear throughout the application.

                    </p>

                </div>

                <div
                    className="overflow-hidden rounded-2xl border shadow-sm"
                    style={{
                        backgroundColor,
                        color: textColor,
                        borderRadius: `${watch("border_radius")}px`,
                        fontFamily: watch("font_family"),
                        fontSize: `${watch("base_font_size")}px`,
                    }}
                >

                    {/* Preview Header */}

                    <div
                        className="flex items-center justify-between px-6 py-4"
                        style={{
                            backgroundColor: primaryColor,
                            color: "#ffffff",
                        }}
                    >

                        <h3 className="text-lg font-semibold">

                            Himalaya Tech CMS

                        </h3>

                        <span
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                                backgroundColor: accentColor,
                            }}
                        >

                            Preview

                        </span>

                    </div>

                    {/* Preview Body */}

                    <div
                        className="space-y-6 p-6"
                        style={{
                            backgroundColor: surfaceColor,
                        }}
                    >

                        <div>

                            <h4 className="text-xl font-bold">

                                Welcome to your Dashboard

                            </h4>

                            <p className="mt-2">

                                This preview demonstrates how your selected
                                theme will appear across the admin dashboard.

                            </p>

                        </div>

                        {/* Buttons */}

                        <div className="flex flex-wrap gap-4">

                            <button
                                type="button"
                                className="rounded-lg px-5 py-2 font-medium text-white transition"
                                style={{
                                    backgroundColor: primaryColor,
                                }}
                            >

                                Primary Button

                            </button>

                            <button
                                type="button"
                                className="rounded-lg px-5 py-2 font-medium text-white transition"
                                style={{
                                    backgroundColor: secondaryColor,
                                }}
                            >

                                Secondary

                            </button>

                            <button
                                type="button"
                                className="rounded-lg px-5 py-2 font-medium text-white transition"
                                style={{
                                    backgroundColor: accentColor,
                                }}
                            >

                                Accent

                            </button>

                        </div>

                        {/* Status Cards */}

                        <div className="grid gap-4 md:grid-cols-3">

                            <div
                                className="rounded-xl p-4 text-white"
                                style={{
                                    backgroundColor: successColor,
                                }}
                            >

                                Success Message

                            </div>

                            <div
                                className="rounded-xl p-4 text-white"
                                style={{
                                    backgroundColor: warningColor,
                                }}
                            >

                                Warning Message

                            </div>

                            <div
                                className="rounded-xl p-4 text-white"
                                style={{
                                    backgroundColor: dangerColor,
                                }}
                            >

                                Error Message

                            </div>

                        </div>

                        {/* Preview Card */}

                        <div
                            className="rounded-xl border p-5"
                            style={{
                                backgroundColor,
                                borderRadius: `${watch("border_radius")}px`,
                            }}
                        >

                            <h4 className="font-semibold">

                                Example Card

                            </h4>

                            <p className="mt-2 text-sm">

                                Cards, forms, tables, and dashboard widgets
                                will inherit your selected theme settings.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Theme Reset */}

                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={onReset}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-300
                            px-5
                            py-2.5
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100
                        "
                    >

                        <RotateCcw size={18} />

                        Reset Theme

                    </button>

                </div>

            </section>

                        {/* ==========================================
                Actions
            ========================================== */}

            <div className="flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between">

                <button
                    type="button"
                    onClick={onReset}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-300
                        px-6
                        py-3
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                    "
                >

                    <RotateCcw size={18} />

                    Reset to Default

                </button>

                <SaveSettingsButton
                    type="submit"
                    loading={loading}
                    text="Save Theme Settings"
                    loadingText="Saving..."
                    successText="Theme Updated"
                />

            </div>

        </form>

    );

};

ThemeCustomizer.propTypes = {

    initialValues: PropTypes.shape({

        primary_color: PropTypes.string,

        secondary_color: PropTypes.string,

        accent_color: PropTypes.string,

        success_color: PropTypes.string,

        warning_color: PropTypes.string,

        danger_color: PropTypes.string,

        background_color: PropTypes.string,

        surface_color: PropTypes.string,

        text_color: PropTypes.string,

        border_radius: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        font_family: PropTypes.string,

        base_font_size: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        dark_mode: PropTypes.bool,

        compact_layout: PropTypes.bool,

        rtl_support: PropTypes.bool,

    }),

    onSubmit: PropTypes.func.isRequired,

    onReset: PropTypes.func,

    loading: PropTypes.bool,

};

ThemeCustomizer.defaultProps = {

    initialValues: {},

    onReset: () => {},

    loading: false,

};

export default ThemeCustomizer;