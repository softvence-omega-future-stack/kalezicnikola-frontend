import React from "react";
import { useTranslation } from "react-i18next";

const ParsonalInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="p-6 space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#171C35] mb-4">
            {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.personalInfoTitle")}
          </h3>
          <div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.dateOfBirth")}
              </span>
              <span className="text-base text-[#171C35]">1978-05-15</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.phone")}
              </span>
              <span className="text-base text-[#171C35]">+1 (555) 123-4567</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.email")}
              </span>
              <span className="text-base text-[#171C35]">username@gmail.com</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.address")}
              </span>
              <span className="text-base text-[#171C35]">
                123 Main Street, Apt 48, New York, NY 10001
              </span>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#171C35] mb-4">
            {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.medicalInfoTitle")}
          </h3>
          <div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.bloodType")}
              </span>
              <span className="text-sm text-[#171C35]">O+</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.allergies")}
              </span>
              <span className="text-sm text-[#171C35]">Penicillin, Peanuts</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.conditions")}
              </span>
              <span className="text-sm text-[#171C35]">
                Hypertension, Type 2 Diabetes
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.doctor")}
              </span>
              <span className="text-sm text-[#171C35]">Dr. Sarah Johnson</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#171C35] mb-4">
            {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.emergencyContactTitle")}
          </h3>
          <div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.emergencyName")}
              </span>
              <span className="text-sm text-[#171C35]">Mary Smith</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.relationship")}
              </span>
              <span className="text-sm text-[#171C35]">Wife</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.emergencyPhone")}
              </span>
              <span className="text-sm text-[#171C35]">+1 (555) 987-6543</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParsonalInfo;
