import { useState, useEffect } from "react";
import CurrentPaln from "./CurrentPaln";
import ManageSubscription from "./ManageSubscription";
import Invoices from "./Invoices";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type TabType = "current-plan" | "manage" | "invoices";

interface Props {
  initialTab?: TabType;
}

export default function SubscriptionOverview({
  initialTab = "current-plan",
}: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("manage");
  const location = useLocation();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab") as TabType;
    const subtab = urlParams.get("subtab") as TabType;

    if (location.search) {
      setActiveTab(subtab || tab || "manage");
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4">
      <h1 className="text-lg font-semibold text-[#171c35] mb-6">
        {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.title")}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-2 bg-[#FAFAFA] rounded-2xl py-3 px-4">
        <button
          onClick={() => setActiveTab("current-plan")}
          className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
            activeTab === "current-plan" ? "bg-[#DCE2FF] text-[#171c35]" : ""
          }`}
        >
          {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.currentPlan")}
        </button>

        <button
          onClick={() => setActiveTab("manage")}
          className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
            activeTab === "manage" ? "bg-[#DCE2FF] text-[#171c35]" : ""
          }`}
        >
          {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.manageSubscription")}
        </button>

        <button
          onClick={() => setActiveTab("invoices")}
          className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
            activeTab === "invoices" ? "bg-[#DCE2FF] text-[#171c35]" : ""
          }`}
        >
          {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoices")}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl p-3 md:p-2 cursor-pointer">
        {activeTab === "current-plan" && (
          <CurrentPaln setActiveTab={setActiveTab} />
        )}
        {activeTab === "manage" && (
          <ManageSubscription setActiveTab={setActiveTab} />
        )}
        {activeTab === "invoices" && <Invoices />}
      </div>
    </div>
  );
}


// import { useState } from 'react';
// import CurrentPaln from './CurrentPaln';
// import ManageSubscription from './ManageSubscription';
// import Invoices from './Invoices';

// export type TabType = "current-plan" | "manage" | "invoices";
// export default function SubscriptionOverview() {
//   const [activeTab, setActiveTab] = useState<'current-plan' | 'manage' | 'invoices'>('current-plan');

//   return (
//     <div className="min-h-screen bg-white rounded-2xl p-4 ">
//       {/* Header */}
//       <h1 className="text-lg font-semibold text-[#171c35] mb-6">Subscription Overview</h1>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 mb-2 bg-[#FAFAFA] rounded-2xl py-3 px-4 ">
//         <button
//           onClick={() => setActiveTab('current-plan')}
//           className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
//             activeTab === 'current-plan'
//               ? 'bg-[#DCE2FF] text-[#171c35]'
//               : ''
//           }`}
//         >
//           Current Plan
//         </button>

//         <button
//           onClick={() => setActiveTab('manage')}
//           className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
//             activeTab === 'manage'
//               ? 'bg-[#DCE2FF] text-[#171c35]'
//               : ''
//           }`}
//         >
//           Manage Subscription
//         </button>

//         <button
//           onClick={() => setActiveTab('invoices')}
//           className={`px-6 py-3 text-md font-normal rounded-[12px] transition-colors cursor-pointer ${
//             activeTab === 'invoices'
//               ? 'bg-[#DCE2FF] text-[#171c35]'
//               : ''
//           }`}
//         >
//           Invoices
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="bg-white rounded-2xl p-3 md:p-2 cursor-pointer ">
//         {activeTab === 'current-plan' && <CurrentPaln setActiveTab={setActiveTab} />}

//         {activeTab === 'manage' && (
//           <ManageSubscription setActiveTab={setActiveTab} />
//         )}

//         {activeTab === 'invoices' && <Invoices />}
//       </div>
//     </div>
//   );
// }
