import PageTransition from "../shared/components/PageTransition";
import { Contacts } from "../contact/components/Contact";
import Hero from "../shared/components/Hero";
import { heroData } from "../data/heroData";
//import ContactSection from "../components/contact/ContactSection";
//import MapSection from "../components/contact/MapSection";

const ContactPage = () => {
    return (
        <PageTransition>
            <Hero {...heroData.contact} />
            <Contacts />
        </PageTransition>
        
    );
};

export default ContactPage;