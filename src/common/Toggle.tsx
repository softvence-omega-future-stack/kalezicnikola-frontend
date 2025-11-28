import React from "react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
        enabled ? "bg-[#526FFF]" : "bg-gray-200"
      } relative`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 absolute top-0.5 ${
          enabled ? "right-0.5" : "left-0.5"
        }`}
      ></span>
    </button>
  );
};

export default Toggle;
