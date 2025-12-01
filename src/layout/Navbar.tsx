import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svgIcon/logo.svg";
import logoText from "../assets/svgIcon/textLogo.svg";
import ShadowBox from "@/Teamplate/ShadowBox";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Preise"); 
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (sectionId: string, itemName: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setActiveItem(itemName);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: "Funktionen", id: "features" },
    { name: "Beispiele", id: "examples" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Preise", id: "pricing" },
  ];

  return (
    <header ref={headerRef} className="w-full fixed top-5 left-0 right-0 z-[9999] px-2 sm:px-4">
      <div className="relative">
        <div
          style={{
            boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
                -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                1px 1px 0 -0.4px #FFF inset, 
                -1px -1px 0 -0.5px #FFF inset`,
            padding: "10px 10px 10px 30px",
            backdropFilter: "blur(5px)",
          }}
          className="bg-white/10 mx-auto backdrop-blur-md rounded-[100px] flex items-center justify-between relative w-[93%] z-[9999]"
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Docline Logo"
              className="h-6 sm:h-8 md:h-10 w-auto"
            />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#171C35] whitespace-nowrap">
              <img
                src={logoText}
                alt="Docline"
                className="h-4 sm:h-5 md:h-6 w-auto"
              />
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 h-full">
            <nav className="flex items-center gap-8 text-sm xl:text-base font-medium">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.id, item.name)}
                  className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
                    item.name === activeItem
                      ? ' text-[#171C35]'
                      : 'text-[#171C35] hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-2">
              <LanguageSelector />
              <div className="flex items-center gap-3">
                <button className="px-5 py-3.5 rounded-full leading-4 text-base font-medium text-[#171C35] border border-[#171C35] transition whitespace-nowrap">
                  Demo buchen
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-3.5 text-base font-medium leading-4 text-[#171C35] bg-white rounded-full transition cursor-pointer whitespace-nowrap shadow-md"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden"> 
            <LanguageSelector />
            <button
              className="p-2 rounded-lg hover:bg-white/50 transition cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#171C35]" />
              ) : (
                <Menu className="w-6 h-6 text-[#171C35]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] px-6">
            <div className="bg-white backdrop-blur-md rounded-3xl p-6 shadow-2xl mx-auto w-[93%]">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleScroll(item.id, item.name)}
                    className="text-[#171C35] hover:text-blue-600 transition-colors text-left py-1 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Move Login + Demo buttons below the slider */}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3 mt-4">
                <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition cursor-pointer">
                  Demo buchen
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-full text-base font-medium text-white bg-[#171C35] transition cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ShadowBox Elements */}
      <ShadowBox
        width="321px"
        height="232px"
        color="#283AFF"
        borderRadius="321px"
        blur="200px"
        className="-top-80 -left-30 z-50"
      />
      <ShadowBox
        width="256px"
        height="295px"
        color="#72FF5C"
        borderRadius="295px"
        blur="350px"
        className="-top-100 left-100 z-50"
      />
      <ShadowBox
        width="256px"
        height="295px"
        color="#283AFF"
        borderRadius="295px"
        blur="350px"
        className="-top-100 right-100 z-50"
      />
      <ShadowBox
        width="321px"
        height="232px"
        color="#5EF3A3"
        borderRadius="321px"
        blur="300px"
        className="-top-80 -right-40 z-50"
      />
    </header>
  );
};

export default Navbar;











// import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
// import { Menu, X } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/svgIcon/logo.svg";
// import logoText from "../assets/svgIcon/textLogo.svg";
// import ShadowBox from "@/Teamplate/ShadowBox";
// // import './nav.css'


// const Navbar: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState("Preise"); 
//   const headerRef = useRef<HTMLDivElement>(null);

//   const handleScroll = (sectionId: string, itemName: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//     setMobileMenuOpen(false);
//     setActiveItem(itemName);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
//         setMobileMenuOpen(false);
//       }
//     };

//     if (mobileMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [mobileMenuOpen]);

