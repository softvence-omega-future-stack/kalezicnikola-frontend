import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface StatusDropdownProps {
  onSelect: (status: string) => void;
  selected: string;
}

const StatusDropdown = ({ onSelect, selected }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses = [
    { id: "all", label: "All Status" },
    { id: "todo", label: "To Do" },
    { id: "inprogress", label: "In Progress" },
    { id: "done", label: "Done" },
  ];

  const getSelectedLabel = () => {
    const status = statuses.find(s => s.id === selected);
    return status?.label || "All Status";
  };

  const handleSelect = (statusId: string) => {
    onSelect(statusId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <span>{getSelectedLabel()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-[9999]">
          {statuses.map((status) => (
            <li
              key={status.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] first:rounded-t-xl last:rounded-b-xl transition-colors ${
                selected === status.id ? 'bg-blue-50 font-semibold' : ''
              }`}
              onClick={() => handleSelect(status.id)}
            >
              {status.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { useTranslation } from "react-i18next";

// const StatusDropdown = () => {
//   const { t } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(t("dashboard.routes.taskList.status.all"));
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const statuses = [
//     { id: "todo", label: t("dashboard.routes.taskList.status.todo") },
//     { id: "inprogress", label: t("dashboard.routes.taskList.status.inprogress") },
//     { id: "done", label: t("dashboard.routes.taskList.status.done") },
//   ];

//   const handleSelect = (status: string) => {
//     setSelected(status);
//     setIsOpen(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
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
//           className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg"
//           style={{ position: 'absolute', zIndex: 9999 }}
//         >
//           {statuses.map((status) => (
//             <li
//               key={status.id}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-[#111a2d] first:rounded-t-xl last:rounded-b-xl transition-colors"
//               onClick={() => handleSelect(status.label)}
//             >
//               {status.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StatusDropdown;
