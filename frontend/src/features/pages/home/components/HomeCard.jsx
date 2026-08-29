import { ArrowRight } from "lucide-react";

const HomeCard = () => {
    return (
        <section className="min-h-screen  bg-gray-100 flex items-center justify-center p-8">
            <div className="relative w-full max-w-7xl overflow-hidden rounded-[40px] bg-linear-to-br from-[#081426] via-[#0c1c34] to-[#1f3559] text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

                {/* Background Blur */}
                <div className="absolute -top-40 left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-[120px]" />

                {/* Decorative Circle */}
                <div className="absolute right-0 top-0 h-52 w-52 rounded-full border border-white/10 translate-x-20 -translate-y-20" />

                <div className="relative grid lg:grid-cols-[2fr_1fr]">

                    {/* Left */}
                    <div className="p-12 lg:p-12">

                        {/* Top Label */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-0.5 w-14 bg-violet-400"></div>
                            <span className="text-xs uppercase tracking-[3px] text-indigo-200">
                                Integrated Digital Solutions
                            </span>
                        </div>

                        {/* Badge */}
                        <span className="inline-block rounded-full border border-yellow-500/30 bg-white/5 px-6 py-2 text-xs/2 uppercase tracking-[2px] text-yellow-300">
                            WEB • MOBILE • CLOUD
                        </span>

                        {/* Title */}
                        <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-none tracking-tight md:text-6xl">
                            Technology made accessible.
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300">
                            Himalaya Tech combines technology and management expertise to deliver digital solutions, optimize business operations, strengthen organizational performance, and support sustainable growth.
                        </p>

                        {/* Button */}
                        <button onClick={() => navigate("/services")} className="group mt-14 flex items-center gap-4 text-sm font-semibold uppercase tracking-[3px] text-yellow-300 transition-all hover:translate-y-2">
                            Explore Our Expertise
                            <ArrowRight
                                size={20}
                                className="transition-transform group-hover:translate-x-2"
                            />
                        </button>

                    </div>

                    {/* Right */}
                    <div className="border-l border-white/10 p-12 lg:p-16 flex flex-col justify-center">

                        <span className="text-xs uppercase tracking-[3px] text-yellow-300">
                            Current Contribution
                        </span>

                        <h2 className="mt-6 text-3xl leading-tight">
                            Clarity in service
                        </h2>

                        <p className="mt-6 text-sm leading-8 text-slate-300">
                            Combining strategic planning, efficient execution, and client-focused management.
                        </p>

                        {/* Avatar */}
                        <div className="mt-12 flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400 text-3xl text-yellow-300">
                            {/*SA*/}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeCard;