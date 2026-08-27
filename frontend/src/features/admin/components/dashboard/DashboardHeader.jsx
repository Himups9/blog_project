import { RefreshCw } from "lucide-react";

const DashboardHeader = ({ onRefresh, loading, }) => {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="mt-1 text-slate-500">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <RefreshCw
                    size={18}
                    className={loading ? "animate-spin" : ""}
                />

                Refresh
            </button>
        </div>
    );
}

export default DashboardHeader;