import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/svgIcon/logo.svg'

const DoclineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 py-2">
  {/* Outer container with border */}
  <div className="mx-4 sm:mx-6 lg:mx-20 my-4 border border-white rounded-full overflow-hidden">
    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center gap-2">
      
          <img src={logo} alt="" />
        
        <span className="text-3xl font-semibold text-[#171C35]">Docline</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center text-base font-medium gap-8">
        <a href="#features" className="text-[#171c35] hover:text-blue-600 transition-colors">
          Features
        </a>
        <a href="#examples" className="text-[#171c35] hover:text-blue-600 transition-colors">
          Examples
        </a>
        <a href="#testimonials" className="text-[#171c35] hover:text-blue-600 transition-colors">
          Testimonials
        </a>
        <a href="#pricing" className="text-[#171c35] hover:text-blue-600 transition-colors">
          Pricing
        </a>
      </nav>

      {/* Desktop Right */}
      <div className="hidden lg:flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50 transition-colors">
          <span className="w-6 h-6 rounded-full bg-gradient-to-b from-black via-red-600 to-yellow-400 flex items-center justify-center text-xs font-bold">
            🇩🇪
          </span>
          <span className="text-sm font-medium text-[#171c35]">EN</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button className="px-5 py-2 border-2 border-[#171C35] rounded-full text-base font-medium text-[#171c35] cursor-pointer hover:bg-white/50 transition-colors">
          Book Demo
        </button>

        <button className="px-6 py-3 text-base font-medium text-[#171c35] bg-white rounded-full cursor-pointer  hover:text-blue-600 transition-colors">
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 rounded-lg hover:bg-white/50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-[#171c35]" /> : <Menu className="w-6 h-6 text-[#171c35]" />}
      </button>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="lg:hidden py-4 border-t border-gray-200">
        <nav className="flex flex-col gap-4">
          <a href="#features" className="text-[#171c35] hover:text-blue-600 transition-colors py-2">
            Features
          </a>
          <a href="#examples" className="text-[#171c35] hover:text-blue-600 transition-colors py-2">
            Examples
          </a>
          <a href="#testimonials" className="text-[#171c35] hover:text-blue-600 transition-colors py-2">
            Testimonials
          </a>
          <a href="#pricing" className="text-[#171c35] hover:text-blue-600 transition-colors py-2">
            Pricing
          </a>

          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50 transition-colors justify-center">
              <span className="w-6 h-6 rounded-full bg-gradient-to-b from-black via-red-600 to-yellow-400 flex items-center justify-center text-xs font-bold">
                🇩🇪
              </span>
              <span className="text-sm font-medium text-[#171c35]">EN</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button className="px-5 py-2 border-2 border-gray-300 rounded-full text-base font-medium text-[#171c35] hover:bg-white/50 transition-colors">
              Book Demo
            </button>

            <button className="px-5 py-2 text-base font-medium text-[#171c35] hover:text-blue-600 bg-white rounded-full transition-colors">
              Login
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