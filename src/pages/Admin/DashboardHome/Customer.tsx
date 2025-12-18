import churnBoxImg from '../../../assets/svgIcon/churnBoxImg.svg';
import { useTranslation } from 'react-i18next';

const Customer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md sm:max-w-lg md:w-[388px] py-4 pb-14">
        <h3 className="text-xl font-semibold text-headingBlack mb-6 text-center md:text-left">
          {t("adminDashboard.routes.dashboard.customerSection.title")}
        </h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6 sm:gap-8 h-auto sm:h-52 mb-6">
          {/* Churn Box */}
          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-headingBlack mb-1">
              {t("adminDashboard.routes.dashboard.customerSection.churn.percentage")}
            </p>
            <img src={churnBoxImg} alt={t("adminDashboard.routes.dashboard.customerSection.churn.label")} />
            <p className="text-base font-semibold text-headingBlack">
              {t("adminDashboard.routes.dashboard.customerSection.churn.label")}
            </p>
          </div>

          {/* Acquisition Box */}
          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-headingBlack mb-1">
              {t("adminDashboard.routes.dashboard.customerSection.acquisition.percentage")}
            </p>
            <div className="w-28 md:w-24 h-32 bg-[#BDC8FF] rounded-3xl mb-2"></div>
            <p className="text-base font-semibold text-headingBlack">
              {t("adminDashboard.routes.dashboard.customerSection.acquisition.label")}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span>{t("adminDashboard.routes.dashboard.customerSection.legend.churn")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <span>{t("adminDashboard.routes.dashboard.customerSection.legend.acquisition")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
