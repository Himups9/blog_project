import { X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../shared/components/Button";
const ServiceModal = ({ service, onClose }) => {
    // Prevent rendering if no service is selected
    if (!service) return null;

    const Icon = service.icon;

    return (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>

            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl rounded-3xl bg-white"
                    initial={{
                        opacity: 0,
                        y: 80,
                        scale: 0.9
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        y: 80,
                        scale: 0.9
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut"
                    }}
             >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-slate-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white">
                    <X size={24} strokeWidth={2.5} />
                </button>

                {/* Header */}
                <div className="rounded-t-3xl bg-[#053f61] p-12 text-gray-200">

                    {Icon && <Icon size={40} />}

                    <h1 className="mt-8 text-6xl font-bold text-gray-200">
                        {service.title}
                    </h1>

                    <p className="mt-6">
                        {service.longDescription || service.description}
                    </p>

                </div>

                {/* Content */}
                <div className="grid gap-12 p-12 md:grid-cols-2">

                    <div>
                        <h3 className="font-bold uppercase">
                            Best Suited For
                        </h3>

                        <p className="mt-4">
                            {service.bestFor || "Suitable for all businesses."}
                        </p>
                        
                    </div>
                    

                    <div>

                        <h3 className="font-bold uppercase">
                            What This Includes
                        </h3>

                        <ul className="mt-4 space-y-3">

                            {service.features?.map((item) => (
                                <li key={item}>
                                    ✓ {item}
                                </li>
                            ))}

                        </ul>

                    </div>
                    <div className="mt-auto">
                        <Button 
                            text="Book a Consultation"
                            to="/contact" 
                        />
                    </div>
                    

                </div>

            </motion.div>

        </motion.div>
    );
};

export default ServiceModal;