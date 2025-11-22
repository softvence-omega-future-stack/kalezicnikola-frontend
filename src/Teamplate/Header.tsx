import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svgIcon/logo.svg";
import logoText from "../assets/svgIcon/textLogo.svg";
import ShadowBox from "./ShadowBox";

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Preise"); 

  const handleScroll = (sectionId: string, itemName: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setActiveItem(itemName); 
  };

  const menuItems = [
    { name: "Funktionen", id: "features" },
    { name: "Beispiele", id: "examples" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Preise", id: "pricing" },
  ];

  return (
    // Korrektur 1: Reduziere äußeres Padding für kleine Bildschirme
    <header className="w-full fixed top-5 left-0 right-0 z-20 px-2 sm:px-4 ">
      <div
        // Korrektur 2: Entferne inline 'width' und verwende 'w-[93%]' mit 'lg:max-w-7xl'
        className="bg-white/10 mx-auto backdrop-blur-md border-2 border-white rounded-[100px] flex items-center justify-between relative w-[93%] lg:max-w-7xl"
        style={{
          // width: "93%", // <--- ENTFERNT, da es in Tailwind-Klassen enthalten ist
          padding: "10px 10px 10px 30px",
        }}
      >
        
        {/* Logo-Bereich */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Docline Logo" className="" />
          <span className="text-2xl sm:text-3xl font-semibold text-[#171C35] whitespace-nowrap">
            {/* Korrektur 3: Füge responsive Höhe zum Logo-Text-Bild hinzu */}
            <img src={logoText} alt="Docline" className="h-5 sm:h-6" /> 
          </span>
        </div>

      
        {/* Desktop Navigation und Buttons */}
        <div className="hidden lg:flex items-center gap-6 h-full"> 
          
          <nav className="flex items-center gap-8 text-sm xl:text-base font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScroll(item.id, item.name)}
                className={`transition-colors whitespace-nowrap py-1 ${
                  item.name === activeItem
                    ? 'font-bold text-[#171C35]' 
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
              
              {/* Demo buchen */}
              <button className="px-5 py-3.5 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition whitespace-nowrap">
                Demo buchen
              </button>

              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-3.5 text-base font-medium text-[#171C35] bg-white rounded-full transition cursor-pointer whitespace-nowrap shadow-md"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Toggle (Buttons für Mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 text-sm font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer"
          >
            Login
          </button>
          <button
            className="p-2 rounded-lg hover:bg-white/50 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#171C35]" />
            ) : (
              <Menu className="w-6 h-6 text-[#171C35]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
     {/* Mobile Menu Content */}
{mobileMenuOpen && (
  <div className="lg:hidden absolute top-full left-0 right-0 z-[9998] mt-2 p-4">
    <div className="bg-white/95 backdrop-blur-md rounded-3xl  p-6">
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
          <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] bg-blue-100 hover:bg-blue-200 transition cursor-pointer">
            Demo buchen
          </button>
        </div>
      </nav>
    </div>
  </div>
)}

      </div>
      
      
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