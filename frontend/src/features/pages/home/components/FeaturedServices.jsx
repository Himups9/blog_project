import ServicesGrid from "../../services/components/ServicesGrid";
import Button from "../../shared/components/Button";

const FeaturedServices = () => {
    return (
        <section>
            <div className="mx-auto max-w-full bg-gray-200 pt-20">

                {/* Section Header */}


                <div className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-0.5 w-16 bg-red-800"></div>

                            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-800">
                                Our Services
                            </span>

                        <div className="h-0.5 w-16 bg-red-800"></div>
                    </div>
                                        
                    <h2 className="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Featured Services
                    </h2>

                    <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
                        We build modern websites, web applications, mobile apps,
                        and digital solutions that help businesses grow and
                        succeed online.
                    </p>
                </div>

                {/* Show 3 random cards */}
                <ServicesGrid
                    random
                    limit={3}
                    variant="home"
                />

                <div className="flex justify-center pb-20">
                    <Button to="/services"
                        text="View all Services"
                    />
                             
                </div>

            </div>
        </section>
    );
};

export default FeaturedServices;