import churnBoxImg from '../../../assets/svgIcon/churnBoxImg.svg'
const Customer = () => {
  return (
    <div className="flex justify-center">
      {/* Customer Acquisition vs Churn */}
      <div className="bg-white rounded-3xl p-6 w-full max-w-md sm:max-w-lg md:w-[388px] py-4 pb-14">
        <h3 className="text-xl font-semibold text-headingBlack mb-6 text-center md:text-left">
          Customer Acquisition vs Churn
        </h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6 sm:gap-8 h-auto sm:h-52 mb-6">
          {/* Churn Box */}
          <div className="flex flex-col items-center">
            {/* Percentage on top */}
            <p className="text-base font-semibold text-headingBlack mb-1">50%</p>

            {/* Box */}
            <div className="">
              {/* <div
                className="absolute inset-0 bg-[#D0E1F5]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 20px)",
                }}
              ></div> */}
              <img src={churnBoxImg} alt="" />
            </div>
            <p className="text-base font-semibold text-headingBlack">Churn</p>
          </div>

          {/* Acquisition Box */}
          <div className="flex flex-col items-center">
            {/* Percentage on top */}
            <p className="text-base font-semibold text-headingBlack mb-1">90%</p>

            {/* Box */}
            <div className="w-28 md:w-24 h-32 bg-[#BDC8FF] rounded-3xl mb-2"></div>
            <p className="text-base font-semibold text-headingBlack">Acquisition</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
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
