import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { dashboardService } from "../../api";
import UserStatisticsCards from "./UserStatisticsCards";

const UserDashboard = () => {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const data = await dashboardService.getDashboardData();

            console.log("USER DASHBOARD RESPONSE:", data);

            setStats(data);

        } catch (error) {

            console.log("USER DASHBOARD ERROR:", error);
            toast.error("Failed to load dashboard statistics");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!stats) {
        return <p>No dashboard data available.</p>;
    }

    return (

        <div className="space-y-8">

            <UserStatisticsCards
                stats={stats.overview}
            />

            {/* Add more dashboard components here later */}

            {/* <RecentBlogs /> */}

            {/* <DraftBlogs /> */}

            {/* <RecentComments /> */}

        </div>

    );

};

export default UserDashboard;