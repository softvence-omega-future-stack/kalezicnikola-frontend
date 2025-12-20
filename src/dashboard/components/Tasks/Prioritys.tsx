import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface PriorityDropdownProps {
  onSelect: (priority: string) => void;
  selected: string;
}

const PriorityDropdown = ({ onSelect, selected }: PriorityDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const priorities = [
    { id: "all", label: "All Priority" },
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ];

  const getSelectedLabel = () => {
    const priority = priorities.find(p => p.id === selected);
    return priority?.label || "All Priority";
  };

  const handleSelect = (priorityId: string) => {
    onSelect(priorityId);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        className="px-4 py-2 bg-[#F3F6F6] border border-gray-300 w-full md:w-auto rounded-xl text-sm font-semibold text-[#111a2d] flex items-center justify-between md:justify-center cursor-pointer gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getSelectedLabel()}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul 
          className={`absolute left-0 right-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto z-[99999] ${
            dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {priorities.map((priority) => (
            <li
              key={priority.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] first:rounded-t-xl last:rounded-b-xl transition-colors ${
                selected === priority.id ? 'bg-blue-50 font-semibold' : ''
              }`}
              onClick={() => handleSelect(priority.id)}
            >
              {priority.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriorityDropdown;



// import { useEffect, useRef, useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { useTranslation } from "react-i18next";

// const PriorityDropdown = () => {
//   const { t } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(t("dashboard.routes.taskList.priority.all"));
//   const [dropUp, setDropUp] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const priorities = ["high", "medium", "low"];

//   const handleSelect = (priorityKey: string) => {
//     setSelected(t(`dashboard.routes.taskList.priority.${priorityKey}`));
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (isOpen && dropdownRef.current) {
//       const rect = dropdownRef.current.getBoundingClientRect();
//       const spaceBelow = window.innerHeight - rect.bottom;
//       const spaceAbove = rect.top;
//       setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <button
//         className="px-4 py-2 bg-[#F3F6F6] border border-gray-300 w-full md:w-auto rounded-xl text-sm font-semibold text-[#111a2d] flex items-center justify-between md:justify-center cursor-pointer gap-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{selected}</span>
//         <ChevronDown 
//           className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       {isOpen && (
//         <ul 
//           className={`absolute left-0 right-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto ${
//             dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
//           }`}
//           style={{ position: 'absolute', zIndex: 99999 }}
//         >
//           <li
//             className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] first:rounded-t-xl transition-colors"
//             onClick={() => handleSelect("all")}
//           >
//             {t("dashboard.routes.taskList.priority.all")}
//           </li>
//           {priorities.map((priority) => (
//             <li
//               key={priority}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] last:rounded-b-xl transition-colors"
//               onClick={() => handleSelect(priority)}
//             >
//               {t(`dashboard.routes.taskList.priority.${priority}`)}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PriorityDropdown;
