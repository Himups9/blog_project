import { useEffect, useState } from "react";
import { History, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import ActivityFilters from "../components/ActivityFilters";
import ActivityTable from "../components/ActivityTable";
import Pagination from "../../admin/components/common/Pagination";

import { useSettings } from "../hooks/useSettings";

const ActivityLogs = () => {

    const {

        activityLogs,

        totalPages,

        totalItems,

        loadingActivity,

        fetchActivityLogs,

    } = useSettings();

    const defaultFilters = {

        search: "",

        action: "",

        status: "",

        user: "",

        start_date: "",

        end_date: "",

        page: 1,

        page_size: 10,

    };

    const [filters, setFilters] = useState(defaultFilters);

    useEffect(() => {

        loadActivities(filters);

    }, [filters]);

    const loadActivities = async (params) => {

        try {

            await fetchActivityLogs(params);

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to load activity logs."

            );

        }

    };

    const handleFilter = (values) => {

        setFilters({

            ...filters,

            ...values,

            page: 1,

        });

    };

    const handleReset = () => {

        setFilters(defaultFilters);

    };

    const handlePageChange = (page) => {

        setFilters((previous) => ({

            ...previous,

            page,

        }));

    };

    const handleRefresh = () => {

        loadActivities(filters);

    };

    const handleView = (activity) => {

        console.log(activity);

        toast.success("Activity details modal coming soon.");

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="Activity Logs"

                description="View administrator actions and system activity logs."

                icon={History}

                actions={

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loadingActivity}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                }

            >

                <ActivityFilters

                    values={filters}

                    loading={loadingActivity}

                    onFilter={handleFilter}

                    onReset={handleReset}

                />

                <div className="mt-6">

                    <ActivityTable

                        activities={activityLogs}

                        loading={loadingActivity}

                        onView={handleView}

                    />

                </div>

                <div className="mt-6">

                    <Pagination

                        currentPage={filters.page}

                        totalPages={totalPages}

                        totalItems={totalItems}

                        onPageChange={handlePageChange}

                    />

                </div>

            </SettingSection>

        </div>

    );

};

export default ActivityLogs;