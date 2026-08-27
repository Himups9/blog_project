import { useState } from "react";


const Feature = () => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Image */}
                    <div className="relative">

                        <div className="w-full h-175 rounded-lg bg-cover bg-center shadow-xl" style={{backgroundImage: `url('/images/him1.jpg')`}}> </div>

                        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-t border-white pt-2">

                            

                            <p className="text-[10px] uppercase tracking-widest text-white sm:text-xs md:text-sm lg:text-base">
                                Innovation • Technology • Excellence
                            </p>

                        </div>

                    </div>

                    {/* Right Content */}
                    <div>

                        {/* Small Label */}

                        <div className="mb-6 flex items-center gap-4">

                            <span className="h-0.5 w-12 bg-red-800"></span>

                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-800">
                                ABOUT HIMALAYA TECH
                            </p>

                        </div>

                        {/* Heading */}

                        <h2 className="mb-8 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
                            Digital Excellence.

                            <br />
                            Trusted Solutions.
                        </h2>

                        {/* Paragraph */}

                        <p className="mb-8 text-lg leading-9 text-gray-700">
                            At Himalaya Tech, we are committed to empowering businesses through innovative technology, strategic thinking, and exceptional service. We develop secure, scalable, and future-ready digital solutions that help organizations improve efficiency, accelerate growth, and achieve long-term success.
                        </p>

                        <p className="mb-10 text-lg leading-9 text-gray-500">
                            Guided by integrity, innovation, and a commitment to quality, we strive to build lasting partnerships and deliver measurable value with every project we undertake.
                        </p>

                        {/* Button */}

                        <button className="group flex items-center gap-3 border-b-2 border-red-800 pb-1 text-sm font-semibold uppercase tracking-[0.25em] text-red-800 transition hover:gap-5">

                            Discover More

                            <span className="text-xl transition group-hover:translate-x-1">
                                →
                            </span>

                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Feature;