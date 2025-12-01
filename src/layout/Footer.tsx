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
        { label: 'Who it work', href: '#' },
        { label: 'Case study', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Terms and Condition', href: '#' },
        { label: 'Privacy Policy', href: '#' }
    ];

    const legalLinks = [
        { label: 'Impressum', href: '#' },
        { label: 'Datenschutz', href: '#' }
    ];

    const socialLinks = [
        { icon: <BsLinkedin size={18} />, href: '#', label: 'LinkedIn' },
        { icon: <FaFacebook size={18} />, href: '#', label: 'Facebook' },
        { icon: <AiFillInstagram size={22} />, href: '#', label: 'Instagram' }
    ];

    return (
        <footer
            style={{ fontFamily: 'Urbanist, sans-serif' }}
            className="w-full pt-10 md:pt-[120px] pb-8 relative overflow-hidden"
        >
            {/* CONTAINER – MOBILE FULL WIDTH, DESKTOP 80% */}
            <div className="mx-auto w-[92%] sm:w-[88%] md:w-[80%]">

                {/* TOP SECTION */}
                <div
                    className="
                        rounded-[40px] sm:rounded-[50px]
                        flex flex-col 
                        relative transition-all duration-300  
                        backdrop-blur-md
                        px-4 sm:px-8
                        py-8 sm:py-12
                    "
                >
                    {/* LOGO + CONTACT */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="flex items-center justify-center  mb-4">
                            <img src={logo} alt="Docline Logo" className="h-8 w-8" />
                            <span className="text-2xl font-semibold text-[#171C35]">
                                Docline
                            </span>
                        </div>

                        <p className="text-base text-gray-700 mb-4">
                            Wir schaffen stressfreie Praxen
                        </p>

                        <a
                            href="mailto:info@docline.ai"
                            className="text-lg text-[#526FFF] font-medium hover:text-blue-600 transition-colors"
                        >
                            info@docline.ai
                        </a>
                    </div>

                    {/* NAVIGATION LINKS – FULLY RESPONSIVE */}
                    <nav className="relative z-10 ">
                        <ul className="
                            flex flex-wrap 
                            items-center justify-center 
                            gap-x-8 gap-y-3 
                            text-center
                        ">
                            {navigationLinks.map((link, index) => (
                                <li key={index} className="whitespace-nowrap">
                                    <a
                                        href={link.href}
                                        className="text-base text-[#171C35] hover:text-blue-600 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* SHADOW BACKGROUND */}
                    <div className="absolute w-full inset-x-0 bottom-0 z-0 pointer-events-none opacity-50">
                        <ShadowBox
                            width="321px"
                            height="232px"
                            color="#283AFF"
                            borderRadius="321px"
                            blur="200px"
                            className="top-24 -left-20 absolute"
                        />
                        <ShadowBox
                            width="256px"
                            height="295px"
                            color="#72FF5C"
                            borderRadius="295px"
                            blur="350px"
                            className="top-32 left-1/2 transform translate-x-1/2 absolute"
                        />
                        <ShadowBox
                            width="256px"
                            height="295px"
                            color="#283AFF"
                            borderRadius="295px"
                            blur="350px"
                            className="bottom-24 right-0 absolute"
                        />
                        <ShadowBox
                            width="321px"
                            height="232px"
                            color="#5EF3A3"
                            borderRadius="321px"
                            blur="300px"
                            className="top-24 -right-16 absolute"
                        />
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="pt-6 border-t border-gray-300 relative z-10 mt-6">
                    <div className="
                        flex flex-col sm:flex-row 
                        items-center justify-between 
                        gap-4 sm:gap-0
                        text-center sm:text-left
                    ">
                        {/* LEFT SIDE */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                            <div className="text-sm text-[#111A2D] whitespace-nowrap">
                                © 2025 Docline. Alle Rechte vorbehalten.
                            </div>

                            {/* LEGAL LINKS */}
                            <div className="flex items-center gap-4">
                                {legalLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="text-sm text-[#171C35] hover:text-blue-600 transition-colors whitespace-nowrap"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* SOCIAL ICONS */}
                        <div className="flex items-center justify-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-6 h-6 flex items-center justify-center text-[#171C35] hover:text-blue-600 transition-colors"
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

// import logo from '../assets/svgIcon/logo.svg';
// import bgImg from '../assets/svgIcon/footerImg.svg';
// // import Instagram from '../assets/svgIcon/instagram.svgg';
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
//     { icon: <AiFillInstagram size={20} />, href: '#', label: 'Instagram' }
//   ];

//   return (
//   <footer
//             style={{
//                 // Verwenden Sie 'cover' in der Kurzschrift und entfernen Sie backgroundSize: "100% 100%"
//                 background: `url(${bgImg})   `,
//             }}
//             // ENTFERNT: bg-[#F3F6F6]
//             className="w-full pt-20 md:pt-[180px]" 
//         >
//       <div className="px-4 py-8">

//         {/* Top Section */}
//         <div className="text-center mb-8 sm:mb-10 md:mb-12">
//           <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
//             <img src={logo} alt="" />
//             <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#171C35]">
//               Docline
//             </span>
//           </div>

//           <p className="text-base text-[#171C35] mb-2 sm:mb-3">
//             We create stress-free practices
//           </p>

//           <a 
//             href="mailto:info@docline.ai" 
//             className="text-xl text-[#526FFF] font-medium transition-colors"
//           >
//             info@docline.ai
//           </a>
//         </div>

//         {/* Navigation */}
//         <nav className="mb-8 sm:mb-10 md:mb-12">
//           <ul className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4">
//             {navigationLinks.map((link, index) => (
//               <li key={index}>
//                 <a
//                   href={link.href}
//                   className="md:text-base text-[#171C35] hover:text-blue-600 transition-colors font-medium"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Bottom Section */}
//         <div className="pt-2 sm:pt-3 border-t max-w-7xl mx-auto border-gray-200">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

//             <div className="text-base flex  flex-col sm:flex-row items-center gap-8 text-[#111A2D] order-2 sm:order-1">
//               © 2025 Docline. All rights reserved.
            

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
//             </div>

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
