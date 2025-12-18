import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Patient {
  insuranceId: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  createdAt: string;
}
interface GridViewProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

const GridView = ({patients,loading,error}:GridViewProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;


  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-5 ">
        {patients.map((patient, index) => (
          <div key={index} className="rounded-[16px] p-6 bg-[#F8F8F8]">
            {/* Profile */}
            <div className="flex items-start gap-4 mb-6">
              <img
                className="h-14 w-14 rounded-full"
                src="https://i.ibb.co.com/wh1X6vJn/Screenshot-2025-10-26-144913.png"
                alt={t("dashboard.routes.patients.gridView.profileImageAlt")}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-[#171C35] mb-0.5">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-sm text-[#111A2D] font-medium">{patient.insuranceId}</p>
              </div>
            </div>

            <div className="p-3 rounded-[16px] hover:bg-[#EEF1FF]">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-[#111A2D] mb-1">
                    {t("dashboard.routes.patients.gridView.telephoneNumber")}
                  </p>
                  <p className="text-base font-semibold text-[#171C35]">{patient.phone}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#111A2D] mb-1">
                    {t("dashboard.routes.patients.gridView.email")}
                  </p>
                  <p className="text-base font-semibold text-[#171C35] truncate">
                    {patient.email}
                  </p>
                </div>
              </div>

              {/* Birthday */}
              <div className="mb-6">
                <p className="text-xs font-medium text-[#111A2D] mb-1">
                  {t("dashboard.routes.patients.gridView.birthday")}
                </p>
                <p className="text-base font-normal text-[#171C35]">
                  {formatDate(patient.dob)}
                </p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <p className="text-xs font-medium text-[#111A2D] mb-1">
                  {t("dashboard.routes.patients.gridView.address")}
                </p>
                <p className="text-base font-normal text-[#171C35]">
                  {patient.address}
                </p>
              </div>
            </div>

            {/* View Button */}
            <button
              onClick={() => navigate(`/dashboard/patients/${patient.insuranceId}`)}
              className="w-full py-3 rounded-full border border-gray-300 mt-4 font-medium transition-colors cursor-pointer border-gray-300 text-[#171C35] hover:bg-[#526FFF] hover:text-white"
            >
              {t("dashboard.routes.patients.gridView.viewButton")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridView;