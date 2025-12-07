import { useState } from "react";
import { useTranslation } from "react-i18next";

const AuthenticationSector = () => {
  const { t } = useTranslation();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl mt-4">
      <div className="w-full space-y-4">

        {/* Header */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-headingBlack">
          {t("adminDashboard.routes.securityAudit.authenticationSector.title")}
        </h2>

        {/* Toggle Section */}
        <div className="flex flex-col md:flex-row xs:flex-row items-start xs:items-center justify-between gap-4 sm:gap-6">

          {/* Text Content */}
          <div className="flex-1 space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg font-semibold text-headingBlack">
              {t("adminDashboard.routes.securityAudit.authenticationSector.enableTitle")}
            </p>
            <p className="text-sm sm:text-base text-subHeadingBlack leading-relaxed">
              {t("adminDashboard.routes.securityAudit.authenticationSector.description")}
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setTwoFAEnabled(!twoFAEnabled)}
            className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors cursor-pointer
              ${twoFAEnabled ? "bg-[#526FFF]" : "bg-gray-300"}`}
            aria-label={twoFAEnabled ? t("adminDashboard.routes.securityAudit.authenticationSector.ariaEnabled") : t("adminDashboard.routes.securityAudit.authenticationSector.ariaDisabled")}
            aria-pressed={twoFAEnabled}
          >
            <span
              className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out
                ${twoFAEnabled ? "translate-x-6" : "translate-x-1"}`}
            ></span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default AuthenticationSector;
