import React, { useState } from 'react';
import woner from '../assets/svgIcon/woner.svg';
import icon from '../assets/svgIcon/herologo.svg';

const TestimonialSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      image: woner,
      quote: 'Since using Docline, we know that our patients can always reach us while our team works stress-free. The solution not only transformed our phone accessibility but also significantly improved team morale. A real relief in daily practice.',
      name: 'DR. MAGDALENA S.',
      title: 'DERMATOLOGIST',
      stats: {
        timeSaved: '11h',
        timeSavedLabel: 'Time saved per week',
        acceptance: '88%',
        acceptanceLabel: 'Call acceptance'
      }
    },
    {
      image: woner,
      quote: 'The implementation of Docline was seamless and the results exceeded our expectations. Our patients appreciate constant accessibility.',
      name: 'DR. THOMAS M.',
      title: 'GENERAL PRACTITIONER',
      stats: {
        timeSaved: '15h',
        timeSavedLabel: 'Time saved per week',
        acceptance: '92%',
        acceptanceLabel: 'Call acceptance'
      }
    },
    {
      image: woner,
      quote: 'Docline revolutionized our practice. The team can finally focus on important tasks while patients are well taken care of.',
      name: 'DR. SARAH K.',
      title: 'DENTIST',
      stats: {
        timeSaved: '13h',
        timeSavedLabel: 'Time saved per week',
        acceptance: '90%',
        acceptanceLabel: 'Call acceptance'
      }
    }
  ];

  return (
    <div className=" px-4 py- ">
      <div className="xl:px-30">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
            <img src={icon} alt="Docline logo" />
            <span className="text-[#171C35] text-sm font-medium">What Our Users Say</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
            What Practice Owners <br /> Say About Docline
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12  items-center mb-12 bg-white   rounded-3xl">
          {/* Left - Image */}
          <div className="lg:col-span-4 flex  lg:justify-start">
            <div className="relative">
              <div className="w-72 h-80 md:w-80 md:h-96 bg-gray-800 rounded-3xl overflow-hidden ">
                <img 
                  src={testimonials[activeSlide].image} 
                  alt={testimonials[activeSlide].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Middle - Quote */}
          <div className="lg:col-span-5 flex flex-col justify-center -pl-52  border-r border-gray-100">
            <blockquote className="text-[#111A2D] text-2xl font-medium  leading-relaxed mb-6">
              {testimonials[activeSlide].quote}
            </blockquote>
            
            <div>
              <p className="text-gray-900 font-bold text-lg mb-1">
                {testimonials[activeSlide].name}
              </p>
              <p className="text-gray-500 text-sm tracking-wide">
                {testimonials[activeSlide].title}
              </p>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="lg:col-span-3 flex flex-col gap-4 pl-6">
            {/* Time Saved Card */}
            <div className="rounded-2xl p-4 text-center">
              <div className="text-[128px] text-gray-900 mb-1">
                {testimonials[activeSlide].stats.timeSaved}
              </div>
              <p className="text-[#171C35] text-xl font-medium">
                {testimonials[activeSlide].stats.timeSavedLabel}
              </p>
            </div>

            {/* Acceptance Card */}
            <div className="rounded-2xl p-4 text-center">
              <div className="text-[128px]  text-[#111A2D] mb-1">
                {testimonials[activeSlide].stats.acceptance}
              </div>
              <p className="text-[#171C35] text-xl font-medium">
                {testimonials[activeSlide].stats.acceptanceLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeSlide 
                  ? 'bg-gray-900 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
