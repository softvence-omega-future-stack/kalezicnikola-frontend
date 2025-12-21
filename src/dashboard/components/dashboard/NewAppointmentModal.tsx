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
  const [isExistingPatient, setIsExistingPatient] = useState(false); // Track if patient exists

  const [errors, setErrors] = useState({
    insuranceId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
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

  const bloodGroups = [
    { value: "", label: "Select Blood Group" },
    { value: "A_POS", label: "A+" },
    { value: "A_NEG", label: "A-" },
    { value: "B_POS", label: "B+" },
    { value: "B_NEG", label: "B-" },
    { value: "O_POS", label: "O+" },
    { value: "O_NEG", label: "O-" },
    { value: "AB_POS", label: "AB+" },
    { value: "AB_NEG", label: "AB-" },
  ];

  // const getBloodGroupLabel = (value: string) =>
  //   bloodGroups.find((bg) => bg.value === value)?.label || value;

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
  }, [accessToken]);

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
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
      }
    };
    fetchSchedules();
  }, [accessToken]);

  // Handle insurance ID change
  const handleInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const insuranceId = e.target.value.trim();
    setFormData((prev) => ({ ...prev, insuranceId }));

    const matchedPatient = patients.find((p) => p.insuranceId === insuranceId);
    
    if (matchedPatient) {
      // Existing patient - auto-fill and set readonly
      setIsExistingPatient(true);
      setFormData((prev) => ({
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
      // Clear errors for existing patient
      setErrors((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        bloodGroup: "",
      }));
    } else {
      // New patient - clear form and make editable
      setIsExistingPatient(false);
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // Handle schedule slot selection
  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      scheduleSlotId: value,
      appointmentDate: value.slice(0, 10),
    }));

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

    const slot = daySchedule.slots.find((s) => {
      const start = timeToMinutes(s.startTime);
      const end = timeToMinutes(s.endTime);
      return selectedMinutes >= start && selectedMinutes < end;
    });

    setSelectedSlotId(slot ? slot.id : "");

    if (!slot) {
      setSlotError("Selected time is not available.");
      setSuggestedSlot(
        `${daySchedule.slots[0].startTime} - ${daySchedule.slots[0].endTime}`
      );
    } else {
      setSlotError(null);
      setSuggestedSlot(null);
    }
  };

  // Validation
  const validate = () => {
    const newErrors: typeof errors = {
      insuranceId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      bloodGroup: "",
      appointmentDetails: "",
      scheduleSlotId: "",
      type: "",
    };

    // Insurance ID
    if (!formData.insuranceId) {
      newErrors.insuranceId = "Insurance ID is required";
    }

    // For new patients, validate all fields
    if (!isExistingPatient) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    }

    // Common validations
    if (!formData.appointmentDetails) {
      newErrors.appointmentDetails = "Appointment details are required";
    }
    if (!formData.scheduleSlotId) {
      newErrors.scheduleSlotId = "Schedule slot is required";
    }
    if (!formData.type) {
      newErrors.type = "Appointment type is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (slotError) {
      toast.error("Please select a valid time slot");
      return;
    }

    setLoading(true);

    const payload = isExistingPatient
      ? {
          // Existing patient
          insuranceId: formData.insuranceId,
          patientId: formData.patientId,
          scheduleSlotId: selectedSlotId,
          appointmentDate: formData.appointmentDate,
          appointmentDetails: formData.appointmentDetails,
          address: formData.address,
          type: formData.type,
        }
      : {
          // New patient - include all fields
          insuranceId: formData.insuranceId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          address: formData.address,
          scheduleSlotId: selectedSlotId,
          appointmentDate: formData.appointmentDate,
          appointmentDetails: formData.appointmentDetails,
          type: formData.type,
        };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment/create`,
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      toast.success(response?.data?.message || "Appointment created successfully");
      window.location.reload();
      onClose();
    } catch (error: any) {
      console.error("Failed to create appointment:", error);
      toast.error(error.response?.data?.message || "Failed to create appointment");
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-4 sm:pb-6 mt-4 sm:mt-6 flex-1 overflow-y-auto">
          {/* INSURANCE ID */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t("dashboard.routes.calendar.appointmentModal.insuranceId")} *
            </label>
            <input
              type="text"
              name="insuranceId"
              value={formData.insuranceId}
              onChange={handleInsuranceChange}
              placeholder={t("dashboard.routes.calendar.appointmentModal.placeholder.insuranceId")}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.insuranceId && (
              <p className="text-red-500 text-sm mt-1">{errors.insuranceId}</p>
            )}
            {isExistingPatient && (
              <p className="text-green-600 text-sm mt-1">✓ Patient found - Form auto-filled</p>
            )}
          </div>

          {/* PATIENT FIELDS - Editable for new patients, readonly for existing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.firstName")} *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                readOnly={isExistingPatient}
                placeholder="Enter first name"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.lastName")} *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                readOnly={isExistingPatient}
                placeholder="Enter last name"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.email")} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={isExistingPatient}
                placeholder="Enter email"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.phoneNumber")} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={isExistingPatient}
                placeholder="Enter phone number"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.dateOfBirth")} *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                readOnly={isExistingPatient}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.gender")} *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isExistingPatient}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* BLOOD GROUP + SCHEDULE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.bloodGroup")} *
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                disabled={isExistingPatient}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isExistingPatient ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                {bloodGroups.map((bg) => (
                  <option key={bg.value} value={bg.value}>
                    {bg.label}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
                {t("dashboard.routes.calendar.appointmentModal.schedule")} *
              </label>
              <input
                type="datetime-local"
                name="scheduleSlotId"
                value={formData.scheduleSlotId}
                onChange={handleScheduleChange}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {slotError && <p className="text-red-500 text-sm mt-1">{slotError}</p>}
              {suggestedSlot && (
                <p className="text-blue-500 text-sm mt-1">Suggested: {suggestedSlot}</p>
              )}
              {errors.scheduleSlotId && (
                <p className="text-red-500 text-sm mt-1">{errors.scheduleSlotId}</p>
              )}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t("dashboard.routes.calendar.appointmentModal.address")}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={isExistingPatient}
              placeholder="Enter address"
              className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isExistingPatient ? "cursor-not-allowed opacity-70" : ""
              }`}
            />
          </div>

          {/* APPOINTMENT TYPE */}
          <div className="mb-3 sm:mb-4 relative">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              Appointment Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="appearance-none cursor-pointer w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            >
              <option value={AppointmentType.CHECKUP}>Checkup</option>
              <option value={AppointmentType.FOLLOWUP}>Follow-up</option>
            </select>
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
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* APPOINTMENT DETAILS */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-[#171C35] mb-1 sm:mb-2">
              {t("dashboard.routes.calendar.appointmentModal.appointmentDetails")} *
            </label>
            <textarea
              name="appointmentDetails"
              value={formData.appointmentDetails}
              onChange={handleChange}
              placeholder="Enter appointment details"
              rows={3}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.appointmentDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.appointmentDetails}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#526FFF] text-white font-medium py-3 sm:py-4 rounded-[8px] transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#425CE0] cursor-pointer"
            }`}
          >
            {loading
              ? "Submitting..."
              : t("dashboard.routes.calendar.appointmentModal.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;