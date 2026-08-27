import ServicesCard from "./components/ServicesCard";
import ServicesGrid from "./components/ServicesGrid";
import PageTransition from "../shared/components/PageTransition";
import Hero from "../shared/components/Hero";
import { heroData } from "../data/heroData";

const Services = () => {
    return (
        <PageTransition>
            <Hero {...heroData.services} />
            <ServicesGrid />
        </PageTransition>
    );
};

export default Services;