import React, { useState, useEffect } from 'react';
import woner from '../assets/svgIcon/woner.svg';
import woner2 from '../assets/svgIcon/testimonials2.jpg';
import woner3 from '../assets/img/testimonials3.jpg';
import icon from '../assets/svgIcon/herologo.svg';
import './buttom.css';
import SectionHeader from './SectionHeader';
import { useTranslation } from 'react-i18next';

// ========================================
// TYPES
// ========================================
interface TestimonialData {
  image: string;
  quote: string;
  name: string;
  title: string;
  stats: {
    timeSaved: string;
    timeSavedLabel: string;
    acceptance: string;
    acceptanceLabel: string;
  };
}

// ========================================
// TESTIMONIAL SECTION COMPONENT
// ========================================
const TestimonialSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  // ✅ Get testimonials from translation
  const testimonialsData = t('landingPage.testimonialSection.testimonials', { returnObjects: true }) as Array<{
    quote: string;
    name: string;
    title: string;
    stats: {
      timeSaved: string;
      timeSavedLabel: string;
      acceptance: string;
      acceptanceLabel: string;
    };
  }>;

  // Add image to each testimonial
const testimonialImages = [woner, woner2, woner3];

const testimonials: TestimonialData[] = testimonialsData.map((item, index) => ({
  ...item,
  image: testimonialImages[index] || woner   // fallback image
}));


  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((currentSlide) =>
        (currentSlide + 1) % testimonials.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[activeSlide];

  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="mt-12 md:mt-[120px] px-4">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <SectionHeader
          badgeIcon={icon}
          badgeText={t('landingPage.testimonialSection.badgeText')}
          heading={t('landingPage.testimonialSection.heading')}
          align="center"
        />

        {/* ========================================
            TESTIMONIAL CARD - RESPONSIVE LAYOUT
            
            Mobile: Image 340px, Stats in row
            Tablet: Image fills container, Stats in row
            Desktop: Image 436px, Stats in column
            
            Image uses object-cover with object-top for headshots
            ======================================== */}
        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12 lg:max-h-[460px]">

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center lg:h-[460px]">

            {/* IMAGE SECTION - Flexible on tablet, fixed on mobile/desktop */}
            <div className="
              lg:col-span-4
              flex justify-center items-center
              p-2.5
              h-auto
              md:h-full
              lg:h-auto
            ">
              <div className="
                w-full 
                h-full
                rounded-2xl md:rounded-3xl 
                overflow-hidden 
                bg-gray-800
                min-h-[340px]
                lg:h-[436px]
              ">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* CONTENT WRAPPER (Quote + Author + Stats) */}
            <div className="md:col-span-1 lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 items-center">

              {/* QUOTE + AUTHOR SECTION */}
              <div className="
                lg:col-span-5
                flex flex-col justify-center
                px-6 py-6
                md:px-8 md:py-8
                lg:px-10 lg:py-8
                lg:border-r lg:border-gray-100
              ">
                <blockquote className="
                  text-[#111A2D] 
                  font-medium 
                  leading-[34px]
                  mb-6 md:mb-8 lg:mb-8
                  text-base sm:text-lg md:text-xl lg:text-2xl
                ">
                  {currentTestimonial.quote}
                </blockquote>

                <div>
                  <p className="text-[#171C35] leading-[100%] font-semibold uppercase text-base md:text-xl mb-4">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-[#111A2D] leading-4 text-sm md:text-base font-medium">
                    {currentTestimonial.title}
                  </p>
                </div>
              </div>

              {/* STATS SECTION 
                  Mobile/Tablet: row (flex-row)
                  Desktop: column (lg:flex-col)
              */}
              <div className="
                lg:col-span-3
                flex flex-row
                lg:flex-col
                justify-center
                gap-6 md:gap-8
                px-6 py-6
                md:px-8 md:py-8
                lg:px-6 lg:py-8
              ">
                {/* TIME SAVED STAT */}
                <div className="text-center flex-1">
                  <div className="
                    font-light
                    leading-[100%]
                    mb-2
                    text-[#111A2D]
                  ">
                    <span className="
                      text-6xl sm:text-7xl md:text-8xl lg:text-[80px] xl:text-[96px]
                    ">
                      {currentTestimonial.stats.timeSaved.replace(/[^0-9]/g, '')}h
                    </span>
                  </div>
                  <p className="text-[#171C35] text-sm md:text-base lg:text-xl leading-5 font-medium">
                    {currentTestimonial.stats.timeSavedLabel}
                  </p>
                </div>

                {/* ACCEPTANCE STAT */}
                <div className="text-center flex-1">
                  <div className="
                    font-light
                    leading-[100%]
                    mb-2
                    text-[#111A2D]
                  ">
                    <span className="
                      text-6xl sm:text-7xl md:text-8xl lg:text-[80px] xl:text-[96px]
                    ">
                      {currentTestimonial.stats.acceptance.replace(/[^0-9]/g, '')}
                    </span>
                    <span className="
                      text-4xl sm:text-5xl md:text-6xl lg:text-[50px] xl:text-[60px]
                    ">
                      %
                    </span>
                  </div>
                  <p className="text-[#171C35] text-sm md:text-base lg:text-xl leading-5 font-medium">
                    {currentTestimonial.stats.acceptanceLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`
                h-2.5 rounded-full transition-all duration-500
                ${index === activeSlide
                  ? 'w-8 bg-black'
                  : 'w-2.5 bg-[#D0D5DD] hover:bg-gray-400'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;


// import React, { useState, useEffect } from 'react'; 
// import woner from '../assets/svgIcon/woner.svg';
// import icon from '../assets/svgIcon/herologo.svg';
// import './buttom.css'
// import SectionHeader from './SectionHeader';

// const TestimonialSection: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const testimonials = [
//     {
//       image: woner,
//       quote: 'Since using Docline, we know that our patients can always reach us while our team works stress-free. The solution not only transformed our phone accessibility but also significantly improved team morale. A real relief in daily practice.',
//       name: 'DR. MAGDALENA S.',
//       title: 'DERMATOLOGIST',
//       stats: {
//         timeSaved: '11h',
//         timeSavedLabel: 'Time saved per week',
//         acceptance: '88%',
//         acceptanceLabel: 'Call acceptance'
//       }
//     },
//     {
//       image: woner,
//       quote: 'The implementation of Docline was seamless and the results exceeded our expectations. Our patients appreciate constant accessibility.',
//       name: 'DR. THOMAS M.',
//       title: 'GENERAL PRACTITIONER',
//       stats: {
//         timeSaved: '15h',
//         timeSavedLabel: 'Time saved per week',
//         acceptance: '92%',
//         acceptanceLabel: 'Call acceptance'
//       }
//     },
//     {
//       image: woner,
//       quote: 'Docline revolutionized our practice. The team can finally focus on important tasks while patients are well taken care of.',
//       name: 'DR. SARAH K.',
//       title: 'DENTIST',
//       stats: {
//         timeSaved: '13h',
//         timeSavedLabel: 'Time saved per week',
//         acceptance: '90%',
//         acceptanceLabel: 'Call acceptance'
//       }
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveSlide((currentSlide) => 
//         (currentSlide + 1) % testimonials.length
//       );
//     }, 4000); 

//     return () => clearInterval(interval);
//   }, [testimonials.length]); 

//   return (
//     <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="mt-12 md:mt-[120px]">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <SectionHeader
//           badgeIcon={icon}
//           badgeText="What Our Users Say"
//           heading={
//             <>
//               What Practice Owners <br /> Say About Docline
//             </>
//           }
//           align="center"
//         />

//         {/* Testimonial Content */}
//         <div className="mb-12 bg-white rounded-2xl md:rounded-3xl max-[767px]:px-2.5 max-[767px]:pt-5 md:p-2.5">
          
//           {/* Top Section: Image + Quote (side by side on tablet/md) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-stretch mb-0 md:mb-4 lg:mb-0">
            
//             {/* Left - Image */}
//             <div className="col-span-1 md:col-span-1 lg:col-span-4 flex justify-center lg:justify-start h-full items-center pb-2 md:pb-0">
//               <div className="relative">
//                 <div className="w-full h-full md:w-[300px] xl:w-[400px] lg:h-[432px]  bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden">
//                   <img 
//                     src={testimonials[activeSlide].image} 
//                     alt={testimonials[activeSlide].name}
//                     className="w-full h-full object-cover lg:object-top"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Middle - Quote */}
//             <div className="col-span-1 md:col-span-1 lg:col-span-5 flex flex-col justify-center h-full lg:border-r border-gray-100 px-4 lg:px-4 py-4 lg:py-0">
//               <blockquote className="text-[#111A2D] text-lg w-[428px] md:text-2xl font-medium leading-[34px] mb-8 md:mb-16">
//                 {testimonials[activeSlide].quote}
//               </blockquote>
              
//               <div>
//                 <p className="text-gray-900 font-bold text-lg mb-4">
//                   {testimonials[activeSlide].name}
//                 </p>
//                 <p className="text-[#111A2D] text-base tracking-wide">
//                   {testimonials[activeSlide].title}
//                 </p>
//               </div>
//             </div>

//             {/* Right - Stats (only visible on lg+) */}
//             <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 px-4 lg:pl-4 h-full justify-center">
//               {/* Time Saved Card */}
//               <div className="rounded-2xl p-4 text-center">
//                 <div className="text-5xl sm:text-7xl font-light lg:text-[128px] text-gray-900 mb-1 leading-none">
//                   {testimonials[activeSlide].stats.timeSaved}
//                 </div>
//                 <p className="text-[#171C35] text-xl font-medium">
//                   {testimonials[activeSlide].stats.timeSavedLabel}
//                 </p>
//               </div>

//               {/* Acceptance Card */}
//               <div className="rounded-2xl p-4 text-center">
//                 <div className="text-5xl font-light sm:text-7xl lg:text-[128px] text-[#111A2D] mb-1 leading-none">
//                   {testimonials[activeSlide].stats.acceptance}
//                 </div>
//                 <p className="text-[#171C35] text-xl font-medium">
//                   {testimonials[activeSlide].stats.acceptanceLabel}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section: Stats (visible on mobile + tablet, hidden on lg+) */}
//           <div className="grid grid-cols-2 gap-4 px-4 pt-4 pb-5 lg:hidden">
//             {/* Time Saved Card */}
//             <div className="rounded-2xl p-4 text-center ">
//               <div className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-1 leading-none">
//                 {testimonials[activeSlide].stats.timeSaved}
//               </div>
//               <p className="text-[#171C35] text-sm md:text-xl font-medium">
//                 {testimonials[activeSlide].stats.timeSavedLabel}
//               </p>
//             </div>

//             {/* Acceptance Card */}
//             <div className="rounded-2xl p-4 text-center ">
//               <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#111A2D] mb-1 leading-none">
//                 {testimonials[activeSlide].stats.acceptance}
//               </div>
//               <p className="text-[#171C35] text-sm md:text-xl font-medium">
//                 {testimonials[activeSlide].stats.acceptanceLabel}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Dots Navigation */}
//         <div className="flex justify-center gap-2">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === activeSlide 
//                   ? 'bg-gray-900 w-8' 
//                   : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialSection;