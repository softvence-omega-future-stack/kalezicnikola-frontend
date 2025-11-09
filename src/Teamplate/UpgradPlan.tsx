import icon from '../assets/svgIcon/herologo.svg';
import tricjcircle from '../assets/svgIcon/tickcircle.svg';
import tricjcirclewhite from '../assets/svgIcon/tick-circle-white.svg';
import { useState } from 'react';

const UpgradPlan = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className='relative min-h-scree mt-44 xl:mx-30 rounded-3xl pb-6 overflow-hidden '>
      <div className=''>

        {/* Top shape */}
<div
  style={{
    width: '100%',
    height: '859px',
    borderRadius: '40px',
    background: '#FFF',
    alignSelf: 'stretch',
  }}
  className="absolute top-0 left-0 z-0"
></div>

{/* Bottom shape */}
<div
  style={{
    width: '100%',
    height: '859px',
    borderRadius: '40px',
    background: '#FFF',
    alignSelf: 'stretch',
  }}
  className="absolute bottom-0 left-0 z-0"
></div>

      {/* Left and Right Background Shapes */}
      {/* Left shape */}
      <div
        style={{
          width: '680px', 
          height: '400px', 
          borderRadius: '50%',
          background: 'rgba(43, 142, 255, 0.30)',
          filter: 'blur(200px)',
          transform: 'rotate(11deg)',
        }}
        className="absolute -top-32 -left-64 z-0 "
      ></div>

      {/* Right shape */}
      <div
        style={{
          width: '654px', // original width
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(71, 43, 255, 0.20)',
          filter: 'blur(200px)',
          transform: 'rotate(-80deg)',
        }}
        className="absolute top-32 right-[-80px] z-0"
      ></div>

      {/* Main Content */}
      <div style={{ fontFamily: 'Urbanist, sans-serif' }} className='relative z-10 p-4 md:p-8  '>
        <div className='xl:mx-[200px]'>
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white shadow-sm rounded-full mb-6">
              <img src={icon} alt="Docline logo" />
              <span className="text-[#171C35] text-sm font-medium">Transparent pricing</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#171c35] mb-4">
              Choose the right plan
              <br /> for your practice
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-2.5 text-sm font-normal rounded-full transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-[#526FFF] text-white'
                    : 'text-[#171c35] hover:bg-gray-50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-8 py-2.5 text-sm font-normal rounded-full transition-colors ${
                  billingCycle === 'annually'
                    ? 'bg-[#526FFF] text-white'
                    : 'text-[#171c35] hover:bg-gray-50'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Standard</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-[#526FFF]">399€</span>
                  <span className="text-sm text-[#526FFF]">/month</span>
                  <p className="text-sm text-[#171c35] text-right xl:ml-7">Full Price</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','2000 call minutes / month included','€0.35 per extra minute','Email Support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcircle} alt="" />
                    <span className="text-sm text-[#171c35]">{text}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 px-6 py-3 text-xs font-semibold text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full hover:bg-blue-50 transition-colors">
                GET STARTED
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-8">Premium</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-white">899€</span>
                  <span className="text-sm text-gray-400">/month</span>
                  <p className="text-sm text-gray-300 text-right xl:ml-6">Full Price</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','4000 call minutes / month included','€0.30 per extra minute','Multilingual (25+ languages)','Prioritized email and live chat support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcirclewhite} alt="" />
                    <span className="text-sm text-white">{text}</span>
                  </div>
                ))}
              </div>
              <button className="w-full px-6 py-3 text-sm font-medium text-white bg-[#526FFF] rounded-full transition-colors">
                GET STARTED
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-[#526FFF] mb-8">Enterprise</h2>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-medium text-blue-500">1299€</span>
                  <span className="text-sm text-gray-600">/month</span>
                  <p className="text-sm text-[#171c35] text-right xl:ml-2">Full Price</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {['AI Voicebot setup & configuration','24/7 availability & call handling','Intelligent triage & task creation','4000 call minutes / month included','€0.30 per overtime minute','Multilingual (25+ languages)','24/7 Premium Support'].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={tricjcircle} alt="" />
                    <span className="text-sm text-[#171c35]">{text}</span>
                  </div>
                ))}
              </div>
              <button className="w-full px-6 py-3 text-xs font-medium text-[#526FFF] bg-white border-2 border-[#526FFF] rounded-full transition-colors">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpgradPlan;





