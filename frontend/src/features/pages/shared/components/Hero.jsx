import { Link } from "react-router-dom";
import Button from "./Button";
import { heroCommon } from "../../data/heroData";

const Hero = ({ 
    breadcrumb,
    title,
    description,
    cardTitle,
    buttonText,
    buttonLink,
}) => {
    return (
        <section className="relative overflow-hidden gradient-bg">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            />

            {/* Decorative Circles */}

            <div className="hidden lg:block absolute left-44 top-10 h-[900px] w-[900px] rounded-full border-[100px] border-black/20"></div>
            <div className="absolute right-[180px] top-[80px] h-[800px] w-[800px] rounded-full border-[100px] border-yellow-600/20"></div>
            <div className="absolute right-[-220px] top-[-260px] h-[700px] w-[700px] rounded-full border border-white/10"></div>
            <div className="absolute right-[-100px] top-[-140px] h-[500px] w-[500px] rounded-full border border-white/10"></div>
            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">

                <div className="grid items-center gap-10 lg:grid-cols-2">

                    {/* LEFT */}

                    <div>

                        {/* Breadcrumb */}

                        <div className="mb-12 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 backdrop-blur">
                            <Link
                                to="/"
                                className="text-white text-xs transition hover:text-yellow-400"
                            >
                                Home
                            </Link>

                            <span className="mx-2 text-white/50">
                                /
                            </span>

                            <span className="text-white text-xs">
                                {breadcrumb}
                            </span>

                        </div>

                        {/* Heading */}

                        <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white lg:text-5xl">
                            {title}
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-base leading-7 text-white/70 lg:mt-10 lg:text-xl lg:leading-9">
                            {description}
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-center lg:justify-end lg:self-end">
                        <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
                            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-yellow-400">
                                {cardTitle}
                            </p>

                            <h2 className="mb-5 text-md lg:text-2xl font-bold text-white/85">
                                {heroCommon.cardDescriptionLine1} <br />
                                {heroCommon.cardDescriptionLine2}
                            </h2>

                            <div className="flex gap-4">
                                <Button 
                                    text={buttonText}
                                    to={buttonLink}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;