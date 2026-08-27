const ContactCard = ({ icon: Icon, title, value, variant = "contact", }) => {

    return (

        <div className="group flex items-center gap-5 rounded-2xl bg-gray-350 p-2 shadow-sm border-slate-100 hover:shadow-2xl transition-all">

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                ${ variant === "contact"
                    ? "bg-[#06456c] text-yellow-300"
                    : "border border-yellow-300/40 text-white/80"
                }`} >
                <Icon size={26} />
            </div>
            
            <div>
                <p className={`uppercase tracking-[2px] text-xs font-semibold
                    ${ variant === "contact"
                        ? "text-yellow-700"
                        : "text-yellow-300"
                    }`} >
                        {title}
                </p>

                <p className={`mt-1 text-sm font-semibold
                    ${ variant === "contact"
                    ? "text-[#053450]"
                    : "text-white/80"
                    }`} >
                    {value}
                </p>

            </div>
        </div>

    );

};

export default ContactCard;
