import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search, RotateCcw, Filter } from "lucide-react";

import FormInput from "../../pages/shared/forms/FormInput";

const actionOptions = [
    { value: "", label: "All Actions" },
    { value: "login", label: "Login" },
    { value: "logout", label: "Logout" },
    { value: "settings", label: "Settings" },
    { value: "backup", label: "Backup" },
    { value: "restore", label: "Restore" },
    { value: "cache", label: "Cache" },
    { value: "maintenance", label: "Maintenance" },
    { value: "delete", label: "Delete" },
];

const statusOptions = [
    { value: "", label: "All Status" },
    { value: "success", label: "Success" },
    { value: "failed", label: "Failed" },
    { value: "warning", label: "Warning" },
    { value: "pending", label: "Pending" },
];

const ActivityFilters = ({
    users = [],
    defaultValues = {},
    loading = false,
    onFilter,
    onReset,
}) => {

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({

        defaultValues: {

            search: "",

            action: "",

            status: "",

            user: "",

            start_date: "",

            end_date: "",

            ...defaultValues,

        },

    });

    useEffect(() => {

        reset({

            search: "",

            action: "",

            status: "",

            user: "",

            start_date: "",

            end_date: "",

            ...defaultValues,

        });

    }, [defaultValues, reset]);

    const handleReset = () => {

        const values = {

            search: "",

            action: "",

            status: "",

            user: "",

            start_date: "",

            end_date: "",

        };

        reset(values);

        onReset(values);

    };

    const userOptions = [

        {
            value: "",
            label: "All Users",
        },

        ...users.map((user) => ({

            value: user.id,

            label: user.name,

        })),

    ];

    return (

        <form
            onSubmit={handleSubmit(onFilter)}
            className="rounded-2xl border bg-white p-6 shadow-sm"
        >

            <div className="mb-6 flex items-center gap-3">

                <Filter
                    size={22}
                    className="text-blue-600"
                />

                <h2 className="text-lg font-semibold">

                    Activity Filters

                </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <FormInput
                    control={control}
                    name="search"
                    label="Search"
                    placeholder="Search logs..."
                    leftIcon={<Search size={18} />}
                />

                <FormSelect
                    control={control}
                    name="action"
                    label="Action"
                    options={actionOptions}
                />

                <FormSelect
                    control={control}
                    name="status"
                    label="Status"
                    options={statusOptions}
                />

                <FormSelect
                    control={control}
                    name="user"
                    label="User"
                    options={userOptions}
                />

                <FormInput
                    control={control}
                    name="start_date"
                    label="Start Date"
                    type="date"
                />

                <FormInput
                    control={control}
                    name="end_date"
                    label="End Date"
                    type="date"
                />

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

                <button
                    type="button"
                    disabled={loading}
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
                >

                    <RotateCcw size={18} />

                    Reset

                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >

                    <Search size={18} />

                    Apply Filters

                </button>

            </div>

        </form>

    );

};

ActivityFilters.propTypes = {

    users: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]).isRequired,

            name: PropTypes.string.isRequired,

        })

    ),

    defaultValues: PropTypes.shape({

        search: PropTypes.string,

        action: PropTypes.string,

        status: PropTypes.string,

        user: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        start_date: PropTypes.string,

        end_date: PropTypes.string,

    }),

    loading: PropTypes.bool,

    onFilter: PropTypes.func.isRequired,

    onReset: PropTypes.func.isRequired,

};

ActivityFilters.defaultProps = {

    users: [],

    defaultValues: {},

    loading: false,

};

export default ActivityFilters;