// import React, { useState } from 'react';
// import { Check } from 'lucide-react';

// interface PlanFeature {
//   text: string;
// }

// interface PricingPlan {
//   name: string;
//   price: number;
//   period: string;
//   features: PlanFeature[];
//   buttonText: string;
//   isPopular?: boolean;
// }

// const PricingPlans: React.FC = () => {
//   const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

//   const plans: PricingPlan[] = [
//     {
//       name: 'Standard',
//       price: 399,
//       period: '/month',
//       features: [
//         { text: 'AI Voicebot setup & configuration' },
//         { text: '24/7 availability & call handling' },
//         { text: 'Intelligent triage & task creation' },
//         { text: '2000 call minutes / month included' },
//         { text: '€0.35 per extra minute' },
//         { text: 'Email support' }
//       ],
//       buttonText: 'GET STARTED'
//     },
//     {
//       name: 'Premium',
//       price: 899,
//       period: '/month',
//       features: [
//         { text: 'AI Voicebot setup & configuration' },
//         { text: '24/7 availability & call handling' },
//         { text: 'Intelligent triage & task creation' },
//         { text: '4000 call minutes / month included' },
//         { text: '€0.30 per extra minute' },
//         { text: 'Multilingual support (25+ languages)' },
//         { text: 'Priority email & live chat support' }
//       ],
//       buttonText: 'GET STARTED',
//       isPopular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 1299,
//       period: '/month',
//       features: [
//         { text: 'AI Voicebot setup & configuration' },
//         { text: '24/7 availability & call handling' },
//         { text: 'Intelligent triage & task creation' },
//         { text: '8000 call minutes / month included' },
//         { text: '€0.25 per extra minute' },
//         { text: 'Multilingual support (25+ languages)' },
//         { text: '24/7 premium support' }
//       ],
//       buttonText: 'GET STARTED'
//     }
//   ];

//   return (
//     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="xl:mx-[200px]  bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 ">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-2 mb-6">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-xl">✨</span>
//             </div>
//             <span className="text-gray-600 text-sm">Transparent pricing</span>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
//             Choose the right plan<br />for your practice
//           </h1>

//           {/* Billing Toggle */}
//           <div className="inline-flex items-center bg-white rounded-full p-1 s">
//             <button
//               onClick={() => setBillingCycle('monthly')}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                 billingCycle === 'monthly'
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setBillingCycle('yearly')}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                 billingCycle === 'yearly'
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Yearly
//             </button>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`relative rounded-3xl p-8 transition-all duration-300 ${
//                 plan.isPopular
//                   ? 'bg-gray-900 text-white shadow-2xl scale-105 md:scale-110'
//                   : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
//               }`}
//             >
//               {/* Plan Name */}
//               <h3
//                 className={`text-lg font-semibold mb-6 ${
//                   plan.isPopular ? 'text-blue-400' : 'text-blue-600'
//                 }`}
//               >
//                 {plan.name}
//               </h3>

//               {/* Price */}
//               <div className="mb-8">
//                 <div className="flex items-baseline">
//                   <span className="text-5xl font-bold">{plan.price}€</span>
//                   <span
//                     className={`ml-2 text-sm ${
//                       plan.isPopular ? 'text-gray-400' : 'text-gray-500'
//                     }`}
//                   >
//                     {plan.period}
//                   </span>
//                 </div>
//               </div>

//               {/* Features */}
//               <ul className="space-y-4 mb-8">
//                 {plan.features.map((feature, featureIndex) => (
//                   <li key={featureIndex} className="flex items-start gap-3">
//                     <div
//                       className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
//                         plan.isPopular ? 'bg-blue-600' : 'bg-gray-900'
//                       }`}
//                     >
//                       <Check className="w-3 h-3 text-white" strokeWidth={3} />
//                     </div>
//                     <span
//                       className={`text-sm leading-relaxed ${
//                         plan.isPopular ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                     >
//                       {feature.text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* CTA Button */}
//               <button
//                 className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide transition-all ${
//                   plan.isPopular
//                     ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/50'
//                     : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
//                 }`}
//               >
//                 {plan.buttonText}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;
