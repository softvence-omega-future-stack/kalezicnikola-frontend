import React from 'react';
import ShadowBox from "../Teamplate/ShadowBox";

import logo from '../assets/svgIcon/logo.svg';
import { Link } from 'react-router-dom';
// import { BsLinkedin } from "react-icons/bs";
// import { FaFacebook } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";

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
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' }
];


    const socialLinks = [
        { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.8156 2H3.18125C2.52812 2 2 2.51563 2 3.15313V16.8438C2 17.4813 2.52812 18 3.18125 18H16.8156C17.4688 18 18 17.4813 18 16.8469V3.15313C18 2.51563 17.4688 2 16.8156 2ZM6.74687 15.6344H4.37188V7.99687H6.74687V15.6344ZM5.55938 6.95625C4.79688 6.95625 4.18125 6.34062 4.18125 5.58125C4.18125 4.82188 4.79688 4.20625 5.55938 4.20625C6.31875 4.20625 6.93437 4.82188 6.93437 5.58125C6.93437 6.3375 6.31875 6.95625 5.55938 6.95625ZM15.6344 15.6344H13.2625V11.9219C13.2625 11.0375 13.2469 9.89687 12.0281 9.89687C10.7937 9.89687 10.6062 10.8625 10.6062 11.8594V15.6344H8.2375V7.99687H10.5125V9.04063H10.5437C10.8594 8.44063 11.6344 7.80625 12.7875 7.80625C15.1906 7.80625 15.6344 9.3875 15.6344 11.4438V15.6344Z" fill="#111A2D"/>
</svg>, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
        { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 10.0489C18 5.60361 14.4183 2 10 2C5.58172 2 2 5.60361 2 10.0489C2 14.0663 4.92547 17.3962 8.75 18V12.3755H6.71875V10.0489H8.75V8.27562C8.75 6.25837 9.94438 5.1441 11.7717 5.1441C12.6467 5.1441 13.5625 5.3013 13.5625 5.3013V7.28208H12.5538C11.56 7.28208 11.25 7.90257 11.25 8.53972V10.0489H13.4688L13.1141 12.3755H11.25V18C15.0745 17.3962 18 14.0663 18 10.0489Z" fill="#111A2D"/>
</svg>, href: 'https://www.facebook.com/', label: 'Facebook' },
        { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3333 2.5C14.4384 2.5 15.4982 2.93899 16.2796 3.72039C17.061 4.50179 17.5 5.5616 17.5 6.66667V13.3333C17.5 14.4384 17.061 15.4982 16.2796 16.2796C15.4982 17.061 14.4384 17.5 13.3333 17.5H6.66667C5.5616 17.5 4.50179 17.061 3.72039 16.2796C2.93899 15.4982 2.5 14.4384 2.5 13.3333V6.66667C2.5 5.5616 2.93899 4.50179 3.72039 3.72039C4.50179 2.93899 5.5616 2.5 6.66667 2.5H13.3333ZM10 6.66667C9.11594 6.66667 8.2681 7.01786 7.64298 7.64298C7.01786 8.2681 6.66667 9.11594 6.66667 10C6.66667 10.8841 7.01786 11.7319 7.64298 12.357C8.2681 12.9821 9.11594 13.3333 10 13.3333C10.8841 13.3333 11.7319 12.9821 12.357 12.357C12.9821 11.7319 13.3333 10.8841 13.3333 10C13.3333 9.11594 12.9821 8.2681 12.357 7.64298C11.7319 7.01786 10.8841 6.66667 10 6.66667ZM10 8.33333C10.442 8.33333 10.866 8.50893 11.1785 8.82149C11.4911 9.13405 11.6667 9.55797 11.6667 10C11.6667 10.442 11.4911 10.866 11.1785 11.1785C10.866 11.4911 10.442 11.6667 10 11.6667C9.55797 11.6667 9.13405 11.4911 8.82149 11.1785C8.50893 10.866 8.33333 10.442 8.33333 10C8.33333 9.55797 8.50893 9.13405 8.82149 8.82149C9.13405 8.50893 9.55797 8.33333 10 8.33333ZM13.75 5.41667C13.529 5.41667 13.317 5.50446 13.1607 5.66074C13.0045 5.81702 12.9167 6.02899 12.9167 6.25C12.9167 6.47101 13.0045 6.68298 13.1607 6.83926C13.317 6.99554 13.529 7.08333 13.75 7.08333C13.971 7.08333 14.183 6.99554 14.3393 6.83926C14.4955 6.68298 14.5833 6.47101 14.5833 6.25C14.5833 6.02899 14.4955 5.81702 14.3393 5.66074C14.183 5.50446 13.971 5.41667 13.75 5.41667Z" fill="#111A2D"/>
</svg>, href: 'https://www.instagram.com/', label: 'Instagram' }
    ];

    return (
        <footer
            style={{ fontFamily: 'Urbanist, sans-serif' }}
            className="w-full pt-10 md:pt-[120px]  relative overflow-hidden"
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
                            className="top-0 right-0 absolute"
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
                <div className="pt-6 border-t border-gray-300 relative z-10 mt-">
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

                   
<div className="flex items-center gap-4">
  {legalLinks.map((link, index) => (
    <Link
      key={index}
      to={link.href}
      className="text-sm text-[#171C35] hover:text-blue-600 transition-colors whitespace-nowrap"
    >
      {link.label}
    </Link>
  ))}
</div>
                        </div>

                        {/* SOCIAL ICONS */}
                        <div className="flex items-center justify-center gap-2">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 flex items-center justify-center text-[#171C35] hover:text-blue-600 transition-colors"
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
