import { ArrowUpRight } from "lucide-react";

const colors = {
    red: {
        background: "bg-red-100/30",
        iconBg: "bg-linear-to-br from-red-700 to-red-400",
        outerCircle: "bg-red-100",
        innerCircle: "bg-red-100",
        number: "text-red-600",
        line: "bg-red-500",
        dot: "bg-red-500",
        arrow: "text-red-500",
        wave1: "#fecdd3",
        wave2: "#fb7185",
        glow: "shadow-red-300/70",
    },

    blue: {
        background: "bg-blue-100/30",
        iconBg: "bg-linear-to-br from-blue-700 to-blue-400",
        outerCircle: "bg-blue-100",
        innerCircle: "bg-blue-100",
        number: "text-blue-600",
        line: "bg-blue-500",
        dot: "bg-blue-500",
        arrow: "text-blue-500",
        wave1: "#bfdbfe",
        wave2: "#60a5fa",
        glow: "shadow-blue-300/70",
    },

    purple: {
        background: "bg-violet-100/30",
        iconBg: "bg-linear-to-br from-violet-700 to-violet-400",
        outerCircle: "bg-violet-100",
        innerCircle: "bg-violet-100",
        number: "text-violet-600",
        line: "bg-violet-500",
        dot: "bg-violet-500",
        arrow: "text-violet-500",
        wave1: "#ddd6fe",
        wave2: "#a78bfa",
        glow: "shadow-violet-300/70",
    },

    green: {
        background: "bg-emerald-100/30",
        iconBg: "bg-linear-to-br from-emerald-700 to-emerald-400",
        outerCircle: "bg-emerald-100",
        innerCircle: "bg-emerald-100",
        number: "text-emerald-600",
        line: "bg-emerald-500",
        dot: "bg-emerald-500",
        arrow: "text-emerald-500",
        wave1: "#bbf7d0",
        wave2: "#34d399",
        glow: "shadow-emerald-300/70",
    },
};

const StatsCard = ({ item }) => {
    const Icon = item.icon;
    const color = colors[item.color];

    return (
        <div className={`${color.background} group relative overflow-hidden rounded-[20px] border border-slate-100 p-10 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}>

            {/* Dots */}
            <div className="absolute right-6 top-6 flex flex-col gap-2">
                {[4, 3, 2, 1].map((count, index) => (
                    <div
                        key={index}
                        className="flex justify-end gap-2"
                    >
                        {[...Array(count)].map((_, Index) => (
                            <span
                                key={Index}
                                className={`h-1 w-1 rounded-full ${color.dot}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            

            {/* Icon */}
            <div className="flex justify-start">
            <div className="relative flex items-center justify-center">

                <div className={`absolute h-27 w-27 rounded-full  opacity-20 ${color.outerCircle}`} />
                <div className={`absolute h-21 w-21 rounded-full opacity-50 ${color.innerCircle}`} />

                <div
                    className={`relative flex h-15 w-15 items-center justify-center rounded-full text-white shadow-2xl ${color.iconBg} ${color.glow}`}
                >
                    <Icon size={30} />
                </div>

            </div>
            </div>

            {/* Number */}
            <h3 className={`mt-8 text-5xl font-bold ${color.number}`}>
                {item.value}
            </h3>

            {/* Line */}
            <div
                className={`mt-3 h-0.5 w-10 rounded-full ${color.line}`}
            />

            {/* Title */}
            <h3 className="mt-3 text-md font-semibold text-slate-700">
                {item.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-6 text-slate-500">
                {item.description}
            </p>

            {/* Arrow */}
            <div className="relative z-20 mt-2 flex justify-end">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl transition duration-300 group-hover:scale-110">

                    <ArrowUpRight
                        size={28}
                        className={color.arrow}
                    />

                </div>

            </div>

            {/* Decorative Waves */}

            <div className="absolute bottom-0 left-0 w-full">
                <svg
                    viewBox="0 0 400 70"
                    className="w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,10 C120,-40 220,90 400,80 L400,80 L0,80 Z"
                        fill={color.wave1}
                    />

                    <path
                        d="M0,30 C120, -10 220, 100 350, 80 L800,80 L0,80 Z"
                        fill={color.wave2}
                        opacity="0.75"
                    />
                </svg>
            </div>

        </div>
    );
};

export default StatsCard;