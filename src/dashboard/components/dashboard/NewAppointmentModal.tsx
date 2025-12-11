import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAppSelector } from "@/store/hook";
import { toast } from "react-toastify";

interface Patient {
  id: string;
  insuranceId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  address: string;
}
interface Slot {
  id: string;
  scheduleId: string;
  startTime: string;
  endTime: string;
}

interface Schedule {
  id: string;
  doctorId: string;
  day: string;
  isClosed: boolean;
  slots: Slot[];
}
enum AppointmentType {
  CHECKUP = "CHECKUP",
  FOLLOWUP = "FOLLOWUP",
}



interface NewAppointmentModalProps {
  onClose: () => void;
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [suggestedSlot, setSuggestedSlot] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState("");


  const [errors, setErrors] = useState({
    insuranceId: "",
    appointmentDetails: "",
    scheduleSlotId: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    insuranceId: "",
    patientId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    scheduleDate: "",
    scheduleSlotId: "",
    appointmentDate: "",
    appointmentDetails: "",
    type: "CHECKUP",
  });

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/patient/all`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setPatients(response.data.data.patients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/schedules/all`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setSchedules(res.data.data.schedules);
        console.log(res.data.data.schedules);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
      }
    };
    fetchSchedules();
  }, []);

  const handleInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const insuranceId = e.target.value.trim();
    setFormData((prev) => ({ ...prev, insuranceId }));

    const matchedPatient = patients.find((p) => p.insuranceId === insuranceId);
    if (matchedPatient) {
      setFormData(prev => ({
        ...prev,
        firstName: matchedPatient.firstName || "",
        lastName: matchedPatient.lastName || "",
        email: matchedPatient.email || "",
        phone: matchedPatient.phone || "",
        dob: matchedPatient.dob ? matchedPatient.dob.split("T")[0] : "",
        gender: matchedPatient.gender || "",
        bloodGroup: matchedPatient.bloodGroup || "",
        address: matchedPatient.address || "",
        patientId: matchedPatient.id,
      }));

    } else {
      setFormData((prev) => ({
        ...prev,
        patientId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        address: "",
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };


  // Handle schedule slot selection
  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, scheduleSlotId: value, appointmentDate: value.slice(0, 10) }));

    const date = new Date(value);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

    const daySchedule = schedules.find((s) => s.day === dayName && !s.isClosed);

    if (!daySchedule) {
      setSlotError("No schedule available for this day.");
      setSuggestedSlot(null);
      setSelectedSlotId("");
      return;
    }

    const selectedMinutes = timeToMinutes(value.slice(11, 16));

    const slot = daySchedule.slots.find(s => {
      const start = timeToMinutes(s.startTime);
      const end = timeToMinutes(s.endTime);
      return selectedMinutes >= start && selectedMinutes < end;
    });
    setSelectedSlotId(slot ? slot.id : "");

    if (!slot) {
      setSlotError("Selected time is not available.");
      setSuggestedSlot(`${daySchedule.slots[0].startTime} - ${daySchedule.slots[0].endTime}`);
    } else {
      setSlotError(null);
      setSuggestedSlot(null);
    }
  };


  const validate = () => {
    const newErrors: typeof errors = {
      insuranceId: "",
      appointmentDetails: "",
      scheduleSlotId: "",
      type: "",
    };

    if (!formData.insuranceId) newErrors.insuranceId = "Insurance ID is required";
    else if (!patients.some((p) => p.insuranceId === formData.insuranceId))
      newErrors.insuranceId = "No patient found";

    if (!formData.appointmentDetails) newErrors.appointmentDetails = "Appointment details are required";
    if (!formData.scheduleSlotId) newErrors.scheduleSlotId = "Schedule slot is required";
    if (!formData.type) newErrors.type = "Appointment type is required";

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (slotError) return;
    setLoading(true); 


    const payload = {
      insuranceId: formData.insuranceId,
      patientId: formData.patientId,
      scheduleSlotId: selectedSlotId,
      appointmentDate: formData.appointmentDate,
      appointmentDetails: formData.appointmentDetails,
      address: formData.address,
      type: formData.type,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/appointment/create`, payload,
        {
        headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      toast.success(response.data.message || "Appointment created successfully");
      console.log("Appointment created:", payload);
      window.location.reload();
      onClose();
    } catch (error: any) {
    console.error("Failed to create appointment:", error);
    toast.error(error.response?.data?.message || "Failed to create appointment");
  } finally {
    setLoading(false); // stop loading
  }
  };



  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 rounded-2xl w-full max-w-lg mx-auto shadow-xl animate-fadeIn max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-300 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171C35] truncate">
                {t("dashboard.routes.calendar.appointmentModal.title")}
              </h2>
              <p className="text-sm text-[#667085] mt-1 sm:mt-0.5">
                {t("dashboard.routes.calendar.appointmentModal.subtitle")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 ml-2 cursor-pointer flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-4 sm:mt-6 flex-1 overflow-y-auto">
          {/* INSURANCE ID */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t('dashboard.routes.calendar.appointmentModal.insuranceId')}
            </label>
            <input
              type="text"
              name="insuranceId"
              value={formData.insuranceId}
              onChange={handleInsuranceChange}   // FIXED
              placeholder={t('dashboard.routes.calendar.appointmentModal.placeholder.insuranceId')}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.insuranceId && <p className="text-red-500 text-sm mt-1">{errors.insuranceId}</p>}
          </div>

          {/* READONLY PATIENT FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.firstName')}
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.lastName')}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.phoneNumber')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.dateOfBirth')}
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.gender')}
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                readOnly
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* BLOOD GROUP + SCHEDULE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.bloodGroup')}
              </label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                disabled
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t('dashboard.routes.calendar.appointmentModal.schedule')}
              </label>
              <input
                type="datetime-local"
                name="scheduleSlotId"
                value={formData.scheduleSlotId}
                onChange={handleScheduleChange}   // FIXED
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {slotError && <p className="text-red-500 text-sm mt-1">{slotError}</p>}
              {suggestedSlot && (
                <p className="text-blue-500 text-sm mt-1">
                  Suggested: {suggestedSlot}
                </p>
              )}
            </div>
          </div>

          {/* ADDRESS (readonly) */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t('dashboard.routes.calendar.appointmentModal.address')}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              readOnly
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* APPOINTMENT TYPE */}

          <div className="mb-3 sm:mb-4 relative">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              Appointment Type
              {/* {t("dashboard.routes.calendar.appointmentModal.type")} */}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="appearance-none cursor-pointer w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            // pr-10 to make space for the icon
            >
              <option value={AppointmentType.CHECKUP}>Checkup</option>
              <option value={AppointmentType.FOLLOWUP}>Follow-up</option>
            </select>

            {/* Custom SVG */}
            <span className="absolute inset-y-0 right-3 top-7 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>

            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>



          {/* Appointment Details */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t("dashboard.routes.calendar.appointmentModal.appointmentDetails")}
            </label>
            <textarea
              name="appointmentDetails"
              value={formData.appointmentDetails}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.appointmentDetails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.appointmentDetails}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#526FFF] text-white font-medium py-3 sm:py-4 cursor-pointer rounded-[8px] transition-colors hover:bg-[#425CE0]"
          >
          {loading ? "Submitting..." : t("dashboard.routes.calendar.appointmentModal.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
