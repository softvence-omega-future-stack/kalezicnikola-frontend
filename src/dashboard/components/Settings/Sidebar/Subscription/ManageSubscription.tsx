import { useState } from "react";
import { useTranslation } from "react-i18next";
import tricjcircle from "../../../../../assets/svgIcon/tickcircle.svg";
import tricjcirclewhite from "../../../../../assets/svgIcon/tick-circle-white.svg";
import type { TabType } from "./SubscriptionOverview";

interface ManageSubscriptionProps {
  setActiveTab: (tab: TabType) => void;
}

export default function ManageSubscription({
  setActiveTab,
}: ManageSubscriptionProps) {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = ["standard", "premium", "enterprise"];

  return (
    <div className="relative overflow-hidden" style={{ fontFamily: "Urbanist, sans-serif" }}>
      <div className="relative z-10">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex bg-white rounded-full p-1 w-fit border border-[#EAECF0] shadow-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 text-sm font-normal w-[131px] rounded-full transition-all duration-300 cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#526FFF] text-white font-medium shadow-md"
                  : "text-[#171c35] hover:bg-gray-50"
              }`}
            >
              {t(
                "dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.billing.monthly"
              )}
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-2.5 text-sm font-normal w-[131px] rounded-full transition-all duration-300 cursor-pointer ${
                billingCycle === "annually"
                  ? "bg-[#526FFF] text-white font-medium shadow-md"
                  : "text-[#171c35] hover:bg-gray-50"
              }`}
            >
              {t(
                "dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.billing.yearly"
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((planKey, i) => {
            const planPath = `dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.plans.${planKey}`;
            const plan = {
              name: t(`${planPath}.name`),
              monthly: t(`${planPath}.monthly`),
              yearly: t(`${planPath}.yearly`),
              features: [
                t(`${planPath}.features.voicebotSetup`),
                t(`${planPath}.features.availability`),
                t(`${planPath}.features.triage`),
                t(`${planPath}.features.minutesIncluded`),
                t(`${planPath}.features.extraMinute`),
                t(`${planPath}.features.multilingual`, { defaultValue: "" }),
                t(`${planPath}.features.support`),
              ].filter(Boolean),
              isPremium: planKey === "premium",
            };

            return (
              <div
                key={i}
                className={`${
                  plan.isPremium
                    ? "bg-[#171C35] border-[#3C4263]"
                    : "bg-[#F3F6F6] border-gray-100"
                } rounded-3xl p-8 border flex flex-col justify-between`}
              >
                {/* Header */}
                <div>
                  <h2
                    className={`text-2xl font-semibold mb-8 ${
                      plan.isPremium ? "text-white" : "text-[#526FFF]"
                    }`}
                  >
                    {plan.name}
                  </h2>

                  {/* Price */}
             {/* Price */}
<div className="mb-8">
  <div className="flex items-baseline gap-1 mb-1 flex-wrap">
    <span
      className={`text-[48px] font-medium ${
        plan.isPremium ? "text-white" : "text-[#526FFF]"
      }`}
    >
      {billingCycle === "monthly" ? plan.monthly : plan.yearly}€
    </span>

    <span
      className={`text-sm ${plan.isPremium ? "text-gray-300" : "text-[#526FFF]"}`}
    >
      {t(
        `dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.billingCycle.perMonth`
      )}
    </span>

    {billingCycle === "annually" && (
      <span
        className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
          plan.isPremium ? "bg-white text-[#171C35]" : "bg-blue-100 text-[#526FFF]"
        }`}
      >
        {t(
          "dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.billingCycle.save"
        )}
      </span>
    )}
  </div>
</div>

                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <img
                        src={plan.isPremium ? tricjcirclewhite : tricjcircle}
                        alt=""
                      />
                      <span
                        className={
                          plan.isPremium
                            ? "text-white text-sm"
                            : "text-[#171c35] text-sm"
                        }
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => setActiveTab("invoices")}
                    className={`w-full py-3 text-base font-medium rounded-full transition-colors shadow-lg border-2 flex justify-center items-center cursor-pointer ${
                      plan.isPremium
                        ? "text-white bg-[#526FFF] border-[#526FFF]"
                        : "text-[#526FFF] bg-white border-[#526FFF]"
                    }`}
                  >
                    {t(
                      "dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscriptionTab.buttons.getStarted"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
