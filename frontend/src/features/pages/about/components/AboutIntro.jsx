import { aboutIntro } from "../../data/aboutData";
import Button from "../../shared/components/Button";

const AboutIntro = () => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-14">
                
                {aboutIntro.map((section, index) => (
                    <div
                        key={section.id}
                        className="grid items-center gap-20 lg:grid-cols-2 pt-10"
                    >

                        {/* Image */}

                        <div
                            className={index % 2 !== 0 ? "lg:order-1" : "lg:order-2"}
                        >
                            <img
                                src={section.image}
                                alt={section.title}
                                className="h-180 w-full rounded-3xl object-cover pointer-events-none"
                            />
                        </div>

                        {/* Text */}

                        <div
                            className={index % 2 !== 0 ? "lg:order-2" : "lg:order-1"}
                        >

                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-0.5 w-12 bg-red-800"></span>

                                <p className="text-sm font-semibold uppercase tracking-[1px] text-red-800">
                                    {section.label}
                                </p>
                            </div>

                            <h2 className="mb-8 text-5xl font-semibold leading-tight">
                                {section.title}
                            </h2>

                            <div className="space-y-8">
                                {section.content.map((item) => (
                                    <p
                                        key={item.id}
                                        className="text-lg leading-9 text-slate-600"
                                    >
                                        {item.value}
                                    </p>
                                ))}
                            </div>

                        </div>

                    </div>

                ))}
                 
            </div>
            <div className="mt-20 text-center">
                    <Button
                        text="Our Services"
                        to="/services"
                    />
                </div>
        </section>
    );
};

export default AboutIntro;