import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface NumberDropdownProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

const NumberDropdown: React.FC<NumberDropdownProps> = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  placeholder = "Select value",
}) => {
  const [open, setOpen] = useState(false);

  const increment = () => {
    onChange(Math.min(value + step, max));
  };

  const decrement = () => {
    onChange(Math.max(value - step, min));
  };

  return (
    <div className="relative w-40">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {value || placeholder}
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown content */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 flex justify-between items-center px-4 py-2">
          <button
            type="button"
            onClick={decrement}
            className="p-1 border rounded hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>

          <span className="text-gray-700 font-medium">{value}</span>

          <button
            type="button"
            onClick={increment}
            className="p-1 border rounded hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberDropdown;
