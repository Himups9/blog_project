// frontend/src/features/settings/routes/adminSettingsRoutes.jsx

import SettingsDashboard from "../pages/SettingsDashboard";
import GeneralSettings from "../pages/GeneralSettings";
import SiteSettings from "../pages/SiteSettings";
import ContactSettings from "../pages/ContactSettings";
import EmailSettings from "../pages/EmailSettings";
import SocialMediaSettings from "../pages/SocialMediaSettings";
import ThemeSettings from "../pages/ThemeSettings";
import SecuritySettings from "../pages/SecuritySettings";
import BackupManagement from "../pages/BackupManagement";
import BackupRestore from "../pages/BackupRestore";
import CacheManagement from "../pages/CacheManagement";
import MaintenanceMode from "../pages/MaintenanceMode";
import SystemInformation from "../pages/SystemInformation";
import ActivityLogs from "../pages/ActivityLogs";

const adminSettingsRoutes = [
    {
        index: true,
        element: <SettingsDashboard />,
    },

    {
        path: "general",
        element: <GeneralSettings />,
    },

    {
        path: "site",
        element: <SiteSettings />,
    },

    {
        path: "contact",
        element: <ContactSettings />,
    },

    {
        path: "email",
        element: <EmailSettings />,
    },

    {
        path: "social-media",
        element: <SocialMediaSettings />,
    },

    {
        path: "theme",
        element: <ThemeSettings />,
    },

    {
        path: "security",
        element: <SecuritySettings />,
    },

    {
        path: "backup",
        element: <BackupManagement />,
    },

    {
        path: "backup/restore",
        element: <BackupRestore />,
    },

    {
        path: "cache",
        element: <CacheManagement />,
    },

    {
        path: "maintenance",
        element: <MaintenanceMode />,
    },

    {
        path: "system-information",
        element: <SystemInformation />,
    },

    {
        path: "activity-logs",
        element: <ActivityLogs />,
    },
];

export default adminSettingsRoutes;