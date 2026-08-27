import { useEffect } from "react";
import {
    Settings,
    Globe,
    PhoneCall,
    Mail,
    Share2,
    Palette,
    Shield,
    Database,
    DatabaseZap,
    Wrench,
    MonitorSmartphone,
    History,
} from "lucide-react";

import SettingsCard from "../components/SettingsCard";
import SettingSection from "../components/SettingSection";
import { useSettings } from "../hooks/useSettings";

const SettingsDashboard = () => {

    const {

        dashboardStatistics,

        loadingDashboard,

        fetchDashboardStatistics,

    } = useSettings();

    useEffect(() => {

        fetchDashboardStatistics();

    }, []);

    const settingCards = [

        {
            title: "General",
            description: "Basic application settings.",
            icon: Settings,
            color: "bg-blue-500",
            route: "/admin/settings/general",
        },

        {
            title: "Site Information",
            description: "Website name, logo and branding.",
            icon: Globe,
            color: "bg-green-500",
            route: "/admin/settings/site",
        },

        {
            title: "Contact",
            description: "Contact information.",
            icon: PhoneCall,
            color: "bg-orange-500",
            route: "/admin/settings/contact",
        },

        {
            title: "Email",
            description: "SMTP configuration.",
            icon: Mail,
            color: "bg-indigo-500",
            route: "/admin/settings/email",
        },

        {
            title: "Social Media",
            description: "Social platform links.",
            icon: Share2,
            color: "bg-pink-500",
            route: "/admin/settings/social-media",
        },

        {
            title: "Theme",
            description: "Colors and appearance.",
            icon: Palette,
            color: "bg-purple-500",
            route: "/admin/settings/theme",
        },

        {
            title: "Security",
            description: "Authentication settings.",
            icon: Shield,
            color: "bg-red-500",
            route: "/admin/settings/security",
        },

        {
            title: "Backups",
            description: "Backup management.",
            icon: Database,
            color: "bg-cyan-500",
            route: "/admin/settings/backup",
        },

        {
            title: "Cache",
            description: "Manage application cache.",
            icon: DatabaseZap,
            color: "bg-yellow-500",
            route: "/admin/settings/cache",
        },

        {
            title: "Maintenance",
            description: "Maintenance mode.",
            icon: Wrench,
            color: "bg-amber-500",
            route: "/admin/settings/maintenance",
        },

        {
            title: "System",
            description: "System information.",
            icon: MonitorSmartphone,
            color: "bg-slate-500",
            route: "/admin/settings/system-information",
        },

        {
            title: "Activity Logs",
            description: "System activity history.",
            icon: History,
            color: "bg-emerald-500",
            route: "/admin/settings/activity-logs",
        },

    ];

    return (

        <div className="space-y-8">

            <SettingSection

                title="Settings Dashboard"

                description="Manage every aspect of your website from one place."

                icon={Settings}

            >

                {/* Statistics */}

                <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl border bg-white p-6">

                        <p className="text-sm text-gray-500">

                            Total Sections

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {dashboardStatistics?.total_sections ?? 12}

                        </h2>

                    </div>

                    <div className="rounded-xl border bg-white p-6">

                        <p className="text-sm text-gray-500">

                            Last Backup

                        </p>

                        <h2 className="mt-2 text-lg font-semibold">

                            {dashboardStatistics?.last_backup ?? "N/A"}

                        </h2>

                    </div>

                    <div className="rounded-xl border bg-white p-6">

                        <p className="text-sm text-gray-500">

                            Cache Size

                        </p>

                        <h2 className="mt-2 text-lg font-semibold">

                            {dashboardStatistics?.cache_size ?? "0 MB"}

                        </h2>

                    </div>

                    <div className="rounded-xl border bg-white p-6">

                        <p className="text-sm text-gray-500">

                            System Status

                        </p>

                        <h2 className="mt-2 text-lg font-semibold text-green-600">

                            {dashboardStatistics?.system_status ?? "Healthy"}

                        </h2>

                    </div>

                </div>

                {/* Settings Cards */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {settingCards.map((item) => (

                        <SettingsCard

                            key={item.title}

                            title={item.title}

                            description={item.description}

                            icon={item.icon}

                            color={item.color}

                            route={item.route}

                            loading={loadingDashboard}

                        />

                    ))}

                </div>

            </SettingSection>

        </div>

    );

};

export default SettingsDashboard;