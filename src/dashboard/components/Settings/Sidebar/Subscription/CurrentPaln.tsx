import tricjcircle from "../../../../../assets/svgIcon/tickcircle.svg";
import type { TabType } from "./SubscriptionOverview";

interface ManageSubscriptionProps {
  setActiveTab: (tab: TabType) => void;
}

const CURRENT_PLAN_DATA = {
  name: "Professional",
  price: 899,
  billingCycle: "Month",
  totalMinutes: 4000,
  minutesUsed: 1200,
  subscriptionEnd: "12 Mar 2026",
};

// --- CALCULATIONS ---
const minutesRemaining =
  CURRENT_PLAN_DATA.totalMinutes - CURRENT_PLAN_DATA.minutesUsed;

const usagePercentage =
  (CURRENT_PLAN_DATA.minutesUsed / CURRENT_PLAN_DATA.totalMinutes) * 100;

export default function CurrentPlan({ setActiveTab }: ManageSubscriptionProps) {
  const plan = CURRENT_PLAN_DATA;

  const handleCancel = () => {
    alert("Cancel Current Plan button clicked!");
  };

  return (
    <div>
      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#171c35]">
              Current Plan
            </h2>
            <span className="px-4 py-1.5 text-base text-[#526FFF] border border-[#526FFF] rounded-full bg-[#DCE2FF]">
              Professional
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-[#171c35]">
              Payment method
            </span>
            <button>
              <img
                src="https://i.ibb.co/shK6hvT/strip-Icon.png"
                alt="Stripe"
                className="h-6"
              />
            </button>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 text-[#171C35] text-base">
            <span className="text-sm text-[#171c35]">Started From</span>
            <span className="text-4xl font-semibold text-[#171c35]">899€</span>
            <span className="text-sm text-gray-600">/Per Month</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <img src={tricjcircle} alt="" />
            <span className="text-base text-[#111A2D]">
              Average of 2-5 easy to follow trade alerts
            </span>
          </div>
          <div className="flex items-center gap-3">
            <img src={tricjcircle} alt="" />
            <span className="text-base text-[#171c35]">
              Average of 2-5 easy to follow trade
            </span>
          </div>
          <div className="flex items-center gap-3">
            <img src={tricjcircle} alt="" />
            <span className="text-base text-[#171c35]">
              Average of 2-5 easy to follow trade alerts per week
            </span>
          </div>
        </div>

        {/* Credits Card */}
        <div className="border border-[#E8E8E8] rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <span className="px-4 py-1.5 text-base text-[#008933] bg-[#0089331A] rounded-full font-medium">
              Active
            </span>

            <div className="text-right flex items-center gap-2">
              <p className="text-sm text-[#171c35] mb-1">
                Subscription end date:
              </p>
              <p className="text-sm font-medium text-[#A052FF] bg-[#A052FF1A] px-4 py-2 rounded-[8px]">
                {plan.subscriptionEnd}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {/* Progress Circle */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#526FFF"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${
                      (usagePercentage * (2 * Math.PI * 36)) / 100
                    } ${2 * Math.PI * 36}`}
                    strokeLinecap="round"
                  />
                </svg>

                <span className="absolute text-sm font-bold text-[#171C35]">
                  {Math.round(usagePercentage)}%
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#171c35] mb-1">
                  {minutesRemaining} minutes left
                </h3>
                <p className="text-base text-[#171C35]">
                  {plan.minutesUsed}/{plan.totalMinutes} minutes used
                </p>
              </div>
            </div>

            <div className="text-2xl font-semibold text-[#171c35]">0.00€</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleCancel}
            className="w-full px-6 py-3 text-sm font-medium text-[#171c35] bg-white border border-gray-300 rounded-[8px] cursor-pointer"
          >
            Cancel Current Plan
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className="w-full px-6 py-3 text-sm font-medium text-white bg-[#526FFF] rounded-[8px] cursor-pointer"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
