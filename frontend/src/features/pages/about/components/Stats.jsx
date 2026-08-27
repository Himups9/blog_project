import { ArrowUpRight } from "lucide-react";
import { stats } from "../../data/aboutData";
import StatsCard from "./StatsCard";

const colorClasses = {
    red: {
        icon: "bg-red-500",
        number: "text-red-500",
        line: "bg-red-500",
        wave: "from-red-200 via-red-100 to-transparent",
        dot: "bg-red-500",
        arrow: "text-red-500",
    },

    blue: {
        icon: "bg-blue-500",
        number: "text-blue-500",
        line: "bg-blue-500",
        wave: "from-blue-200 via-blue-100 to-transparent",
        dot: "bg-blue-500",
        arrow: "text-blue-500",
    },

    purple: {
        icon: "bg-violet-500",
        number: "text-violet-500",
        line: "bg-violet-500",
        wave: "from-violet-200 via-violet-100 to-transparent",
        dot: "bg-violet-500",
        arrow: "text-violet-500",
    },

    green: {
        icon: "bg-emerald-500",
        number: "text-emerald-500",
        line: "bg-emerald-500",
        wave: "from-emerald-200 via-emerald-100 to-transparent",
        dot: "bg-emerald-500",
        arrow: "text-emerald-500",
    },
};

const Stats = () => {
    return (
        <section className="bg-[#fafafa] py-28">

            <div className="mx-auto max-w-7xl">
                
                {/* Badge */}
                <div className="flex justify-center">
                   <div className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-rose-50 via-rose-20 to-rose-50 px-4 py-2 shadow-sm ring-1 ring-rose-100">

                        {/* Left Dot */}
                        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"></span>

                        {/* Text */}
                        <span className="text-xs font-bold uppercase tracking-[1px] text-red-600">
                            {stats.badge}
                        </span>

                        {/* Right Dot */}
                        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"></span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="mx-auto mt-8 max-w-4xl leading-0 text-center text-3xl font-bold text-slate-900 lg:text-4xl">
                    {stats.title}
                </h2>

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
                    {stats.description}
                </p>

                {/* Cards */}


                <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                        {stats.items.map((item) => (
                            <StatsCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </div>   
            </div>
        </section>
    );
};

export default Stats;