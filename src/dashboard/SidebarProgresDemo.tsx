import  { useState } from 'react';

const SidebarProgressDemo = () => {
  const totalMinutes = 1500;
  const [usedMinutes, setUsedMinutes] = useState(1035);

  const percentage = (usedMinutes / totalMinutes) * 100;

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-2">Upgrade Progress</h3>
      <p className="mb-2">{usedMinutes} Minutes Used</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className="bg-[#111A2D] h-2 rounded-full transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mb-4">{totalMinutes - usedMinutes} Minutes Left</p>

      {/* Slider to change progress */}
      <input
        type="range"
        min={0}
        max={totalMinutes}
        value={usedMinutes}
        onChange={(e) => setUsedMinutes(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default SidebarProgressDemo;
