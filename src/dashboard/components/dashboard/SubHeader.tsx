import React from "react";
import { ArrowUpRight } from "lucide-react";

const SummeryCards: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {/* 1️⃣ Big Card */}
      <div className="relative flex-[2] W-[438px] min-w-[260px] h-[150px] bg-[#E5DFF5] p-6 rounded-[28px] overflow-hidden">
        <h3 className="text-base font-medium text-slate-800 mb-3">
          Unreviewed calls
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2 items-center">
            <img
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
            


              src="  https://i.ibb.co.com/0yr7DN5z/un.png"
              alt=""
            />
            <img
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://i.ibb.co.com/9mn5qVXc/uncals-Icon.png"
              alt=""
            />
            <img
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              src="https://i.ibb.co.com/Y7WYkbXN/uncals-Icon3.png"
              alt=""
            />
            <div className="h-9 w-9 bg-slate-800 text-white rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
              6+
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-snug max-w-[180px]">
            Lorem Ipsum is simply dummy text of the printing
          </p>
        </div>

        <div className="absolute bottom-0 right-0">
          <div className="relative w-[70px] h-[70px] bg-transparent">
            <div className="absolute inset-0 bg-[#F3F6F6] rounded-full translate-x-[25%] translate-y-[25%]"></div>
            <div className="absolute bottom-1 right-2 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ Small Card */}
      <div className="relative flex-1 min-w-[200px] bg-[#DCEBFF] p-6 rounded-[28px] overflow-hidden">
        <div className="">
        <h3 className="text-base font-medium text-slate-800 mb-2">Task</h3>
        <span className="text-4xl font-semibold text-slate-900">12</span>

        <div className="absolute bottom-0 right-0">
          <div className="relative w-[70px] h-[70px] bg-transparent">
            <div className="absolute inset-0 bg-[#F3F6F6] rounded-full translate-x-[25%] translate-y-[25%]"></div>
            <div className="absolute bottom-1 right-2 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* 3️⃣ Small Card */}
      <div className="relative flex-1 min-w-[200px] bg-[#FFE7DA] p-6 rounded-[28px] overflow-hidden">
        <h3 className="text-base font-medium text-slate-800 mb-2">
          Requires a call back
        </h3>
        <span className="text-4xl font-semibold text-slate-900">7</span>

        <div className="absolute bottom-0 right-0">
          <div className="relative w-[70px] h-[70px] bg-transparent ">
            <div className="absolute inset-0 bg-[#F3F6F6] rounded-full translate-x-[25%] translate-y-[25%]"></div>
            <div className="absolute bottom-1 right-2 w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummeryCards;
