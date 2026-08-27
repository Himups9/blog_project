import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Button = ({
    text,
    children,
    to,
    type = "button",
    onClick,
    disabled = false,
    className = "",
    icon = true,
}) => {
    const classes = `group inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold uppercase tracking-[0.002em] text-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#035784] hover:bg-[#035784] hover:text-white hover:shadow-2xl ${className}`;

    const content = (
        <>
            {children ? children : <span>{text}</span>}
            {icon && (
                <ArrowRight
                    size={24}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                />
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {content}
        </button>
    );
};

export default Button;
