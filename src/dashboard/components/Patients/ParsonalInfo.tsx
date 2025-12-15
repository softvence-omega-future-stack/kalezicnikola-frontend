import { useAppSelector } from "@/store/hook";
import React from "react";
import { useTranslation } from "react-i18next";


interface PersonalInfoProps {
  phone: string;
  email: string;
  address: string | null;
  dob: string | null;
  bloodGroup: string | null;
  conditionName: string | null;
  severity: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
  loading?: boolean;

}
const ParsonalInfo: React.FC<PersonalInfoProps> = ({
  dob,
  phone,
  email,
  address,
  bloodGroup,
  conditionName,
  severity,
  emergencyContactName,
  emergencyContactRelationship,
  emergencyContactPhone,
  loading = false,
}) => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const bloodGroups = [
  { value: 'A_POS', label: 'A+' },
  { value: 'A_NEG', label: 'A-' },
  { value: 'B_POS', label: 'B+' },
  { value: 'B_NEG', label: 'B-' },
  { value: 'O_POS', label: 'O+' },
  { value: 'O_NEG', label: 'O-' },
  { value: 'AB_POS', label: 'AB+' },
  { value: 'AB_NEG', label: 'AB-' },
];
  const bloodGroupLabel = bloodGroups.find(bg => bg.value === bloodGroup)?.label || bloodGroup ;

  return (
    <div>
      {
        loading ? (
          <p className="text-base text-[#111A2D] text-center">Loading...</p>
        ) : (
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
              <span className="text-base text-[#171C35]">{dob}</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.phone")}
              </span>
              <span className="text-base text-[#171C35]">{phone}</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.email")}
              </span>
              <span className="text-base text-[#171C35]">{email}</span>
            </div>
            <div className="flex">
              <span className="text-base text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.address")}
              </span>
              <span className="text-base text-[#171C35]">
                {address}
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
              <span className="text-sm text-[#171C35]">{bloodGroupLabel}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.allergies")}
              </span>
              <span className="text-sm text-[#171C35]">{severity}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.conditions")}
              </span>
              <span className="text-sm text-[#171C35]">
                {conditionName}
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.doctor")}
              </span>
              <span className="text-sm text-[#171C35]">{user?.firstName} {user?.lastName}</span>
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
              <span className="text-sm text-[#171C35]">{emergencyContactName}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.relationship")}
              </span>
              <span className="text-sm text-[#171C35]">{emergencyContactRelationship}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-[#171C35] w-32">
                {t("dashboard.routes.patients.patientProfile.tabsvalue.personalInfo.emergencyPhone")}
              </span>
              <span className="text-sm text-[#171C35]">{emergencyContactPhone}</span>
            </div>
          </div>
        </div>
      </div>
        )
      }
    </div>
  );
};

export default ParsonalInfo;
