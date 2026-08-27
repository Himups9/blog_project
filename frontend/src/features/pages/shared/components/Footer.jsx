import BackgroundWatermark from "./BackgroundWatermark";
import ContactCard from "../../contact/components/ContactCard";
import { Contacts } from "../../contact/components/Contact";
import { contacts } from "../../data/ContactData"
import { services } from "../../data/servicesData";
import { shuffle } from "../utils/shuffle";
import { useMemo } from "react";
import { navigation } from "../../data/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Globe,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
        const randomServices = useMemo(() => {
            return shuffle([...services]).slice(0, 6);
        }, []);
    return (
        <footer className="gradient-bg relative overflow-hidden">

            {/* Watermark */}
            <BackgroundWatermark className="absolute right-50 -bottom-40 max-w-300 object-contain opacity-4" />
            

            <div className="relative max-w-7xl mx-auto px-8 py-10">

                <div className="grid lg:grid-cols-4 gap-16">

                    {/* Left */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white text-blue-900 flex items-center justify-center font-bold text-3xl">
                                H
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Himalaya Tech
                                </h2>

                                <p className="tracking-[1px] text-xs text-yellow-300">
                                    Information Technology
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-7 text-sm text-justify">
                            Delivering innovative technology solutions, strategic digital transformation, and reliable support for businesses, organizations, and entrepreneurs.  
                        </p>

                        {/* Social */}

                        <div className="flex flex-wrap gap-4 mt-10">
                            {[
                                FaWhatsapp,
                                FaFacebookF,
                                FaYoutube,
                                FaInstagram,
                                FaLinkedinIn,
                                ].map((Icon, index) => (
                                    <button
                                    key={index}
                                    className="group w-14 h-14 rounded-2xl border border-yellow-300/40 hover:bg-white hover:text-blue-900 transition flex items-center justify-center"
                                    >
                                    <Icon size={20} 
                                        className="transition-transform duration-300 group-hover:scale-150" />
                                    </button>
                                ))
                            }
                            </div>

                        {/* Status */}
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300"></div>

                    </div>

                    {/* Navigation */}

                    <div>

                        <h3 className="uppercase tracking-[4px] text-yellow-300 mb-8">
                            Navigation
                        </h3>

                        <div>
                            <ul>
                                {navigation.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to={item.path}
                                            className="flex justify-between items-center py-4 border-b border-white/10 text-white/80 hover:text-yellow-400 transition-colors duration-300 group"
                                        >
                                            <span>{item.name}</span>

                                            <ArrowRight size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                        </Link>
                                    </li>
                                ))}   
                            </ul>
                        </div>
                    </div>

                    {/* Practice */}
  
                    <div>
                        <h3 className="uppercase tracking-[4px] text-yellow-300 mb-8">
                            Practice Focus
                        </h3>
                        <div>
                            {randomServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="flex gap-3 py-4 border-b border-white/10 text-white/80"
                                >
                                    <span className="text-yellow-300">•</span>

                                    <span>{service.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}

                    <div>
                        <h3 className="uppercase tracking-[4px] text-yellow-300 mb-8">
                            Contacts
                        </h3>

                        <div className="space-y-4 w-100">
                            {contacts.map((contact, index) => (
                                <ContactCard
                                    key={index}
                                    icon={contact.icon}
                                    title={contact.title}
                                    value={contact.value}
                                    variant="footer"
                                />
                            ))}
                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="border-t border-white-200 mt-20 pt-8 flex flex-col md:flex-row justify-between text-gray-300 text-xs">

                    <p>
                        © {new Date().getFullYear()} Himalaya Tech. All rights reserved.
                    </p>

                    <p>
                        Designed and developed by
                        <span className="text-yellow-300 ml-4">
                            <a href="https://himalayatech.com.np">
                            Himalaya Tech
                            </a>
                        </span>
                    </p>

                </div>
            </div>

        </footer>
    );
}


export default Footer;