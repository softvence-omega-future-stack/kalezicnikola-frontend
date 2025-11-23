import  { useState } from "react";
import { ChevronDown } from "lucide-react";

const PriorityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Priorities");

  const priorities = ["High", "Medium", "Low"];

  const handleSelect = (priority:string) => {
    setSelected(priority);
    setIsOpen(false); // dropdown বন্ধ করবে
  };

  return (
    <div className="relative inline-block">
      <button
        className="px-4 w-full md:w-auto py-2 bg-[#F3F6F6] border border-gray-300 rounded-[8px] text-sm font-semibold text-[#111a2d] hover:bg-gray-50 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {priorities.map((priority) => (
            <li
              key={priority}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(priority)}
            >
              {priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriorityDropdown;
