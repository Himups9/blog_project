import {
    FileText,
    Eye,
    Heart,
    MessageCircle,
} from "lucide-react";


const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    gradient,
}) => {

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className={`h-2 ${gradient}`} />

            <div className="flex items-center justify-between p-6">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>


                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {value.toLocaleString()}
                    </h3>


                    <p className="mt-2 text-sm text-slate-500">
                        {subtitle}
                    </p>

                </div>


                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${gradient}`}
                >
                    <Icon size={30} />
                </div>

            </div>

        </div>
    );
};



const UserStatisticsCards = ({ stats }) => {

    const statistics = [

        {
            title: "My Blogs",
            value: stats?.total_posts ?? 0,
            subtitle: "Total blog posts",
            icon: FileText,
            gradient:
                "bg-linear-to-r from-blue-500 to-indigo-600",
        },


        {
            title: "Total Views",
            value: stats?.total_views ?? 0,
            subtitle: "Views received",
            icon: Eye,
            gradient:
                "bg-linear-to-r from-emerald-500 to-green-600",
        },


        {
            title: "Likes",
            value: stats?.total_likes ?? 0,
            subtitle: "People liked your posts",
            icon: Heart,
            gradient:
                "bg-linear-to-r from-pink-500 to-rose-600",
        },


        {
            title: "Comments",
            value: stats?.total_comments ?? 0,
            subtitle: "Comments received",
            icon: MessageCircle,
            gradient:
                "bg-linear-to-r from-orange-500 to-red-500",
        },

    ];


    return (

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {statistics.map((item) => (

                <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    subtitle={item.subtitle}
                    icon={item.icon}
                    gradient={item.gradient}
                />

            ))}

        </div>

    );
};


export default UserStatisticsCards;