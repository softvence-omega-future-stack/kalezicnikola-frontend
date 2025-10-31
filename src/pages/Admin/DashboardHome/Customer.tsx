const Customer = () => {
  return (
    <div>
      {/* Customer Acquisition vs Churn */}
      <div className="bg-white rounded-3xl p-6 w-[388px] py-4 pb-14 ">
        <h3 className="text-xl font-semibold text-[#171C35] mb-6">
          Customer Acquisition vs Churn
        </h3>

        <div className="flex items-end justify-center gap-8 h-52 mb-6">
          {/* Churn Box */}
          <div className="flex flex-col items-center">
            {/* Percentage on top */}
            <p className="text-base font-semibold text-[#171C35] mb-1">50%</p>

            {/* Box */}
            <div className="w-24 h-24 bg-[#D0E1F5] rounded-3xl relative overflow-hidden mb-2">
              <div
                className="absolute inset-0 bg-[#D0E1F5]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 20px)",
                }}
              ></div>
            </div>
            <p className="text-base font-semibold text-[#171C35]">Churn</p>
          </div>

          {/* Acquisition Box */}
          <div className="flex flex-col items-center">
            {/* Percentage on top */}
            <p className="text-base font-semibold text-[#171C35] mb-1">90%</p>

            {/* Box */}
            <div className="w-24 h-32 bg-[#BDC8FF] rounded-3xl mb-2"></div>
            <p className="text-base font-semibold text-[#171C35]">Acquisition</p>
          </div>
        </div>

        {/* Legend */}
        <div className=" flex items-center justify-between ">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span>50% Churn</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <span>90% Acquisition</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;