import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import UkFlag from '../../../assets/svgIcon/Ellipse 2170.svg';
import DeFlag from '../../../assets/svgIcon/DEFlag.svg';
import arrow from '../../../assets/svgIcon/langselect.svg';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<'EN' | 'DE'>(
    i18n.language === "de" ? 'DE' : 'EN'
  );

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (lang: 'EN' | 'DE') => {
    setLanguage(lang);

    if (lang === "EN") i18n.changeLanguage("en");
    if (lang === "DE") i18n.changeLanguage("de");

    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div ref={headerRef} style={{ fontFamily: 'Urbanist, sans-serif' }} className="relative">
      {/* Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center text-[#111A2D] hover:text-indigo-600 transition-colors border-gray-200 h-10 cursor-pointer"
      >
        <img
          src={language === 'EN' ? UkFlag : DeFlag}
          alt={language}
          className="w-6 h-6 rounded-full mr-1"
        />
        <span className="text-sm font-medium mr-1">{language}</span>
        <img
          src={arrow}
          alt="dropdown"
          className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-1 w-20 rounded-md z-50 bg-white shadow-md">
          {language === 'EN' ? (
            <button
              onClick={() => handleSelect('DE')}
              className="flex items-center px-3 py-2 hover:bg-gray-100 w-full"
            >
              <img src={DeFlag} alt="DE" className="w-5 h-5 rounded-full mr-2" />
              DE
            </button>
          ) : (
            <button
              onClick={() => handleSelect('EN')}
              className="flex items-center px-3 py-2 hover:bg-gray-100 w-full"
            >
              <img src={UkFlag} alt="EN" className="w-5 h-5 rounded-full mr-2" />
              EN
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
