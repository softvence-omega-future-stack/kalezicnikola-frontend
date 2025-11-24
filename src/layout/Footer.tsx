

import React from 'react';
import ShadowBox from "../Teamplate/ShadowBox";

import logo from '../assets/svgIcon/logo.svg';
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer: React.FC = () => {
    const navigationLinks = [
        { label: 'Home', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'How it works', href: '#' },
        { label: 'Case study', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Terms and Condition', href: '#' },
        { label: 'Privacy Policy', href: '#' }
    ];

    const legalLinks = [
        { label: 'Impressum', href: '#' },
        { label: 'Data Protection', href: '#' }
    ];

    const socialLinks = [
        { icon: <BsLinkedin size={18} />, href: '#', label: 'LinkedIn' },
        { icon: <FaFacebook size={18} />, href: '#', label: 'Facebook' },
        { icon: <AiFillInstagram size={18} />, href: '#', label: 'Instagram' }
    ];

    return (
        <footer style={{ fontFamily: 'Urbanist, sans-serif' }} className="w-full relative overflow-hidden bg-[#F9FAFB]">
            <div className="mx-auto w-[80%] relative">
                {/* Top Section */}
                <div className="rounded-[100px] flex flex-col relative bg-white/10 backdrop-blur-md p-8">
                    <div className="text-center mb-8 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <img src={logo} alt="Docline Logo" />
                            <span className="text-2xl font-semibold text-[#171C35]">Docline</span>
                        </div>
                        <p className="text-base text-[#171C35] mb-2">We create stress-free practices</p>
                        <a href="mailto:info@docline.ai" className="text-xl text-[#526FFF] font-medium hover:text-blue-600 transition-colors">
                            info@docline.ai
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="mb-8 relative z-10">
                        <ul className="flex flex-wrap justify-center gap-6">
                            {navigationLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-[#171C35] hover:text-blue-600 font-medium transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ShadowBox - subtle colorful halos like header */}
                    <ShadowBox
                        width="300px"
                        height="250px"
                        color="rgba(40, 58, 255, 0.08)"
                        borderRadius="300px"
                        blur="180px"
                        className="-bottom-28 -left-20 absolute z-0"
                    />
                    <ShadowBox
                        width="250px"
                        height="280px"
                        color="rgba(114, 255, 92, 0.06)"
                        borderRadius="280px"
                        blur="200px"
                        className="-bottom-32 left-1/2 transform -translate-x-1/2 absolute z-0"
                    />
                    <ShadowBox
                        width="250px"
                        height="280px"
                        color="rgba(40, 58, 255, 0.06)"
                        borderRadius="280px"
                        blur="200px"
                        className="-bottom-32 right-20 absolute z-0"
                    />
                    <ShadowBox
                        width="300px"
                        height="250px"
                        color="rgba(94, 243, 163, 0.06)"
                        borderRadius="300px"
                        blur="180px"
                        className="-bottom-28 -right-16 absolute z-0"
                    />
                </div>

                {/* Bottom Section */}
                <div className="pt-6 sm:pt-8 border-t border-gray-300 relative z-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                        {/* Copyright & Legal */}
                        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8'>
                            <div className="text-sm text-[#111A2D]">
                                © 2025 Docline. All rights reserved.
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6">
                                {legalLinks.map((link, index) => (
                                    <a key={index} href={link.href} className="text-xs sm:text-sm text-[#171C35] hover:text-blue-600 font-medium transition-colors">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-sm bg-white/50"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


// import React from 'react';

// import logo from '../assets/svgIcon/logo.svg'
// import { BsLinkedin } from "react-icons/bs";
// import { FaFacebook } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";

// const Footer: React.FC = () => {
//   const navigationLinks = [
//     { label: 'Home', href: '#' },
//     { label: 'Features', href: '#' },
//     { label: 'How it works', href: '#' },
//     { label: 'Case study', href: '#' },
//     { label: 'Pricing', href: '#' },
//     { label: 'Terms and Condition', href: '#' },
//     { label: 'Privacy Policy', href: '#' }
//   ];

//   const legalLinks = [
//     { label: 'Impressum', href: '#' },
//     { label: 'Data Protection', href: '#' }
//   ];

//   const socialLinks = [
//     { icon: <BsLinkedin size={18} />, href: '#', label: 'LinkedIn' },
  
//     { icon: <FaFacebook size={18} />, href: '#', label: 'Facebook' },
//     { icon: <AiFillInstagram size={18} />, href: '#', label: 'Instagram' }
//   ];

//   return (
//     <footer style={{ fontFamily: 'Urbanist, sans-serif' }} className="w-full pt-15 md:pt-[180px] lg:pt-[180px]   bg-[#F3F6F6]">
//       <div className=" px-4 py-8">
//         {/* Top Section - Logo, Tagline, Email */}
//         <div className="text-center mb-8 sm:mb-10 md:mb-12">
//           {/* Logo */}
//           <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
//             <img src={logo} alt="" />
//             <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#171C35]">Docline</span>
//           </div>

//           {/* Tagline */}
//           <p className="text-base  text-[#171C35] mb-2 sm:mb-3">
//             We create stress-free practices
//           </p>

//           {/* Email */}
//           <a 
//             href="mailto:info@docline.ai" 
//             className="text-xl text-[#526FFF] font-medium transition-colors"
//           >
//             info@docline.ai
//           </a>
//         </div>

//         {/* Middle Section - Navigation Links */}
//         <nav className="mb-8 sm:mb-10 md:mb-12">
//           <ul className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4">
//             {navigationLinks.map((link, index) => (
//               <li key={index}>
//                 <a
//                   href={link.href}
//                   className=" md:text-base text-[#171C35] hover:text-blue-600 transition-colors font-medium"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Bottom Section - Copyright, Legal, Social */}
//         <div className="pt-6 sm:pt-8 border-t border-gray-200">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
//             {/* Copyright */}
//             <div className="text-base text-[#111A2D] order-2 sm:order-1">
//               © 2025 Docline. All rights reserved.
//             </div>

//             {/* Legal Links */}
//             <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
//               {legalLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.href}
//                   className="text-xs sm:text-sm text-[#171C35] hover:text-blue-600 transition-colors font-medium"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </div>

//             {/* Social Icons */}
//             <div className="flex items-center gap-3 sm:gap-4 order-3">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-sm"
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;