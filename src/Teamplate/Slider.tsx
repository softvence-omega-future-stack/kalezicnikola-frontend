import  { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from "../assets/svgIcon/slider1.svg";
import img2 from "../assets/svgIcon/slider2.svg";
import img3 from "../assets/svgIcon/slider3.svg";
import img4 from "../assets/svgIcon/slider4.svg";

const DoclineWorkflowSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Replace these with your actual Figma screenshot imports
  const slides = [
    { image: img1},
    { image: img2 },
    { image: img3 },
    { image: img4 }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-30 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2  mb-6 shadow-sm">
            <span className="text-blue-600 text-sm">✦</span>
            <span className="text-gray-800 text-sm font-medium">Intuitive & Modern</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            The Modern Workflow{' '}
            <span className="block">Your Team Will Love</span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            The key to a practice that doesn't just respond but also works smarter together.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl ">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={slide.image} 
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'bg-blue-600 w-8 h-2' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoclineWorkflowSlider;