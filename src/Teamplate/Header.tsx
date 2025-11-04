import React, { useState } from "react";
import { Menu, X,} from "lucide-react";
import logo from "../assets/svgIcon/logo.svg";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

 

  return (
   <header className="w-full bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 fixed  top-0 left-0 right-0 z-20">
  <div className="border border-gray-200  backdrop-blur-sm rounded-full px-4   py-4 flex items-center justify-between xl:mx-7 ">
    {/* Top Header */}
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Docline Logo" className="w-8 h-10" />
        <span className="text-2xl sm:text-3xl font-semibold text-[#171C35]">
          Docline
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-medium flex-wrap">
        {["Features", "Examples", "Testimonials", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#171C35] hover:text-blue-600 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center gap-4 ">
        <LanguageSelector />
        <button className="px-5 py-2 border-2 border-[#171C35] rounded-full text-base font-medium text-[#171C35] hover:bg-white/50 transition">
          Book Demo
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 text-base font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer"
        >
          Login
        </button>
      </div>

      {/* Mobile Menu */}
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
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#171C35]" /> : <Menu className="w-6 h-6 text-[#171C35]" />}
        </button>
      </div>
    </div>

    {/* Mobile Dropdown Menu */}
    {mobileMenuOpen && (
      <div className="lg:hidden px-6 py-4 border-t border-gray-200 bg-white/70 backdrop-blur-md">
        <nav className="flex flex-col gap-4">
          {["Features", "Examples", "Testimonials", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#171C35] hover:text-blue-600 transition-colors py-1"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <button className="px-5 py-2 border-2 border-[#171C35] rounded-full text-base font-medium text-[#171C35] hover:bg-white/60 transition">
              Book Demo
            </button>
          </div>
        </nav>
      </div>
    )}
  </div>
</header>

  );
};

export default DoclineHeader;
