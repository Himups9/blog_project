import { useEffect, useMemo, useState } from "react";
import Heading from "../../data/Heading";
import { shuffle } from "../../shared/utils/shuffle";


const imageModules = import.meta.glob(
  "../../../../assets/CarouselImages/*.{png,jpg,jpeg,gif,webp}",
  {
    eager: true,
    import: "default",
  }
);

const images = Object.entries(imageModules)
.sort(([a], [b]) => a.localeCompare(b))
.map(([, image]) => image);


const Carousel = () => {
  const randomImages = useMemo(() => shuffle(images).slice(0, 3), []);
  const randomHeadings = useMemo(() => shuffle(Heading).slice(0, 3), []);

  const slides = randomImages.map((image, index) => ({
      image,
      ...randomHeadings[index],
  }));

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };
    
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-5">
              <h1 className="text-5xl md:text-7xl font-bold mb-5">
                {slide.title}
              </h1>

              <p className="text-lg md:text-2xl mb-8">
                {slide.description}
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
                Explore
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/30 w-12 h-12 rounded-full hover:bg-black/50"
      >
        ❮
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/30 w-12 h-12 rounded-full hover:bg-black/50"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;