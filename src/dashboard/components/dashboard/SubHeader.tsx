import React from "react";
import { ArrowUpRight } from "lucide-react";

const SummeryCards: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 1st Card - slightly wider */}
      <div className="flex-1 min-w-[220px] sm:basis-[36%] bg-purple-100 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-sm text-purple-900 mb-1">Unreviewed calls</div>
          <div className="flex -space-x-2 mb-2">
            <img className="h-10 w-10 rounded-full" src="https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png" alt="" />
            <img className="h-10 w-10 rounded-full" src="https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png" alt="" />
            <img className="h-10 w-10 rounded-full" src="https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png" alt="" />
            <img className="h-10 w-10 rounded-full" src="https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png" alt="" />
            <div className="h-10 w-10 bg-gray-800 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
              6+
            </div>
          </div>
          <div className="text-xs text-purple-700">
            Lorem Ipsum is simply dummy text of the printing
          </div>
        </div>
        <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      {/* 2nd Card */}
      <div className="flex-1 min-w-[200px] sm:basis-[30%] bg-blue-100 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-sm text-blue-900 mb-1">Task</div>
          <div className="text-4xl font-light text-blue-900">12</div>
        </div>
        <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3rd Card */}
      <div className="flex-1 min-w-[200px] sm:basis-[30%] bg-red-100 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-sm text-red-900 mb-1">Requires a call back</div>
          <div className="text-4xl font-light text-red-900">7</div>
        </div>
        <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SummeryCards;
