// src/components/home/Hero.jsx

import Carousel from "./Carousel";

const Hero = ({ isAuthenticated, user }) => {
    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background Carousel */}

            <Carousel />

        </section>
    );
};

export default Hero;