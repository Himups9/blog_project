import { useEffect } from "react";
import { MonitorSmartphone } from "lucide-react";
import toast from "react-hot-toast";

import SettingSection from "../components/SettingSection";
import SystemInfoCard from "../components/SystemInfoCard";
import ServerStatusCard from "../components/ServerStatusCard";

import { useSettings } from "../hooks/useSettings";

const SystemInformation = () => {

    const {

        systemInformation,

        serverStatus,

        loadingSystem,

        fetchSystemInformation,

        fetchServerStatus,

    } = useSettings();

    useEffect(() => {

        const loadData = async () => {

            try {

                await Promise.all([

                    fetchSystemInformation(),

                    fetchServerStatus(),

                ]);

            } catch (error) {

                toast.error(

                    error?.response?.data?.message ||

                    "Unable to load system information."

                );

            }

        };

        loadData();

    }, []);

    const handleRefresh = async () => {

        try {

            await Promise.all([

                fetchSystemInformation(),

                fetchServerStatus(),

            ]);

            toast.success("System information refreshed.");

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to refresh system information."

            );

        }

    };

    return (

        <div className="space-y-8">

            <SettingSection

                title="System Information"

                description="View application, server, and environment information."

                icon={MonitorSmartphone}

                actions={

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loadingSystem}
                        className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        Refresh

                    </button>

                }

            >

                <div className="grid gap-6 lg:grid-cols-2">

                    <SystemInfoCard

                        information={systemInformation}

                        loading={loadingSystem}

                    />

                    <ServerStatusCard

                        status={serverStatus}

                        loading={loadingSystem}

                    />

                </div>

            </SettingSection>

        </div>

    );

};

export default SystemInformation;