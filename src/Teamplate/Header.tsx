import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svgIcon/logo.svg";
import ShadowBox from "./ShadowBox";

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { name: "Funktionen", id: "features" },
    { name: "Beispiele", id: "examples" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Preise", id: "pricing" },
  ];

  return (
    <header className="w-full fixed top-5 left-0 right-0 z-20 px-4 ">
      <div
        className="mx-auto bg-white/10   border-2 border-white  rounded-[100px] flex items-center justify-between relative"
        style={{
          width: "1290px",
          padding: "10px 10px 10px 30px",
        }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Docline Logo" className="w-8 h-10" />
          <span className="text-2xl sm:text-3xl font-semibold text-[#171C35]">
            Docline
          </span>
        </div>

        <div className="hidden lg:flex items-center" style={{ gap: "373px" }}>
          <nav className="flex items-center gap-8 text-sm xl:text-base font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScroll(item.id)}
                className="text-[#171C35] hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />

            <div className="flex items-center gap-3 ml-2 rounded-full border border-gray-100 p-1">
              <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] bg-blue-100 hover:bg-blue-200 transition whitespace-nowrap">
                Demo buchen
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 text-base font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer whitespace-nowrap"
              >
                Login
              </button>
            </div>
          </div>

          <p className=" absolute top-0 right-0">a</p>
          <p className=" absolute bottom-0 left-0">a</p>
        </div>

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

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 z-10 mt-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.id)}
                  className="text-[#171C35] hover:text-blue-600 transition-colors text-left py-1"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] bg-blue-100 hover:bg-blue-200 transition">
                  Book Demo
                </button>
              </div>
            </nav>
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
