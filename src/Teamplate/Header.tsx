// DoclineHeader.tsx
// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/svgIcon/logo.svg";
// import { useNavigate } from "react-router-dom";
// import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";


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




import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/svgIcon/logo.svg";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/dashboard/components/dashboard/LanguageSelector";

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Smooth Scroll Function
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
    // Header positioning: Top 20px, Fixed, takes up full width for padding
    <header className="w-full fixed top-[20px] left-0 right-0 z-20 px-4">
      {/* Main Header Shape Container */}
      <div
        className="mx-auto bg-white/50 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-[100px] flex items-center justify-between relative"
        style={{
          width: "1290px",
          padding: "10px 10px 10px 30px",
        }}
      >
        {/* Left Side: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Docline Logo" className="w-8 h-10" />
          <span className="text-2xl sm:text-3xl font-semibold text-[#171C35]">
            Docline
          </span>
        </div>

        {/* Right Side Container */}
        <div className="hidden lg:flex items-center" style={{ gap: "373px" }}>
          {/* Desktop Navigation Links */}
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

          {/* Language Selector & Buttons */}
          <div className="flex items-center gap-2">
            <LanguageSelector />

            {/* Buttons Container */}
            <div className="flex items-center gap-3 ml-2 rounded-full border border-gray-100 p-1">
              {/* Demo buchen Button */}
              <button className="px-5 py-2 rounded-full text-base font-medium text-[#171C35] bg-blue-100 hover:bg-blue-200 transition whitespace-nowrap">
                Demo buchen
              </button>

              {/* Login Button */}
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 text-base font-medium text-[#171C35] bg-white rounded-full hover:text-blue-600 transition cursor-pointer whitespace-nowrap"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
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

        {/* Mobile Menu Dropdown */}
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
    </header>
  );
};

export default DoclineHeader;
