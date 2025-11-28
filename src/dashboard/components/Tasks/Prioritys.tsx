import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const PriorityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Priority");
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const priorities = ["High", "Medium", "Low"];

  const handleSelect = (priority: string) => {
    setSelected(priority);
    setIsOpen(false);
  };

  // Check if dropdown should open upward
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // If not enough space below (less than 200px) and more space above, open upward
      setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        className="px-4 py-2 bg-[#F3F6F6] border border-gray-300 w-full md:w-auto rounded-xl text-sm font-semibold text-[#111a2d] flex items-center justify-between md:justify-center cursor-pointer gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul 
          className={`absolute left-0 right-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto ${
            dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
          style={{ position: 'absolute', zIndex: 99999 }}
        >
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] first:rounded-t-xl transition-colors"
            onClick={() => handleSelect("All Priority")}
          >
            All Priority
          </li>
          {priorities.map((priority) => (
            <li
              key={priority}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] last:rounded-b-xl transition-colors"
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