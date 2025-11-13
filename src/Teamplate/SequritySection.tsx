import React from 'react';
import icon from '../assets/svgIcon/herologo.svg';
import './buttom.css'

const SecuritySection: React.FC = () => {
  const features = [
    {
      // Icon 1
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 7.5H1.5C0.671578 7.5 0 6.82842 0 6V3C0 2.17158 0.671578 1.5 1.5 1.5H22.5C23.3284 1.5 24 2.17158 24 3V6C24 6.82842 23.3284 7.5 22.5 7.5ZM20.25 3.375C19.6287 3.375 19.125 3.87867 19.125 4.5C19.125 5.12133 19.6287 5.625 20.25 5.625C20.8713 5.625 21.375 5.12133 21.375 4.5C21.375 3.87867 20.8713 3.375 20.25 3.375ZM17.25 3.375C16.6287 3.375 16.125 3.87867 16.125 4.5C16.125 5.12133 16.6287 5.625 17.25 5.625C17.8713 5.625 18.375 5.12133 18.375 4.5C18.375 3.87867 17.8713 3.375 17.25 3.375ZM22.5 15H1.5C0.671578 15 0 14.3284 0 13.5V10.5C0 9.67158 0.671578 9 1.5 9H22.5C23.3284 9 24 9.67158 24 10.5V13.5C24 14.3284 23.3284 15 22.5 15ZM20.25 10.875C19.6287 10.875 19.125 11.3787 19.125 12C19.125 12.6213 19.6287 13.125 20.25 13.125C20.8713 13.125 21.375 12.6213 21.375 12C21.375 11.3787 20.8713 10.875 20.25 10.875ZM17.25 10.875C16.6287 10.875 16.125 11.3787 16.125 12C16.125 12.6213 16.6287 13.125 17.25 13.125C17.8713 13.125 18.375 12.6213 18.375 12C18.375 11.3787 17.8713 10.875 17.25 10.875ZM22.5 22.5H1.5C0.671578 22.5 0 21.8284 0 21V18C0 17.1716 0.671578 16.5 1.5 16.5H22.5C23.3284 16.5 24 17.1716 24 18V21C24 21.8284 23.3284 22.5 22.5 22.5ZM20.25 18.375C19.6287 18.375 19.125 18.8787 19.125 19.5C19.125 20.1213 19.6287 20.625 20.25 20.625C20.8713 20.625 21.375 20.1213 21.375 19.5C21.375 18.8787 20.8713 18.375 20.25 18.375ZM17.25 18.375C16.6287 18.375 16.125 18.8787 16.125 19.5C16.125 20.1213 16.6287 20.625 17.25 20.625C17.8713 20.625 18.375 20.1213 18.375 19.5C18.375 18.8787 17.8713 18.375 17.25 18.375Z" />
      </svg>,
      title: 'Server in the EU',
      description: 'We guarantee that all your patient data is stored exclusively in certified high-security data centers within the EU.',
      subDescription: 'This ensures your data is optimally protected, even against third-party access.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6C20 3.832 16.337 2 12 2C7.663 2 4 3.832 4 6V8C4 10.168 7.663 12 12 12C16.337 12 20 10.168 20 8V6ZM12 19C7.663 19 4 17.168 4 15V18C4 20.168 7.663 22 12 22C16.337 22 20 20.168 20 18V15C20 17.168 16.337 19 12 19Z" />
        <path d="M20 10C20 12.168 16.337 14 12 14C7.663 14 4 12.168 4 10V13C4 15.168 7.663 17 12 17C16.337 17 20 15.168 20 13V10Z" />
      </svg>,
      title: 'Legal Compliance',
      description: 'The legally required Data Processing Agreement (DPA) is an integral and transparent part of your Docline contract.',
      subDescription: 'It regulates all responsibilities legally and gives you immediate compliance assurance without having to check legal details yourself.',
    },
    {
      icon: <svg
  xmlns="http://www.w3.org/2000/svg"
 width="24" height="24" viewBox="0 0 24 24" fill="currentColor"

>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5.879 2.879C5 3.757 5 5.172 5 8V16C5 18.828 5 20.243 5.879 21.121C6.757 22 8.172 22 11 22H13C15.828 22 17.243 22 18.121 21.121C19 20.243 19 18.828 19 16V8C19 5.172 19 3.757 18.121 2.879C17.243 2 15.828 2 13 2H11C8.172 2 6.757 2 5.879 2.879ZM8.25 17C8.25 16.8011 8.32902 16.6103 8.46967 16.4697C8.61032 16.329 8.80109 16.25 9 16.25H12C12.1989 16.25 12.3897 16.329 12.5303 16.4697C12.671 16.6103 12.75 16.8011 12.75 17C12.75 17.1989 12.671 17.3897 12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75H9C8.80109 17.75 8.61032 17.671 8.46967 17.5303C8.32902 17.3897 8.25 17.1989 8.25 17ZM9 12.25C8.80109 12.25 8.61032 12.329 8.46967 12.4697C8.32902 12.6103 8.25 12.8011 8.25 13C8.25 13.1989 8.32902 13.3897 8.46967 13.5303C8.61032 13.671 8.80109 13.75 9 13.75H15C15.1989 13.75 15.3897 13.671 15.5303 13.5303C15.671 13.3897 15.75 13.1989 15.75 13C15.75 12.8011 15.671 12.6103 15.5303 12.4697C15.3897 12.329 15.1989 12.25 15 12.25H9ZM8.25 9C8.25 8.80109 8.32902 8.61032 8.46967 8.46967C8.61032 8.32902 8.80109 8.25 9 8.25H15C15.1989 8.25 15.3897 8.32902 15.5303 8.46967C15.671 8.61032 15.75 8.80109 15.75 9C15.75 9.19891 15.671 9.38968 15.5303 9.53033C15.3897 9.67098 15.1989 9.75 15 9.75H9C8.80109 9.75 8.61032 9.67098 8.46967 9.53033C8.32902 9.38968 8.25 9.19891 8.25 9Z"
    fill="currentColor"
  />
  <path
    opacity="0.5"
    d="M5.235 4.05859C5 4.94159 5 6.17759 5 8.00059V16.0006C5 17.8236 5 19.0586 5.235 19.9426L5 19.9246C4.025 19.8286 3.369 19.6116 2.879 19.1216C2 18.2436 2 16.8286 2 14.0006V10.0006C2 7.17159 2 5.75759 2.879 4.87959C3.369 4.38959 4.025 4.17259 5 4.07659L5.235 4.05859ZM18.765 19.9426C19 19.0586 19 17.8226 19 16.0006V8.00059C19 6.17759 19 4.94159 18.765 4.05859L19 4.07659C19.975 4.17259 20.631 4.38959 21.121 4.87959C22 5.75759 22 7.17059 22 9.99959V13.9996C22 16.8296 22 18.2426 21.121 19.1216C20.631 19.6116 19.975 19.8286 19 19.9246L18.765 19.9426Z"
    fill="currentColor"
  />
</svg>
,
      title: 'Comprehensive Logging',
      description: 'Every access, change, and administrative action within Docline is logged comprehensively and tamper-proof.',
      subDescription: 'The audit log guarantees full transparency and allows you to always prove compliance with confidentiality standards.',
      highlight: true,
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 9V7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7V9C5.3 9 4 10.3 4 12V19C4 20.7 5.3 22 7 22H17C18.7 22 20 20.7 20 19V12C20 10.3 18.7 9 17 9ZM9 7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V9H9V7Z" />
      </svg>,
      title: 'End-to-End Encryption',
      description: 'All data captured by the Voicebot is end-to-end encrypted (both in transit and at rest).',
      subDescription: 'We meet the strictest requirements for the confidentiality of your sensitive patient data.',
    },
  ];

  return (
    <div className="px-4  bg-[#F3F6F6] mt-9 xl:mt-[180px] lg:mt-[180px] md:mt-[180px] lg:px-30">
      <div>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative glass inline-flex items-center gap-2 px-4 py-2 border border-t-2 border-l-2 border-white bg-white/10  rounded-full mb-4">
            <img src={icon} alt="" />
            <span className="text-[#171C35] text-sm font-medium">
              Compliance & Security
            </span>

        
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-15">
            Maximum Security <br /> 100% GDPR Compliant
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 md:p-8 transition-all bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
            >
              {/* Icon container */}
              <div
                className="flex justify-center items-center 
                           border-t-2 border-l-2 border-b-1 border-r-1 border-white 
                           w-[56px] h-[56px] rounded-[16px] bg-white/10 p-[8px_10px] mb-6
                           text-[#171C35] group-hover:text-[#526FFF] transition-colors duration-300"
              >
                {React.cloneElement(feature.icon, {
                  className: "w-8 h-8",
                })}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-4 text-[#171C35] group-hover:text-[#526FFF] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#171C35] text-base leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Sub Description */}
              <p className="text-[#171C35] text-base leading-relaxed">
                {feature.subDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
