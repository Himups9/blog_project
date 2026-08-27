import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { services } from "../../data/servicesData";
import ServicesCard from "./ServicesCard";
import ServiceModal from "./ServiceModal";

const ServicesGrid = ({ random = false, limit, variant = "service", }) => {
    const [selectedService, setSelectedService] = useState(null);

    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get("service");

        useEffect(() => {
        if (serviceId) {
            const selected = services.find(
                (item) => item.id === Number(serviceId)
            );

            if (selected) {
                setSelectedService(selected);
            }
        }
    }, [serviceId]);

    let displayedServices = services;

    if (random && limit) {
        displayedServices = [...services]
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
    } else if (limit) {
        displayedServices = services.slice(0, limit);
    }

    return (
        <section className="bg-gray-200 py-20 px-8">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedServices.map((service) => (
                        <ServicesCard
                            key={service.id}
                            service={service}
                            variant ={variant}
                            onSelect={setSelectedService}
                        />
                    ))}
                </div>
            </div>
            
            {/* Modal */}
            <AnimatePresence>
                {variant === "service" && selectedService && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
            </AnimatePresence>
            

        </section>
    );
};

export default ServicesGrid;