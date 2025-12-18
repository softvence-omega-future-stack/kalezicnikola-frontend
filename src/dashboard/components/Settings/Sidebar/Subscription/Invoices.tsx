import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InvoiceModal from './InvoiceViewModal';
import DateRange from '@/dashboard/components/CallLogs/DateRange';

export default function Invoices() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [transactions] = useState([
    { id: 1, date: '16 Jan 2025', name: 'Jacob Jones', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 2, date: '16 Jan 2025', name: 'Ralph Edwards', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 3, date: '16 Jan 2025', name: 'Ronald Richards', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 4, date: '16 Jan 2025', name: 'Wade Warren', transactionId: 'Bk1892464U', status: 'Pending', amount: '739€' },
    { id: 5, date: '16 Jan 2025', name: 'Darlene Robertson', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 6, date: '16 Jan 2025', name: 'Kristin Watson', transactionId: 'Bk1892464U', status: 'Paid', amount: '739€' },
    { id: 7, date: '16 Jan 2025', name: 'Savannah Nguyen', transactionId: 'Bk1892464U', status: 'Pending', amount: '739€' },
  ]);

  return (
    <div className="bg-white">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-2 items-center xl:justify-between lg:justify-start  mb-8 relative z-20">
          <h1 className="text-xl font-semibold text-[#171c35]">
            {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.title")}
          </h1>
          <DateRange />
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171C35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.date")}
                  </th>
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171c35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.name")}
                  </th>
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171c35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.transactionId")}
                  </th>
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171c35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.status")}
                  </th>
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171c35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.payAmount")}
                  </th>
                  <th className="text-left py-4 px-2 sm:px-4 text-sm sm:text-base font-medium text-[#171c35] whitespace-nowrap">
                    {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.table.action")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-5 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#111A2D] whitespace-nowrap">{transaction.date}</td>
                    <td className="py-5 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#111A2D] whitespace-nowrap">{transaction.name}</td>
                    <td className="py-5 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#111A2D] whitespace-nowrap">{transaction.transactionId}</td>
                    <td className="py-5 px-2 sm:px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center w-[90px] sm:w-[109px] justify-center px-3 sm:px-6 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-normal ${
                        transaction.status === 'Paid'
                          ? 'bg-[#0089331A] text-[#008933]'
                          : 'bg-[#DD8F001A] text-[#DD8F00]'
                      }`}>
                        {transaction.status === 'Paid'
                          ? t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.status.paid")
                          : t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.status.pending")}
                      </span>
                    </td>
                    <td className="py-5 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#111A2D] whitespace-nowrap">{transaction.amount}</td>
                    <td className="py-5 px-2 sm:px-4 whitespace-nowrap">
                      <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#171c35] bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        {t("dashboard.routes.settings.settingsSidebar.tabs.subscriptionOverview.subTabs.invoicesTab.buttons.view")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <InvoiceModal onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
