import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesCard = ({ service, variant = "services", onSelect }) => {
    const Icon = service.icon;
    const navigate = useNavigate();
    const buttonText = variant === "home" ? "Explore Services" : "Learn More";

    const handleCardClick = () => {
        if (variant === "home") {
            navigate("/services");
        } else {
            onSelect?.(service);
        }
    };

    return (
        <div onClick={handleCardClick}
            className="group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-200 bg-white/40 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >

            {/* Number */}
            { variant === "services" && (
            <span className="absolute right-8 top-8 text-lg font-bold text-gray-400">
                {String(service.id).padStart(2, "0")}
            </span>
            )}

            {/* Icon */}
            <div className={`mb-10 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300
                ${ variant === "home"
                    ? "bg-blue-100 text-[#035784] group-hover:bg-[#035784] group-hover:text-white"
                    : "bg-[#0273af] text-white/80 group-hover:bg-[#035784] group-hover:text-white"
                }`} >
                <Icon size={30} />
            </div>

            {/* Title */}
            <h3 className="mb-5 text-2xl font-semibold leading-tight text-slate-900">
                {service.title}
            </h3>

            {/* Description */}
            <p className="mb-4 text-[13px] leading-5 font-light text-slate-500">
                {service.description}
            </p>

            {/* Button */}
            <button className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#035784] transition-all group-hover:gap-5">
                {buttonText}
                <ArrowRight size={15} />
            </button>

            {/* Hover Gradient */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-transparent via-transparent to-amber-100 opacity-0 transition duration-500 group-hover:opacity-100"></div>

        </div>
    );
};

export default ServicesCard;