//   const menuItems = [
//     { name: "Funktionen", id: "features" },
//     { name: "Beispiele", id: "examples" },
//     { name: "Testimonials", id: "testimonials" },
//     { name: "Preise", id: "pricing" },
//   ];

//   return (
//     <header ref={headerRef} className="w-full fixed top-5 left-0 right-0 z-[9999] px-2 sm:px-4">
//       <div className="relative">
//         <div
//           style={{
//     boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
//                 -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
//                 1px 1px 0 -0.4px #FFF inset, 
//                 -1px -1px 0 -0.5px #FFF inset`,
//                    padding: "10px 10px 10px 30px",
//     backdropFilter: "blur(5px)",
//   }}
//           className="bg-white/10 mx-auto backdrop-blur-md rounded-[100px] flex items-center justify-between relative w-[93%] z-[9999]"
         
//         >
          
//           {/* Logo */}
//        <div
//   className="flex items-center gap-2 cursor-pointer"
//   onClick={() => navigate("/")}
// >
//   {/* Logo Image */}
//   <img
//     src={logo}
//     alt="Docline Logo"
//     className="h-6 sm:h-8 md:h-10 w-auto"
//   />

//   {/* Logo Text */}
//   <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#171C35] whitespace-nowrap">
//     <img
//       src={logoText}
//       alt="Docline"
//       className="h-4 sm:h-5 md:h-6 w-auto"
//     />
//   </span>
// </div>


          
//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6 h-full">
//             <nav className="flex items-center gap-8 text-sm xl:text-base font-medium">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => handleScroll(item.id, item.name)}
//                   className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
//                     item.name === activeItem
//                       ? ' text-[#171C35]'
//                       : 'text-[#171C35] hover:text-blue-600'
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </nav>

//             <div className="flex items-center gap-3 ml-2">
//               <LanguageSelector />
              
//               <div className="flex items-center gap-3">
//                 <button className="px-5 py-3.5 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition whitespace-nowrap">
//                   Demo buchen
//                 </button>

//                 <button
//                   onClick={() => navigate("/login")}
//                   className="px-5 py-3.5 text-base font-medium text-[#171C35] bg-white rounded-full transition cursor-pointer whitespace-nowrap shadow-md"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Mobile Menu Toggle */}
//           <div className="flex items-center gap-2 lg:hidden"> 
//             <LanguageSelector />
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 text-sm font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer whitespace-nowrap"
//             >
//               Login
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-white/50 transition cursor-pointer"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6 text-[#171C35]" />
//               ) : (
//                 <Menu className="w-6 h-6 text-[#171C35]" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown - Now outside the main nav bar */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] px-6">
//             <div className="bg-white backdrop-blur-md rounded-3xl p-6 shadow-2xl mx-auto w-[93%]">
//               <nav className="flex flex-col gap-4">
//                 {menuItems.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => handleScroll(item.id, item.name)}
//                     className="text-[#171C35] hover:text-blue-600 transition-colors text-left py-1 cursor-pointer"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//                 <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
//                   <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition cursor-pointer">
//                     Demo buchen
//                   </button>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
      
      
//       {/* ShadowBox Elements */}
//       <ShadowBox
//         width="321px"
//         height="232px"
//         color="#283AFF"
//         borderRadius="321px"
//         blur="200px"
//         className="-top-80 -left-30 z-50"
//       />
//       <ShadowBox
//         width="256px"
//         height="295px"
//         color="#72FF5C"
//         borderRadius="295px"
//         blur="350px"
//         className="-top-100 left-100 z-50"
//       />
//       <ShadowBox
//         width="256px"
//         height="295px"
//         color="#283AFF"
//         borderRadius="295px"
//         blur="350px"
//         className="-top-100 right-100 z-50"
//       />
//       <ShadowBox
//         width="321px"
//         height="232px"
//         color="#5EF3A3"
//         borderRadius="321px"
//         blur="300px"
//         className="-top-80 -right-40 z-50"
//       />
//     </header>
//   );
// };

// export default Navbar;