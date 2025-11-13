import { useState } from 'react';
import tricjcircle from '../../../../../assets/svgIcon/tickcircle.svg';
import tricjcirclewhite from '../../../../../assets/svgIcon/tick-circle-white.svg';

export default function ManageSubscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const plans = [
    {
      name: 'Basic Plan',
      monthly: 399,
      annually: 399 * 12 * 0.9, // 10% discount for yearly
    },
    {
      name: 'Professional',
      monthly: 899,
      annually: 899 * 12 * 0.9,
    },
    {
      name: 'Enterprise',
      monthly: 1299,
      annually: 1299 * 12 * 0.9,
    },
  ];

  const activePlan = 'Professional';

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-full p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-8 py-2.5 text-sm font-normal rounded-full transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-[#526FFF] text-white'
                : 'text-[#171c35] hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-8 py-2.5 text-sm font-normal rounded-full transition-colors ${
              billingCycle === 'annually'
                ? 'bg-[#526FFF] text-white'
                : 'text-[#171c35] hover:bg-gray-50'
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthly : plan.annually;
          const period = billingCycle === 'monthly' ? 'month' : 'year';
          const isActive = plan.name === activePlan;

          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${isActive ? 'bg-gray-900 text-white shadow-lg' : 'bg-[#F3F6F6]'}`}
            >
              <h2 className={`text-xl font-semibold mb-8 ${isActive ? 'text-white' : 'text-[#526FFF]'}`}>
                {plan.name}
              </h2>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-[36px] font-medium ${isActive ? 'text-white' : 'text-[#526FFF]'}`}>
                    {price.toFixed(0)}€
                  </span>
                  <span className={`${isActive ? 'text-gray-400' : 'text-sm text-[#526FFF]'}`}>
                    /{period}
                  </span>
                </div>
                <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-[#171c35]'} text-right`}>
                  Full Price
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={isActive ? tricjcirclewhite : tricjcircle} alt="" />
                    <span className={`${isActive ? 'text-white' : 'text-[#171c35]'}`}>
                      Average of 2-5 easy to follow trade alerts
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full px-6 py-3 rounded-full font-medium transition-colors ${
                  isActive
                    ? 'bg-[#526FFF] text-white'
                    : 'bg-white border-2 border-[#526FFF] text-[#526FFF]'
                }`}
              >
                {isActive ? 'Active Plan' : 'Upgrade Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
