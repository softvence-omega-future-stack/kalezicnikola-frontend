import React from 'react';
import { useTranslation } from 'react-i18next';
import trickcircle from '../../../assets/svgIcon/tickcircle.svg';
import trickcirclewhite from '../../../assets/svgIcon/tick-circle-white.svg';

interface Plan {
  name: string;
  price: string;
  billing: string;
  billingNote: string;
  features: string[];
  button: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonTextColor: string;
}

const SubscriptionPlan: React.FC = () => {
  const { t } = useTranslation();

  // Get plans from i18n and cast to Plan[]
  const plans: Plan[] = t(
    'adminDashboard.routes.bellingSubs.subscriptionPlans',
    { returnObjects: true }
  ) as Plan[];

  return (
    <div className="bg-white rounded-xl md:rounded-3xl px-4 md:px-6 py-4">
      <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pb-5 pt-2">
        {t('adminDashboard.routes.bellingSubs.topSection.title', 'Subscription Plans')}
      </h1>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isDark = plan.textColor === 'white';
          const tickIcon = isDark ? trickcirclewhite : trickcircle;

          return (
            <div
              key={index}
              className="relative rounded-[20px] p-4 md:p-8 flex flex-col justify-between"
              style={{ backgroundColor: plan.bgColor }}
            >
              {/* Title */}
              <h2 className="text-2xl font-bold mb-8" style={{ color: plan.textColor }}>
                {plan.name}
              </h2>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                  <span className="text-[48px] font-medium" style={{ color: plan.textColor }}>
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: isDark ? '#ccc' : plan.textColor }}>
                    {plan.billing}
                  </span>
                  <p className="text-sm text-right ml-20" style={{ color: isDark ? '#ccc' : plan.textColor }}>
                    {plan.billingNote}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={tickIcon} alt="" />
                    <span className="text-sm" style={{ color: isDark ? 'white' : '#171c35' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button fixed at bottom */}
              <div className="mt-auto">
                <button
                  className="w-full px-6 py-3 text-base font-semibold uppercase rounded-full focus:outline-none transition-colors cursor-pointer"
                  style={{
                    color: plan.buttonTextColor,
                    backgroundColor: plan.buttonBg,
                    border: plan.buttonBg === 'white' ? `2px solid ${plan.buttonTextColor}` : 'none',
                  }}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
