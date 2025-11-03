import React from 'react';

import icon from '../assets/svgIcon/herologo.svg'
import feature1 from '../assets/svgIcon/teamplateSecurityIcon1.svg'
import feature2 from '../assets/svgIcon/teampaltesecureIcon2.svg'
import feture3 from '../assets/svgIcon/teamplatesecureIcon3.svg'
import feture4 from '../assets/svgIcon/teamplatSecurityIcon4.svg'

const SecuritySection: React.FC = () => {
  const features = [
    {
      icon: feature1,
      title: 'Server in the EU',
      description: 'We guarantee that all your patient data is stored exclusively in certified high-security data centers within the EU.',
      subDescription: 'This ensures your data is optimally protected, even against third-party access.'
    },
    {
      icon: feature2,
      title: 'Legal Compliance',
      description: 'The legally required Data Processing Agreement (DPA) is an integral and transparent part of your Docline contract.',
      subDescription: 'It regulates all responsibilities legally and gives you immediate compliance assurance without having to check legal details yourself.'
    },
    {
      icon: feture3,
      title: 'Comprehensive Logging',
      description: 'Every access, change, and administrative action within Docline is logged comprehensively and tamper-proof.',
      subDescription: 'The audit log guarantees full transparency and allows you to always prove compliance with confidentiality standards.',
      highlight: true
    },
    {
      icon: feture4,
      title: 'End-to-End Encryption',
      description: 'All data captured by the Voicebot is end-to-end encrypted (both in transit and at rest).',
      subDescription: 'We meet the strictest requirements for the confidentiality of your sensitive patient data.'
    }
  ];

  return (
    <div className="px-4 py-16 md:py-20 lg:py-24 lg:px-30">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
            <img src={icon} alt="" />
            <span className="text-[#171C35] text-sm font-medium">Compliance & Security</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
            Maximum Security <br /> 100% GDPR Compliant
          </h2>
        </div>

        {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
  {features.map((feature, index) => (
    <div key={index} className="rounded-3xl p-6 md:p-8 transition-all">
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
        feature.highlight ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {typeof feature.icon === 'string' ? (
          <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
        ) : (
          feature.icon
        )}
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-semibold mb-4 ${
        feature.highlight ? 'text-[#526FFF]' : 'text-[#171C35]'
      }`}>
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
