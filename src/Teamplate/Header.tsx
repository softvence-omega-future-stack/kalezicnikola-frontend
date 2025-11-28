// import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
// import { Menu, X } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/svgIcon/logo.svg";
// import logoText from "../assets/svgIcon/textLogo.svg";
// import ShadowBox from "./ShadowBox";

// const DoclineHeader: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   // Setze 'Preise' als Standard, da es im Original-Code auch aktiv war
//   const [activeItem, setActiveItem] = useState("Preise"); 
//   const headerRef = useRef<HTMLDivElement>(null); // Ref für den Header-Container

//   const handleScroll = (sectionId: string, itemName: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//     setMobileMenuOpen(false);
//     setActiveItem(itemName);
//   };

//   // Logik zum Schließen des Dropdown-Menüs bei Klick außerhalb
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Überprüfen, ob der Klick außerhalb des gesamten Header-Containers (headerRef) erfolgte
//       if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
//         setMobileMenuOpen(false);
//       }
//     };

//     // Nur registrieren, wenn das Menü geöffnet ist, um Performance zu sparen
//     if (mobileMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [mobileMenuOpen]); // Abhängigkeit von mobileMenuOpen

//   const menuItems = [
//     { name: "Funktionen", id: "features" },
//     { name: "Beispiele", id: "examples" },
//     { name: "Testimonials", id: "testimonials" },
//     { name: "Preise", id: "pricing" },
//   ];

//   return (
//     // 'ref' zum äußeren div hinzugefügt, um Klicks außerhalb zu erkennen
//     <header ref={headerRef} className="w-full fixed top-5 left-0 right-0 z-[9999] px-2 sm:px-4">
//       <div
//         // 'w-[93%]' behalten, aber 'mx-auto' hinzugefügt, um die Zentrierung zu gewährleisten
//         className="bg-white/10 mx-auto backdrop-blur-md border-2 border-white rounded-[100px] flex items-center justify-between relative w-[93%]"
//         style={{
//           padding: "10px 10px 10px 30px", // Behalte das Original-Padding
//         }}
//       >
        
//         {/* Logo-Bereich - Responsive Anpassungen hier */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           {/* Logo-Bild: Kleinere responsive Höhe für kleine Bildschirme (max-h-7) */}
//           <img src={logo} alt="Docline Logo" className="h-6 max-h-7" /> 
//           <span className="text-2xl sm:text-3xl font-semibold text-[#171C35] whitespace-nowrap">
//             {/* Logo-Text: Kleinere responsive Höhe für kleine Bildschirme (h-5) */}
//             <img src={logoText} alt="Docline" className="h-4 sm:h-5 md:h-6" /> 
//           </span>
//         </div>

        
//         {/* Desktop Navigation und Buttons */}
//         <div className="hidden lg:flex items-center gap-6 h-full">
//           {/* ... (Desktop-Navigation bleibt unverändert) ... */}
//           <nav className="flex items-center gap-8 text-sm xl:text-base font-medium">
//             {menuItems.map((item) => (
//               <button
//                 key={item.name}
//                 onClick={() => handleScroll(item.id, item.name)}
//                 className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
//                   item.name === activeItem
//                     ? ' text-[#171C35]'
//                     : 'text-[#171C35] hover:text-blue-600'
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </nav>

//           <div className="flex items-center gap-3 ml-2">
//             <LanguageSelector />
            
//             <div className="flex items-center gap-3">
//               {/* Demo buchen */}
//               <button className="px-5 py-3.5 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition whitespace-nowrap">
//                 Demo buchen
//               </button>

//               {/* Login */}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-5 py-3.5 text-base font-medium text-[#171C35] bg-white rounded-full transition cursor-pointer whitespace-nowrap shadow-md"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Menu Toggle (Buttons für Mobile) - Abstand angepasst */}
//         <div className="flex items-center gap-2 lg:hidden"> 
//           <LanguageSelector />
//           <button
//             onClick={() => navigate("/login")}
//             // Erhöhter horizontaler und vertikaler Padding, um mehr Abstand zu schaffen
//             className="px-4 py-2 text-sm font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer whitespace-nowrap"
//           >
//             Login
//           </button>
//           <button
//             className="p-2 rounded-lg hover:bg-white/50 transition cursor-pointer"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="w-6 h-6 text-[#171C35]" />
//             ) : (
//               <Menu className="w-6 h-6 text-[#171C35]" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu Content - Z-Index auf z-[999] erhöht */}
//   {mobileMenuOpen && (
//   <div className="lg:hidden absolute top-full left-0 right-0 z-[9999] mt-2 p-4">
//     <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6">
//       <nav className="flex flex-col gap-4">
//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => handleScroll(item.id, item.name)}
//             className="text-[#171C35] hover:text-blue-600 transition-colors text-left py-1 cursor-pointer"
//           >
//             {item.name}
//           </button>
//         ))}
//         <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
//           <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35]  border border-[#171C35]  transition cursor-pointer">
//             Demo buchen
//           </button>
//         </div>
//       </nav>
//     </div>
//   </div>
// )}


//       </div>
      
      
//       {/* ShadowBox Elemente */}
//       {/* ... (ShadowBoxes bleiben unverändert) ... */}
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

// export default DoclineHeader;



import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svgIcon/logo.svg";
import logoText from "../assets/svgIcon/textLogo.svg";
import ShadowBox from "./ShadowBox";

const DoclineHeader: React.FC = () => {
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
    <header ref={headerRef} className="w-full  fixed inset-0  z-[9999] pt-5 px-2 sm:px-4">
      <div className="relative">
        <div
          className="bg-white/10 mx-auto backdrop-blur-md border-2 border-white rounded-[100px] flex items-center justify-between relative w-[93%] z-[9999]"
          style={{
            padding: "10px 10px 10px 30px",
          }}
        >
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Docline Logo" className="" /> 
            <span className="font-semibold text-[#171C35] whitespace-nowrap">
              <img src={logoText} alt="Docline" className="hidden sm:block" /> 
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
                <button className="px-5 py-3.5 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition whitespace-nowrap">
                  Demo buchen
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-3.5 text-base font-medium text-[#171C35] bg-white rounded-full transition cursor-pointer whitespace-nowrap shadow-md"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          {/* Mobile Menu Toggle */}
<div className="flex items-center justify-between lg:hidden w-full px-4">


  {/* Language Selector */}
  <LanguageSelector />

  {/* Login Button */}
  <button
    onClick={() => navigate("/login")}
    className="px-4 py-2 text-sm font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer"
  >
    Login
  </button>

  {/* Menu Icon */}
  <button
    className="p-2 rounded-lg hover:bg-white/50 transition cursor-pointer"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    {mobileMenuOpen ? <X className="w-6 h-6 text-[#171C35]" /> : <Menu className="w-6 h-6 text-[#171C35]" />}
  </button>
</div>

        </div>

        {/* Mobile Menu Dropdown - Now outside the main nav bar */}
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
                <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                  <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition cursor-pointer">
                    Demo buchen
                  </button>
                </div>
              </nav>
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

export default DoclineHeader;