import PageTransition from "../shared/components/PageTransition";
import Hero from "../shared/components/Hero";
import { heroData } from "../data/heroData";

import {
    AboutIntro,
    CTA,
    Stats,
    Team,
    Values,
} from "./components";

const AboutPage = () => {
    return (
        <PageTransition>
            <Hero {...heroData.about} />
            <AboutIntro />
            <Stats />
            <Team />
        </PageTransition>
        
    );
};

export default AboutPage;