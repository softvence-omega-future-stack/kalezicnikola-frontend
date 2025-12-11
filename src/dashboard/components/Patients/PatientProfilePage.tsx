import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ParsonalInfo from "./ParsonalInfo";
import PatientSummary from "./PatientSummery";
import PrescriptionsPage from "./Prescription";
import LabResultsPage from "./LabResults";

import homeIcon from "../../../assets/svgIcon/homeIcon.svg";
import chevronIcon from "../../../assets/svgIcon/chevronnRight.svg";
import axios from "axios";
import { useAppSelector } from "@/store/hook";
import Appointment from "./Appointment";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  photo: string | null;
  phone: string;
  alternativePhone: string | null;
  email: string;
  insuranceId: string | null;
  address: string | null;
  emergencyContact: string | null;
  dob: string | null;
  maritalStatus: string | null;
  city: string | null;
  gender: string | null;
  bloodGroup: string | null;
  conditionName: string | null;
  diagnosedDate: string | null;
  severity: string | null;
  status: string;
  retentionExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
}

const PatientProfilePage: React.FC = () => {
  const data = useParams();
  const id = data.id;
  const { t } = useTranslation();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState<Patient | null>(null);

  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Tab keys
  const tabKeys = [
    "personalInfo",
    "patientSummary",
    "appointment",
    "prescriptions",
    "labResults",
  ];

  // Translated tab names
  const tabs = tabKeys.map((key) =>
    t(`dashboard.routes.patients.patientProfile.tabs.${key}`)
  );

  // Active tab stored as key
  const [activeTab, setActiveTab] = useState("personalInfo");

  useEffect(() => {
   
    const fetchPatient = async () => {
      try {
 

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/patient/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        console.log(response.data);
        setPatient(response.data.data.patient);
      } catch (error) {
        console.log(error);
      } 
    };

    fetchPatient();
  }, []);
  // Set tab from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && tabKeys.includes(tab)) setActiveTab(tab);
  }, [location.search]);

  return (
    <div className="min-h-screen p-6 mt-[30px] w-full">
      {/* Header Navigation */}
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="text-gray-400 hover:text-gray-600">
            <img src={homeIcon} alt="" />
          </button>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 cursor-pointer"
          >
            {t(
              "dashboard.routes.patients.patientProfile.breadcrumb.dashboard"
            )}
          </span>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span
            onClick={() => navigate("/dashboard/patients")}
            className="text-gray-600 cursor-pointer"
          >
            {t(
              "dashboard.routes.patients.patientProfile.breadcrumb.patients"
            )}
          </span>

          <img src={chevronIcon} alt="" className="text-gray-400" />
          <span className="text-[#171C35] font-medium">
            {t(
              "dashboard.routes.patients.patientProfile.breadcrumb.profile"
            )}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-5 sm:mb-15">
          {t("dashboard.routes.patients.patientProfile.title")}
        </h1>

        {/* Profile Section START */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Left: Patient Info + Photo */}
          <div className="xl:col-span-2 bg-[#E5E9FF] rounded-[24px] p-4 sm:p-6 flex flex-col xl:flex-row gap-6 relative">
            {/* Left Content */}
            <div className="flex-1 flex flex-col w-full">
              {/* Top */}
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] mb-1">
                  {patient?.firstName} {patient?.lastName}
                </h2>
                <p className="text-sm font-medium text-[#171C35]">
                  Insurance ID: {patient?.insuranceId}
                </p>
              </div>

              {/* Middle */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-gray-300 pb-3 mb-4">
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.treatmentPhase"
                    )}
                  </div>
                  <div className="font-semibold text-[#171C35]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.treatmentPhaseValue"
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.diagnosis"
                    )}
                  </div>
                  <div className="font-semibold text-[#171C35]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.diagnosisValue"
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.bloodSugar"
                    )}
                  </div>
                  <div className="text-2xl font-semibold text-[#171C35]">
                    90{" "}
                    <span className="text-sm">
                      {t(
                        "dashboard.routes.patients.patientProfile.header.bloodSugarUnit"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex flex-wrap gap-x-14 gap-y-4 mt-2">
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.lastVisited"
                    )}
                  </div>
                  <div className="font-semibold text-[#171C35]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.lastVisitedValue"
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.phone"
                    )}
                  </div>
                  <div className="font-semibold text-[#171C35]">
                    {/* {t(
                      "dashboard.routes.patients.patientProfile.header.phoneValue"
                    )} */}
                    {patient?.phone}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#111A2D]">
                    {t(
                      "dashboard.routes.patients.patientProfile.header.email"
                    )}
                  </div>
                  <div className="font-semibold text-[#171C35]">
                    {/* {t(
                      "dashboard.routes.patients.patientProfile.header.emailValue"
                    )} */}
                    {patient?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full sm:w-[200px] md:w-[222px] h-[220px] sm:h-[260px] xl:h-[290px] xl:-mt-15 rounded-[28px] overflow-hidden bg-white self-center xl:self-auto">
              <img
                src="https://i.ibb.co.com/d0ZCyRCP/patient-Profile-Icon.png"
                className="w-full h-full object-contain md:object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ESR */}
            <div className="bg-[#E5DFF5] rounded-3xl p-4">
              <div className="text-sm text-[#171C35] mb-1">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.esr"
                )}{" "}
                <span className="text-[#FF3D3D]">
                  {t(
                    "dashboard.routes.patients.patientProfile.cards.esrCritical"
                  )}
                </span>
              </div>
              <div className="text-2xl font-semibold text-[#171C35]">
                65 <span className="text-sm">mm/hr</span>
              </div>
              <div className="text-sm text-[#171C35] mt-6">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.inflammation"
                )}
              </div>
            </div>

            {/* Vitamin D */}
            <div className="bg-[#D0E1F5] rounded-3xl p-4">
              <div className="text-sm text-[#171C35] mb-1">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.vitaminD"
                )}{" "}
                <span className="font-bold text-[#FF6200]">
                  {t(
                    "dashboard.routes.patients.patientProfile.cards.vitaminMinor"
                  )}
                </span>
              </div>
              <div className="text-2xl font-semibold text-[#171C35]">
                28 <span className="text-sm">ng/ml</span>
              </div>
              <div className="text-sm text-[#171C35] mt-6">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.vitaminStable"
                )}
              </div>
            </div>

            {/* Overall Status */}
            <div className="bg-[#FADACA] rounded-3xl p-4 sm:col-span-2">
              <div className="text-sm text-[#171C35] mb-1">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.overallStatus"
                )}
              </div>
              <div className="text-xl font-semibold text-[#171C35] mb-5">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.overallStable"
                )}
              </div>
              <div className="text-sm text-[#111A2D]">
                {t(
                  "dashboard.routes.patients.patientProfile.cards.overallNoAlerts"
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Profile Section END */}

        {/* History Section */}
        <div className="bg-white rounded-2xl">
          <div className="p-4 sm:p-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35]">
              {t("dashboard.routes.patients.patientProfile.historyTitle", {
                name: "Jonathon Sanders",
              })}
            </h2>
            <div className="border border-[#D0D5DD] rounded-xl py-2.5 px-4 text-sm font-semibold">
             <button  onClick={() => navigate(`/dashboard/edit-patient/${id}`)} className="flex items-center gap-2 cursor-pointer "> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.99998 16.6662H17.5M2.5 16.6662H3.89545C4.3031 16.6662 4.50693 16.6662 4.69874 16.6202C4.8688 16.5793 5.03138 16.512 5.1805 16.4206C5.34869 16.3175 5.49282 16.1734 5.78107 15.8852L16.25 5.4162C16.9404 4.72585 16.9404 3.60656 16.25 2.9162C15.5597 2.22585 14.4404 2.22585 13.75 2.9162L3.28105 13.3852C2.9928 13.6734 2.84867 13.8175 2.7456 13.9857C2.65422 14.1349 2.58688 14.2974 2.54605 14.4675C2.5 14.6593 2.5 14.8631 2.5 15.2708V16.6662Z" stroke="#171C35" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Edit</button>
</div>
          </div>

          {/* Tabs */}
          <div className="bg-[#FAFAFA] py-2 mx-4 rounded-2xl overflow-x-auto">
            <div className="flex px-4 sm:px-6 gap-2 sm:gap-3">
              {tabKeys.map((key, idx) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 sm:px-4 py-2 text-sm whitespace-nowrap rounded-xl transition cursor-pointer ${
                    activeTab === key
                      ? "bg-[#DCE2FF] text-[#171C35]"
                      : "text-gray-600"
                  }`}
                >
                  {tabs[idx]}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === "personalInfo" && patient && (
              <ParsonalInfo
                dob={patient.dob ? formattedDate(patient.dob) : null}
                phone={patient.phone ?? null}
                email={patient.email ?? null}
                address={patient.address ?? null}
                conditionName={patient.conditionName ?? null}
                severity={patient.severity ?? null}
                bloodGroup={patient.bloodGroup ?? null}
                emergencyContactName={patient.emergencyContactName ?? null}
                emergencyContactRelationship={patient.emergencyContactRelationship ?? null}
                emergencyContactPhone={patient.emergencyContactPhone ?? null}
              />
            )}
            {activeTab === "patientSummary" && <PatientSummary />}
            {activeTab === "appointment" && <Appointment />}
            {activeTab === "prescriptions" && <PrescriptionsPage />}
            {activeTab === "labResults" && <LabResultsPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
