import React, { useEffect, useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hook';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
  bloodGroup: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'O_POS' | 'O_NEG' | 'AB_POS' | 'AB_NEG' | '';
  maritalStatus: 'MARRIED' | 'UNMARRIED' | 'DIVORCED' | 'WIDOWED' | '';
  city: string;
  insuranceId: string;
  address: string;
  email: string;
  phone: string;
  alternativePhone: string;
  status?: 'ACTIVE' | 'INACTIVE';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ApiSuccessResponse {
  message?: string;
  data?: {
    patient?: FormData;
  };
}

const formText = {
  firstName: { en: "First Name", de: "Vorname", error: { en: "First name is required", de: "Vorname ist erforderlich" } },
  lastName: { en: "Last Name", de: "Nachname", error: { en: "Last name is required", de: "Nachname ist erforderlich" } },
  dob: { en: "Date of Birth", de: "Geburtsdatum", error: { en: "Date of birth is required", de: "Geburtsdatum ist erforderlich" } },
  gender: { en: "Gender", de: "Geschlecht", error: { en: "Gender is required", de: "Geschlecht ist erforderlich" } },
  bloodGroup: { en: "Blood Group", de: "Blutgruppe", error: { en: "Blood group is required", de: "Blutgruppe ist erforderlich" } },
  maritalStatus: { en: "Marital Status", de: "Familienstand", error: { en: "Marital status is required", de: "Familienstand ist erforderlich" } },
  insuranceId: { en: "Insurance ID", de: "Versicherungs-ID", error: { en: "Insurance ID is invalid", de: "Versicherungs-ID ist ungültig" } },
  city: { en: "City", de: "Stadt", error: { en: "City is required", de: "Stadt ist erforderlich" } },
  address: { en: "Address", de: "Adresse", error: { en: "Address is required", de: "Adresse ist erforderlich" } },
  email: { en: "Email", de: "E-Mail", error: { en: "Email is required", de: "E-Mail ist erforderlich" } },
  phone: { en: "Phone Number", de: "Telefonnummer", error: { en: "Phone number is required", de: "Telefonnummer ist erforderlich" } },
  alternativePhone: { en: "Alternative Phone", de: "Alternative Telefonnummer", error: { en: "Alternative phone is invalid", de: "Alternative Telefonnummer ist ungültig" } },
  emergencyContactName: { en: "Contact Name", de: "Kontaktname" },
  emergencyContactPhone: { en: "Contact Phone", de: "Kontakttelefon", error: { en: "Emergency contact phone is invalid", de: "Kontakttelefon ist ungültig" } },
  emergencyContactRelationship: { en: "Relationship", de: "Beziehung" },
  cancel: { en: "Cancel", de: "Abbrechen" },
  update: { en: "Update", de: "Aktualisieren" },
  updating: { en: "Updating...", de: "Wird aktualisiert..." },
  loading: { en: "Loading patient data...", de: "Patientendaten werden geladen..." },
  pageTitle: { en: "Edit Patient", de: "Patient bearbeiten" },
  personalInfo: { en: "Personal Information", de: "Persönliche Informationen" },
  contactAddress: { en: "Contact & Address", de: "Kontakt & Adresse" },
  emergency: { en: "Emergency Contact", de: "Notfallkontakt" }
};

const EditPatientForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '', maritalStatus: '',
    city: '', insuranceId: '', address: '', email: '', phone: '', alternativePhone: '',
    status: 'ACTIVE', emergencyContactName: '', emergencyContactPhone: '', emergencyContactRelationship: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchingPatient, setFetchingPatient] = useState(true);

  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'de';

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] focus:border-transparent";
  const labelClass = "block text-base font-medium text-[#171c35] mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  // Fetch patient
  useEffect(() => {
    const getPatient = async () => {
      if (!id) return;
      try {
        setFetchingPatient(true);
        const res = await axios.get<ApiSuccessResponse>(
          `${import.meta.env.VITE_API_URL}/doctor/patient/${id}`,
          { headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' } }
        );
        if (res.data.data?.patient) setFormData(res.data.data.patient);
      } catch (err) {
        console.log(err)
        toast.error(lang==='en' ? "Failed to fetch patient data." : "Fehler beim Abrufen der Patientendaten.");
        navigate('/dashboard/patients');
      } finally { setFetchingPatient(false); }
    };
    getPatient();
  }, [id, accessToken, navigate, lang]);

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const phoneRegex = /^\+?\d{7,15}$/;

    if (!formData.firstName.trim()) newErrors.firstName = formText.firstName.error[lang];
    if (!formData.lastName.trim()) newErrors.lastName = formText.lastName.error[lang];
    if (!formData.dob) newErrors.dob = formText.dob.error[lang];
    if (!formData.gender) newErrors.gender = formText.gender.error[lang];
    if (!formData.bloodGroup) newErrors.bloodGroup = formText.bloodGroup.error[lang];
    if (!formData.maritalStatus) newErrors.maritalStatus = formText.maritalStatus.error[lang];
    if (!formData.city.trim()) newErrors.city = formText.city.error[lang];
    if (!formData.address.trim()) newErrors.address = formText.address.error[lang];
    if (!formData.email.trim()) newErrors.email = formText.email.error[lang];
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = lang==='en' ? "Email is invalid" : "E-Mail ist ungültig";
    if (!formData.phone.trim()) newErrors.phone = formText.phone.error[lang];
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = lang==='en' ? "Phone number is invalid" : "Telefonnummer ist ungültig";
    if (formData.alternativePhone && !phoneRegex.test(formData.alternativePhone)) newErrors.alternativePhone = formText.alternativePhone.error[lang];
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone)) newErrors.emergencyContactPhone = formText.emergencyContactPhone.error[lang];
    if (formData.insuranceId && !/^[A-Z0-9-]+$/.test(formData.insuranceId)) newErrors.insuranceId = formText.insuranceId.error[lang];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.patch<ApiSuccessResponse>(
        `${import.meta.env.VITE_API_URL}/doctor/patient/update/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success(res.data.message || (lang==='en' ? "Patient updated successfully." : "Patient erfolgreich aktualisiert."));
      navigate("/dashboard/patients");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || (lang==='en' ? "Failed to update patient." : "Patient konnte nicht aktualisiert werden."));
      } else {
        toast.error(lang==='en' ? "Failed to update patient." : "Patient konnte nicht aktualisiert werden.");
      }
    } finally { setLoading(false); }
  };

  const handleCancel = () => navigate('/dashboard/patients');

  if (fetchingPatient) return (
    <div className="min-h-screen mt-6 p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526FFF] mx-auto mb-4"></div>
        <p className="text-gray-600">{formText.loading[lang]}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-6 p-6">
      <div className="py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <ChevronRight size={12} />
          <span onClick={() => navigate('/dashboard')} className="cursor-pointer">Dashboard</span>
          <ChevronRight size={12} />
          <span onClick={() => navigate('/dashboard/patients')} className="cursor-pointer">{lang==='en' ? "Patients" : "Patienten"}</span>
          <ChevronRight size={12} />
          <span className="text-[#171c35] font-semibold">{formText.pageTitle[lang]}</span>
        </div>

        <h1 className="text-2xl font-bold text-[#171c35] mb-8">{formText.pageTitle[lang]}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {[ 
            { title: formText.personalInfo[lang], fields: ["firstName","lastName","dob","gender","bloodGroup","maritalStatus","insuranceId","city","address"] },
            { title: formText.contactAddress[lang], fields: ["email","phone","alternativePhone"] },
            { title: formText.emergency[lang], fields: ["emergencyContactName","emergencyContactPhone","emergencyContactRelationship"] }
          ].map((section, idx) => (
            <div key={idx} className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field}>
                    <label className={labelClass}>{formText[field as keyof typeof formText]?.[lang]}</label>
                    <input
                      name={field}
                      value={formData[field as keyof FormData] || ''}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors[field] && <p className={errorClass}>{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <button type="button" onClick={handleCancel} className="w-full lg:w-1/2 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">{formText.cancel[lang]}</button>
            <button type="submit" disabled={loading} className={`w-full lg:w-1/2 px-6 py-3 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#526FFF] hover:bg-[#4159cc]'}`}>
              {loading ? formText.updating[lang] : formText.update[lang]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientForm;
