import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/svgIcon/logo.svg";
import ShadowBox from "./ShadowBox";

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setHoveredItem] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Preise");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="w-full fixed top-5 left-0 right-0 z-20 px-4">
      <div
        className="mx-auto backdrop-blur-xl border-2 border-white rounded-[100px] flex items-center justify-between relative overflow-hidden transition-all duration-300"
        style={{
          width: "93%",
          padding: "10px 10px 10px 30px",
          background: isScrolled 
            ? "rgba(255, 255, 255, 0.15)" 
            : "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
            : "0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 60%)",
          }}
        />

        <div
          className="flex items-center gap-2 cursor-pointer relative z-10"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Docline Logo" className="w-8 h-10" />
          <span className="text-2xl sm:text-3xl font-semibold text-[#171C35] whitespace-nowrap">
            Docline
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 h-full relative z-10">
          <nav className="flex items-center gap-4 text-sm xl:text-base font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScroll(item.id, item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`transition-all duration-300 whitespace-nowrap py-1 px-3 rounded-lg relative overflow-hidden ${
                  item.name === activeItem
                    ? "font-bold text-[#171C35]"
                    : "text-[#171C35]"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-2">
            <LanguageSelector />

            <div className="flex items-center gap-3">
              <button
                onMouseEnter={() => setHoveredButton("demo")}
                onMouseLeave={() => setHoveredButton(null)}
                className="px-5 py-3.5 rounded-full text-base font-medium text-[#171C35] border border-[#171C35] transition-all duration-300 whitespace-nowrap relative overflow-hidden"
                style={{
                  background:
                    hoveredButton === "demo"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  transform: hoveredButton === "demo" ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredButton === "demo"
                      ? "0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
                      : "none",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 60%)",
                  }}
                />
                <span className="relative z-10">Demo buchen</span>
              </button>

              <button
                onClick={() => navigate("/login")}
                onMouseEnter={() => setHoveredButton("login")}
                onMouseLeave={() => setHoveredButton(null)}
                className="px-5 py-3.5 text-base font-medium text-[#171C35] bg-white rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap relative overflow-hidden"
                style={{
                  transform: hoveredButton === "login" ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredButton === "login"
                      ? "0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.5)"
                      : "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                {hoveredButton === "login" && (
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(40, 58, 255, 0.15) 0%, transparent 70%)",
                    }}
                  />
                )}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, transparent 60%)",
                  }}
                />
                <span className="relative z-10">Login</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden relative z-10">
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
          <div
            className="lg:hidden absolute top-full left-4 right-4 z-10 mt-2 rounded-3xl shadow-xl p-6 overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, transparent 60%)",
              }}
            />
            <nav className="flex flex-col gap-4 relative z-10">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.id, item.name)}
                  className="text-[#171C35] hover:text-blue-600 transition-colors text-left py-1"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] bg-blue-100 hover:bg-blue-200 transition">
                  Demo buchen
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
