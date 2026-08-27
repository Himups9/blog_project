import { useEffect, useState } from "react";
import { DatabaseZap } from "lucide-react";
import toast from "react-hot-toast";

import CacheCard from "../components/CacheCard";
import SettingSection from "../components/SettingSection";
import ConfirmResetModal from "../components/ConfirmResetModal";

import { useSettings } from "../hooks/useSettings";

const CACHE_ACTIONS = {
    application: {
        title: "Clear Application Cache",
        message:
            "This will clear all application cache. The cache will be rebuilt automatically as users browse the website.",
        confirmText: "Clear Application Cache",
    },
    template: {
        title: "Clear Template Cache",
        message:
            "This will clear all compiled template cache.",
        confirmText: "Clear Template Cache",
    },
    static: {
        title: "Clear Static Cache",
        message:
            "This will clear cached static assets.",
        confirmText: "Clear Static Cache",
    },
    session: {
        title: "Clear Session Cache",
        message:
            "This will remove cached session data. Some users may need to sign in again.",
        confirmText: "Clear Session Cache",
    },
    all: {
        title: "Clear All Cache",
        message:
            "This will clear every available cache. This action may temporarily reduce application performance until caches are rebuilt.",
        confirmText: "Clear All Cache",
    },
};

const CacheManagement = () => {

    const {

        cacheStatistics,

        loadingCache,

        fetchCacheStatistics,

        clearApplicationCache,

        clearTemplateCache,

        clearStaticCache,

        clearSessionCache,

        clearAllCache,

    } = useSettings();

    const [selectedAction, setSelectedAction] = useState(null);

    useEffect(() => {

        fetchCacheStatistics();

    }, []);

    const refreshStatistics = async () => {

        await fetchCacheStatistics();

    };

    const executeAction = async () => {

        if (!selectedAction) {

            return;

        }

        try {

            switch (selectedAction) {

                case "application":
                    await clearApplicationCache();
                    break;

                case "template":
                    await clearTemplateCache();
                    break;

                case "static":
                    await clearStaticCache();
                    break;

                case "session":
                    await clearSessionCache();
                    break;

                case "all":
                    await clearAllCache();
                    break;

                default:
                    return;

            }

            toast.success("Cache cleared successfully.");

            setSelectedAction(null);

            refreshStatistics();

        } catch (error) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to clear cache."

            );

        }

    };

    const currentAction =
        CACHE_ACTIONS[selectedAction] || {};

    return (

        <div className="space-y-8">

            <SettingSection

                title="Cache Management"

                description="Monitor cache usage and clear cached data."

                icon={DatabaseZap}

            >

                <CacheCard

                    cache={cacheStatistics}

                    loading={loadingCache}

                    onRefresh={refreshStatistics}

                    onClearApplication={() =>
                        setSelectedAction("application")
                    }

                    onClearTemplate={() =>
                        setSelectedAction("template")
                    }

                    onClearStatic={() =>
                        setSelectedAction("static")
                    }

                    onClearSession={() =>
                        setSelectedAction("session")
                    }

                    onClearAll={() =>
                        setSelectedAction("all")
                    }

                />

            </SettingSection>

            <ConfirmResetModal

                open={Boolean(selectedAction)}

                loading={loadingCache}

                title={currentAction.title}

                message={currentAction.message}

                confirmText={currentAction.confirmText}

                variant="warning"

                onConfirm={executeAction}

                onClose={() => setSelectedAction(null)}

            />

        </div>

    );

};

export default CacheManagement;