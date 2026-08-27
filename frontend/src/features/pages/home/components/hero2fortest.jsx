// src/components/home/Hero.jsx

import Carousel from "./Carousel";

const Hero = ({ isAuthenticated, user }) => {
    return (
        <section className="relative h-screen overflow-hidden">

            {/* Background Carousel */}

            <Carousel />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Hero Content */}

            <div className="relative z-20 flex h-full items-center">

                <div className="mx-auto w-full max-w-7xl px-6">

                    <div className="max-w-3xl">

                        <span className="inline-flex rounded-full bg-blue-600/30 px-5 py-2 text-sm font-semibold text-blue-300 backdrop-blur">

                            Welcome to Our News Portal

                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

                            Read the Latest News

                            <span className="block text-blue-400">

                                Anytime, Anywhere

                            </span>

                        </h1>

                        <p className="mt-8 text-lg leading-8 text-gray-300">

                            Stay informed with breaking news,
                            business, technology, sports,
                            politics and inspiring stories
                            from around the world.

                        </p>

                        {isAuthenticated ? (

                            <div className="mt-8">

                                <p className="text-xl font-medium text-white">

                                    Welcome back,

                                    <span className="text-blue-400">

                                        {" "}
                                        {user?.full_name || "User"}

                                    </span>

                                    !

                                </p>

                            </div>

                        ) : (

                            <div className="mt-10 flex flex-wrap gap-5">

                                <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">

                                    Get Started

                                </button>

                                <button className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">

                                    Login

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* Scroll Indicator */}

            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />

                </svg>

            </div>

        </section>
    );
};

export default Hero;}



{/*        <section className="relative h-screen overflow-hidden">

            {/* Background Carousel */}

            <Carousel />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Hero Content */}

            <div className="relative z-20 flex h-full items-center">

                <div className="mx-auto w-full max-w-7xl px-6">

                    <div className="max-w-3xl">

                        <span className="inline-flex rounded-full bg-blue-600/30 px-5 py-2 text-sm font-semibold text-blue-300 backdrop-blur">

                            Welcome to Our News Portal

                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

                            Read the Latest News

                            <span className="block text-blue-400">

                                Anytime, Anywhere

                            </span>

                        </h1>

                        <p className="mt-8 text-lg leading-8 text-gray-300">

                            Stay informed with breaking news,
                            business, technology, sports,
                            politics and inspiring stories
                            from around the world.

                        </p>

                        {isAuthenticated ? (

                            <div className="mt-8">

                                <p className="text-xl font-medium text-white">

                                    Welcome back,

                                    <span className="text-blue-400">

                                        {" "}
                                        {user?.full_name || "User"}

                                    </span>

                                    !

                                </p>

                            </div>

                        ) : (

                            <div className="mt-10 flex flex-wrap gap-5">

                                <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">

                                    Get Started

                                </button>

                                <button className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">

                                    Login

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* Scroll Indicator */}

            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />

                </svg>

            </div>

        </section>
    );
};

export default Hero;
