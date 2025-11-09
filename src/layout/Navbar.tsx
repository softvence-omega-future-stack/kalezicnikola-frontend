// // DoclineHeader.tsx
// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/svgIcon/logo.svg";
// import { useNavigate } from "react-router-dom";
// import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
// import "./nav.css"; // custom CSS for shape overlays

// const DoclineHeader: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Funktionen", id: "features" },
//     { name: "Beispiele", id: "examples" },
//     { name: "Testimonials", id: "testimonials" },
//     { name: "Preise", id: "pricing" },
//   ];

//   const handleScroll = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//     setMobileMenuOpen(false);
//   };

//   return (
//     <header className="w-full fixed top-0 left-0 z-20 px-4 py-3">
//       {/* Outer Gradient + Shape */}
//       <div className="relative bg-gradient-to-r from-blue-50/50 via-white/30 to-green-50/50 rounded-t-[32px] overflow-hidden">
//         {/* Inner Glass Container */}
//         <div className="relative z-10 bg-white/60 backdrop-blur-md border border-white/30 shadow-md rounded-t-[30px] flex items-center justify-between px-6 py-2.5">
//           {/* Logo */}
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <img src={logo} alt="Docline Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
//             <span className="text-lg sm:text-2xl font-semibold text-[#171C35]">
//               Docline
//             </span>
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-6">
//             <nav className="flex items-center gap-6 text-sm sm:text-base font-medium">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => handleScroll(item.id)}
//                   className="text-[#171C35] hover:text-blue-600 transition-colors"
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </nav>

//             {/* Language + Buttons */}
//             <div className="flex items-center gap-2 ml-4">
//               <LanguageSelector />
//               <button className="px-5 py-2 rounded-full text-base font-medium bg-blue-100 hover:bg-blue-200 text-[#171C35] transition">
//                 Demo buchen
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-6 py-2 rounded-full bg-white text-[#171C35] hover:text-blue-600 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           <div className="flex lg:hidden items-center gap-2">
//             <LanguageSelector />
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-1.5 rounded-full bg-white text-[#171C35] hover:text-blue-600 transition"
//             >
//               Login
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-white/50 transition"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {mobileMenuOpen && (
//           <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 lg:hidden z-10">
//             <nav className="flex flex-col gap-4">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => handleScroll(item.id)}
//                   className="text-[#171C35] hover:text-blue-600 text-left py-1"
//                 >
//                   {item.name}
//                 </button>
//               ))}
//               <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
//                 <button className="px-5 py-2 rounded-full text-base font-medium bg-blue-100 hover:bg-blue-200 text-[#171C35] transition">
//                   Demo buchen
//                 </button>
//               </div>
//             </nav>
//           </div>
//         )}

//         {/* Custom Left/Right Overlay Shapes */}
//         <div className="absolute inset-0 pointer-events-none shape-overlay"></div>
//       </div>
//     </header>
//   );
// };

// export default DoclineHeader;



// import React from 'react';

// const DoclineNavbar: React.FC = () => {
//   return (
//     <div className=" relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #e8e3f3 0%, #f5f3fa 100%)' }}>
//       {/* Left Side Blue Blur */}
//       <div 
//         className="absolute"
//         style={{
//           top: '0px',
//           left: '-100px',
//           width: '321px',
//           height: '232px',
//           borderRadius: '321px',
//           background: '#283AFF',
//           filter: 'blur(70px)',
//           flexShrink: 0,
//           pointerEvents: 'none'
//         }}
//       />

//       {/* Right Side Green Blur - SVG */}
//       <div 
//         className="absolute"
//         style={{
//           top: '-87px',
//           right: '-150px',
//           width: '353px',
//           height: '226px',
//           flexShrink: 0,
//           pointerEvents: 'none'
//         }}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="353" height="226" viewBox="0 0 353 226" fill="none">
//           <g filter="url(#filter0_f_1439_12989)">
//             <ellipse cx="328" cy="-87" rx="128" ry="113" fill="#5EF3A3"/>
//           </g>
//           <defs>
//             <filter id="filter0_f_1439_12989" x="0" y="-400" width="656" height="626" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
//               <feFlood floodOpacity="0" result="BackgroundImageFix"/>
//               <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//               <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1439_12989"/>
//             </filter>
//           </defs>
//         </svg>
//       </div>

//       {/* Main Navbar Container */}
//       <nav className="pt-6 pb-8 relative z-10">
//         <div className="mx-auto flex justify-center px-4">
//           {/* Navbar with Figma Design */}
//           <div 
//             className="flex items-center"
//             style={{
//               width: '1290px',
//               maxWidth: '95vw',
//               padding: '10px 10px 10px 30px',
//               borderRadius: '100px',
//               background: 'rgba(255, 255, 255, 0.10)',
//               backdropFilter: 'blur(10px)',
//               gap: '373px',
//               border: '1px solid rgba(255, 255, 255, 0.2)'
//             }}
//           >
//             {/* Left Section - Logo */}
//             <div className="flex items-center space-x-2 flex-shrink-0">
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M7 2L17 12L7 22V2Z" />
//                 </svg>
//               </div>
//               <span className="text-2xl font-bold text-gray-900">Docline</span>
//             </div>

//             {/* Right Section - Menu, Language & Buttons */}
//             <div className="flex items-center justify-between flex-1 min-w-0">
//               {/* Center Menu Items */}
//               <div className="hidden lg:flex items-center space-x-8 flex-shrink-0">
//                 <a href="#" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">Funktionen</a>
//                 <a href="#" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">Beispiele</a>
//                 <a href="#" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">Testimonials</a>
//                 <a href="#" className="text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">Preise</a>
//               </div>

//               {/* Right Side - Language & Buttons */}
//               <div className="flex items-center space-x-4 flex-shrink-0">
//                 {/* Language Selector */}
//                 <div className="flex items-center space-x-2 cursor-pointer">
//                   <div className="w-6 h-6 rounded-full overflow-hidden">
//                     <div className="w-full h-full bg-gradient-to-b from-black via-red-600 to-yellow-400"></div>
//                   </div>
//                   <span className="text-gray-700 font-medium">DE</span>
//                   <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>

//                 {/* Demo Button */}
//                 <button className="px-6 py-2 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap">
//                   Demo buchen
//                 </button>

//                 {/* Login */}
//                 <a href="#" className="text-gray-900 font-medium hover:text-gray-700 whitespace-nowrap">Login</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

     
//     </div>
//   );
// };

// export default DoclineNavbar;