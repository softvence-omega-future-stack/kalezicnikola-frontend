import { useState } from 'react';
import tricjcircle from '../../../../../assets/svgIcon/tickcircle.svg';
import tricjcirclewhite from '../../../../../assets/svgIcon/tick-circle-white.svg';
import type { TabType } from './SubscriptionOverview';


// ✅ FIXED TYPE
interface ManageSubscriptionProps {
  setActiveTab: (tab:TabType) => void;
}

export default function ManageSubscription({ setActiveTab }: ManageSubscriptionProps) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Standard',
      monthly: 399,
      yearly: 339,
      features: [
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow trade alerts',
        // '€0.35 per extra minute',
        // 'Email Support',
      ],
      color: '#526FFF',
      isPremium: false,
    },
    {
      name: 'Premium',
      monthly: 899,
      yearly: 765,
      features: [
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow trade',
        'Average of 2-5 easy to follow trade alerts per week',
        'Average of 2-5 easy to follow',
        // '€0.30 per extra minute',
        // 'Multilingual (25+ languages)',
        // 'Prioritized email and live chat support',
      ],
      color: '#171C35',
      isPremium: true,
    },
    {
      name: 'Enterprise',
      monthly: 1299,
      yearly: 1105,
      features: [
        // 'AI Voicebot setup & configuration',
        // '24/7 availability & call handling',
        // 'Intelligent triage & task creation',
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow trade alerts',
        'Average of 2-5 easy to follow',
        'Average of 2-5 easy to follow trade alerts',
      ],
      color: '#526FFF',
      isPremium: false,
    },
  ];

  return (
    <div className="relative overflow-hidden" style={{ fontFamily: "Urbanist, sans-serif" }}>
      <div className="relative z-10">
        
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
  <div className="inline-flex bg-white w-[266px] rounded-full p-1 border border-gray-200 shadow-sm">
    
    {/* Monthly Button */}
    <button
      onClick={() => setBillingCycle('monthly')}
      className={`px-6 py-2.5 w-[131px] text-sm font-normal rounded-full transition-colors cursor-pointer
        ${billingCycle === 'monthly'
          ? 'bg-[#526FFF] text-white font-medium shadow-md'
          : 'text-[#171c35] hover:bg-gray-50'
        }`}
    >
      Monthly
    </button>

    {/* Yearly Button */}
    <button
      onClick={() => setBillingCycle('annually')}
      className={`px-6 py-2.5 text-sm font-normal w-[131px] rounded-full transition-colors cursor-pointer
        ${billingCycle === 'annually'
          ? 'bg-[#526FFF] text-white font-medium shadow-md'
          : 'text-[#171c35] hover:bg-gray-50'
        }`}
    >
      Yearly
    </button>

  </div>
</div>


        {/* Pricing Cards */}
        <div style={{ fontFamily: 'Urbanist, sans-serif' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${
                plan.isPremium ? 'bg-[#171C35] border-[#3C4263]' : 'bg-[#F3F6F6] border-gray-100'
              } rounded-3xl p-8 border flex flex-col justify-between`}
            >
              
              {/* Header */}
              <div>
                <h2 className={`text-2xl font-semibold mb-8 ${plan.isPremium ? 'text-white' : 'text-[#526FFF]'}`}>
                  {plan.name}
                </h2>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                    <span
                      className={`text-[48px] font-medium ${
                        plan.isPremium ? 'text-white' : `text-[${plan.color}]`
                      }`}
                    >
                      {billingCycle === 'monthly' ? plan.monthly : plan.yearly}€
                    </span>

                    <span className={`text-sm ${plan.isPremium ? 'text-gray-300' : 'text-[#526FFF]'}`}>
                      /{billingCycle === 'monthly' ? 'month' : 'month'}
                    </span>

                    {billingCycle === 'annually' && (
                      <span
                        className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          plan.isPremium ? 'bg-white text-[#171C35]' : 'bg-blue-100 text-[#526FFF]'
                        }`}
                      >
                        Save 15%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img src={plan.isPremium ? tricjcirclewhite : tricjcircle} alt="" />
                    <span className={plan.isPremium ? 'text-white text-sm' : 'text-[#171c35] text-sm'}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="mt-auto">
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full py-3 text-base font-medium rounded-full transition-colors shadow-lg border-2 flex justify-center items-center cursor-pointer ${
                    plan.isPremium
                      ? 'text-white bg-[#526FFF] border-[#526FFF]'
                      : `text-[${plan.color}] bg-white border-[${plan.color}]`
                  }`}
                >
                  GET STARTED
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
