import React, { useState, useEffect } from 'react'; 
import woner from '../assets/svgIcon/woner.svg';
import icon from '../assets/svgIcon/herologo.svg';
import './buttom.css'
import SectionHeader from './SectionHeader';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((currentSlide) => 
        (currentSlide + 1) % testimonials.length
      );
    }, 4000); 

    return () => clearInterval(interval);
  }, [testimonials.length]); 

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="mt-12 md:mt-[120px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          badgeIcon={icon}
          badgeText="What Our Users Say"
          heading={
            <>
              What Practice Owners <br /> Say About Docline
            </>
          }
          align="center"
        />

        {/* Testimonial Content */}
        <div className="mb-12 bg-white rounded-2xl md:rounded-3xl max-[767px]:px-2.5 max-[767px]:pt-5 md:p-2.5">
          
          {/* Top Section: Image + Quote (side by side on tablet/md) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-stretch mb-0 md:mb-4 lg:mb-0">
            
            {/* Left - Image */}
            <div className="col-span-1 md:col-span-1 lg:col-span-4 flex justify-center lg:justify-start h-full items-center pb-2 md:pb-0">
              <div className="relative">
                <div className="w-full h-full md:w-[300px] xl:w-[400px] lg:h-[432px]  bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden">
                  <img 
                    src={testimonials[activeSlide].image} 
                    alt={testimonials[activeSlide].name}
                    className="w-full h-full object-cover lg:object-top"
                  />
                </div>
              </div>
            </div>

            {/* Middle - Quote */}
            <div className="col-span-1 md:col-span-1 lg:col-span-5 flex flex-col justify-center h-full lg:border-r border-gray-100 px-4 lg:px-4 py-4 lg:py-0">
              <blockquote className="text-[#111A2D] text-lg w-[428px] md:text-2xl font-medium leading-[34px] mb-8 md:mb-16">
                {testimonials[activeSlide].quote}
              </blockquote>
              
              <div>
                <p className="text-gray-900 font-bold text-lg mb-4">
                  {testimonials[activeSlide].name}
                </p>
                <p className="text-[#111A2D] text-base tracking-wide">
                  {testimonials[activeSlide].title}
                </p>
              </div>
            </div>

            {/* Right - Stats (only visible on lg+) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 px-4 lg:pl-4 h-full justify-center">
              {/* Time Saved Card */}
              <div className="rounded-2xl p-4 text-center">
                <div className="text-5xl sm:text-7xl font-light lg:text-[128px] text-gray-900 mb-1 leading-none">
                  {testimonials[activeSlide].stats.timeSaved}
                </div>
                <p className="text-[#171C35] text-xl font-medium">
                  {testimonials[activeSlide].stats.timeSavedLabel}
                </p>
              </div>

              {/* Acceptance Card */}
              <div className="rounded-2xl p-4 text-center">
                <div className="text-5xl font-light sm:text-7xl lg:text-[128px] text-[#111A2D] mb-1 leading-none">
                  {testimonials[activeSlide].stats.acceptance}
                </div>
                <p className="text-[#171C35] text-xl font-medium">
                  {testimonials[activeSlide].stats.acceptanceLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Stats (visible on mobile + tablet, hidden on lg+) */}
          <div className="grid grid-cols-2 gap-4 px-4 pt-4 pb-5 lg:hidden">
            {/* Time Saved Card */}
            <div className="rounded-2xl p-4 text-center ">
              <div className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-1 leading-none">
                {testimonials[activeSlide].stats.timeSaved}
              </div>
              <p className="text-[#171C35] text-sm md:text-xl font-medium">
                {testimonials[activeSlide].stats.timeSavedLabel}
              </p>
            </div>

            {/* Acceptance Card */}
            <div className="rounded-2xl p-4 text-center ">
              <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#111A2D] mb-1 leading-none">
                {testimonials[activeSlide].stats.acceptance}
              </div>
              <p className="text-[#171C35] text-sm md:text-xl font-medium">
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