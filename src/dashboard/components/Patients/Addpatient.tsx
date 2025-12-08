// import React, { useState } from 'react';
// import { Home, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import CustomDropdown from '../Settings/Sidebar/CustomDropdown';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// interface FormData {
//   // photoFile?: File;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
//   bloodGroup: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'O_POS' | 'O_NEG' | 'AB_POS' | 'AB_NEG' | '';
//   maritalStatus: 'MARRIED' | 'UNMARRIED' | 'DIVORCED' | 'WIDOWED' | '';
//   city: string;
//   insuranceId: string;
//   address: string;
//   email: string;
//   phone: string;
//   alternativePhone: string;
//   status?: 'ACTIVE' | 'INACTIVE';
//   emergencyContactName?: string;
//   emergencyContactPhone?: string;
//   emergencyContactRelationship?: string;
// }
// interface FormErrors {
//   [key: string]: string;
// }

// const AddPatientForm: React.FC = () => {
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     gender: '',
//     bloodGroup: '',
//     maritalStatus: '',
//     city: '',
//     insuranceId: '',
//     address: '',
//     email: '',
//     phone: '',
//     alternativePhone: '',
//     status: 'ACTIVE',
//     emergencyContactName: '',
//     emergencyContactPhone: '',
//     emergencyContactRelationship: '',
//   });

//   const validate = (): boolean => {
//     const newErrors: FormErrors = {};

//     // Required fields
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.dob) newErrors.dob = "Date of birth is required";
//     if (!formData.gender) newErrors.gender = "Gender is required";
//     if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
//     if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

//     // Format validations
//     if (formData.email && !formData.email.match(/^\S+@\S+\.\S+$/))
//       newErrors.email = "Invalid email format";
//     const phoneRegex = /^\+?\d{7,15}$/;
//     if (formData.phone && !phoneRegex.test(formData.phone))
//       newErrors.phone = "Invalid phone number";
//     if (formData.alternativePhone && !phoneRegex.test(formData.alternativePhone))
//       newErrors.alternativePhone = "Invalid alternative phone number";
//     if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone))
//       newErrors.emergencyContactPhone = "Invalid emergency contact phone";

//     // Insurance ID validation (optional: alphanumeric)
//     if (formData.insuranceId && !/^[A-Z0-9-]+$/.test(formData.insuranceId))
//       newErrors.insuranceId = "Invalid insurance ID";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleDropdownChange = (field: keyof FormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return; // Stop if validation fails

//     const token = localStorage.getItem("accessToken");

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       phone: formData.phone,
//       alternativePhone: formData.alternativePhone,
//       email: formData.email,
//       insuranceId: formData.insuranceId,
//       address: formData.address,
//       dob: formData.dob,
//       maritalStatus: formData.maritalStatus,
//       city: formData.city,
//       gender: formData.gender,
//       bloodGroup: formData.bloodGroup,
//       status: formData.status || "ACTIVE",
//       emergencyContactName: formData.emergencyContactName || null,
//       emergencyContactPhone: formData.emergencyContactPhone || null,
//       emergencyContactRelationship: formData.emergencyContactRelationship || null,
//     };

//     console.log("SENDING PAYLOAD:", payload);

//     try {
//       const response = await axios.post(
//         "https://1x5kkm9k-5000.asse.devtunnels.ms/api/v1/doctor/patient/add",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Patient added:", response.data);
//       toast.success(response.data.message);
//       alert(response.data.message || "Patient added successfully");
//       navigate("/dashboard/patients");
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         // Display server validation errors
//         const serverMessage = error.response.data.message;
//         alert(serverMessage);
//       } else {
//         alert("An unexpected error occurred");
//       }
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: '',
//       lastName: '',
//       dob: '',
//       gender: '',
//       bloodGroup: '',
//       maritalStatus: '',
//       city: '',
//       insuranceId: '',
//       address: '',
//       email: '',
//       phone: '',
//       alternativePhone: '',
//       status: 'ACTIVE',
//       emergencyContactName: '',
//       emergencyContactPhone: '',
//       emergencyContactRelationship: '',
//     });
//     console.log('Form cleared/cancelled');
//     setErrors({});
//   };

//   const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] focus:border-transparent";
//   const labelClass = "block text-base font-medium text-[#171c35] mb-2";
//   const errorClass = "text-red-500 text-sm mt-1";

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen mt-6 p-6">
//       <div className="py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//           <Home className="w-4 h-4 text-gray-500" />
//           <ChevronRight size={12} className="text-gray-500" />
//           <span onClick={() => navigate('/dashboard')} className="text-gray-600 cursor-pointer">Dashboard</span>
//           <ChevronRight size={12} className="text-gray-500" />
//           <span onClick={() => navigate('/dashboard/patients')} className="text-gray-600 cursor-pointer">Patients</span>
//           <ChevronRight size={12} className="text-gray-500" />
//           <span className="text-[#171c35] font-semibold">Add Patient</span>
//         </div>

//         {/* Page Title */}
//         <h1 className="text-2xl font-bold text-[#171c35] mb-8">Add New Patient</h1>

//         {/* Form - IMPORTANT: relative positioning for z-index context */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative">

//           {/* Personal Info Section */}
//           <div className="mb-8 pb-4 border-b border-gray-100">
//             {/*<div className="relative z-0">
//                 <label htmlFor="photo" className={labelClass}>Photo</label>
//                 <input
//                   type="file"
//                   id="photo"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setFormData({ ...formData, photoFile: e.target.files?.[0] })
//                   }
//                   className={inputClass}
//                 />
//               </div> */}

//             <h2 className="text-xl font-semibold text-[#171c35] mb-6">Personal Information</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* First Name */}
//               <div className="relative z-0">
//                 <label htmlFor="firstName" className={labelClass}>First Name *</label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Enter first name..."
//                   // required
//                   className={inputClass}
//                 />
//                 {errors.firstName && <div className={errorClass}>{errors.firstName}</div>}
//               </div>

//               {/* Last Name */}
//               <div className="relative z-0">
//                 <label htmlFor="lastName" className={labelClass}>Last Name *</label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Enter last name..."
//                   required
//                   className={inputClass}
//                 />
//                   {errors.lastName && <div className={errorClass}>{errors.lastName}</div>}

//               </div>

//               {/* Date of Birth */}
//               <div className="relative z-0">
//                 <label htmlFor="dob" className={labelClass}>Date of Birth *</label>
//                 <input
//                   id="dob"
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   required
//                   className={inputClass + " appearance-none"}
//                 />
//                   {errors.dob && <div className={errorClass}>{errors.dob}</div>}

//               </div>

//               {/* Gender Dropdown - Higher z-index */}
//               <div className="relative z-50">
//                 <label htmlFor="gender" className={labelClass}>Gender *</label>
//                 <CustomDropdown
//                   value={formData.gender}
//                   onChange={(val) => handleDropdownChange("gender", val)}
//                   options={[
//                     { value: "MALE", label: "Male" },
//                     { value: "FEMALE", label: "Female" },
//                     { value: "OTHER", label: "Other" }
//                   ]}
//                   placeholder="Select gender"

//                 />
//                   {errors.phone && <div className={errorClass}>{errors.phone}</div>}

//               </div>

//               {/* Blood Group Dropdown */}
//               <div className="relative z-40">
//                 <label htmlFor="bloodGroup" className={labelClass}>Blood Group *</label>
//                 <CustomDropdown
//                   value={formData.bloodGroup}
//                   onChange={(val) => handleDropdownChange("bloodGroup", val)}
//                   options={[
//                     { value: 'A_POS', label: 'A+' },
//                     { value: 'A_NEG', label: 'A-' },
//                     { value: 'B_POS', label: 'B+' },
//                     { value: 'B_NEG', label: 'B-' },
//                     { value: 'O_POS', label: 'O+' },
//                     { value: 'O_NEG', label: 'O-' },
//                     { value: 'AB_POS', label: 'AB+' },
//                     { value: 'AB_NEG', label: 'AB-' },
//                   ]}
//                   placeholder="Select blood group"

//                 />
//               </div>

//               {/* Marital Status Dropdown */}
//               <div className="relative z-30">
//                 <label htmlFor="maritalStatus" className={labelClass}>Marital Status *</label>
//                 <CustomDropdown
//                   value={formData.maritalStatus}
//                   onChange={(val) => handleDropdownChange("maritalStatus", val)}
//                   options={[
//                     { value: "UNMARRIED", label: "Single" },
//                     { value: "MARRIED", label: "Married" },
//                     { value: "DIVORCED", label: "Divorced" },
//                     { value: "WIDOWED", label: "Widowed" }
//                   ]}
//                   placeholder="Select marital status"

//                 />cd
//               </div>

//               {/* Status */}
//               <div className="relative z-20">
//                 <label htmlFor="status" className={labelClass}>Status *</label>
//                 <CustomDropdown
//                   value={formData.status || 'ACTIVE'}
//                   onChange={(val) => handleDropdownChange("status", val)}
//                   options={[
//                     { value: "ACTIVE", label: "Active" },
//                     { value: "INACTIVE", label: "Inactive" }
//                   ]}
//                   placeholder="Select status"
//                 />
//               </div>

//               {/* Insurance ID */}
//               <div className="relative z-0">
//                 <label htmlFor="insuranceId" className={labelClass}>Insurance ID</label>
//                 <input
//                   id="insuranceId"
//                   type="text"
//                   name="insuranceId"
//                   value={formData.insuranceId}
//                   onChange={handleChange}
//                   placeholder="Insurance ID..."
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Contact & Address Section */}
//           <div className="mb-8 pb-4 border-b border-gray-100">
//             <h2 className="text-xl font-semibold text-[#171c35] mb-6">Contact & Address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="relative z-0">
//                 <label htmlFor="email" className={labelClass}>Email *</label>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email..."
//                   required
//                   className={inputClass}
//                 />
//                   {errors.email && <div className={errorClass}>{errors.email}</div>}
//               </div>

//               <div className="relative z-0">
//                 <label htmlFor="phoneNumber" className={labelClass}>Phone Number *</label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter primary phone number..."
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div className="relative z-0">
//                 <label htmlFor="alternativePhone" className={labelClass}>Alternative Phone</label>
//                 <input
//                   id="alternativePhone"
//                   type="tel"
//                   name="alternativePhone"
//                   value={formData.alternativePhone}
//                   onChange={handleChange}
//                   placeholder="Enter alternative phone number..."
//                   className={inputClass}
//                 />
//                   {errors.alternativePhone && <div className={errorClass}>{errors.alternativePhone}</div>}

//               </div>

//               <div className="relative z-0">
//                 <label htmlFor="city" className={labelClass}>City *</label>
//                 <input
//                   id="city"
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Enter city..."
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div className="lg:col-span-2 relative z-0">
//                 <label htmlFor="address" className={labelClass}>Address *</label>
//                 <input
//                   id="address"
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Full address..."
//                   required
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Emergency Contact */}
//           <div className="mb-8 pb-4 border-b border-gray-100">
//             <h2 className="text-xl font-semibold text-[#171c35] mb-6">Emergency Contact</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="relative z-0">
//                 <label htmlFor="emergencyContactName" className={labelClass}>Name</label>
//                 <input name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className={inputClass} placeholder="Emergency contact name" />
//                   {errors.emergencyContactPhone && <div className={errorClass}>{errors.emergencyContactPhone}</div>}

//               </div>
//               <div className="relative z-0">
//                 <label htmlFor="emergencyContactPhone" className={labelClass}>Phone</label>
//                 <input name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} className={inputClass} placeholder="Emergency contact phone" />
//               </div>
//               <div className="relative z-0">
//                 <label htmlFor="emergencyContactRelationship" className={labelClass}>Relationship</label>
//                 <input name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} className={inputClass} placeholder="Relationship" />
//               </div>
//             </div>
//           </div>



//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-8 relative z-0">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="w-full px-6 py-3 bg-white border border-[#D0D5DD] rounded-[8px] text-sm font-medium text-[#111A2D] hover:bg-gray-50 transition-colors cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="w-full px-6 py-3 bg-[#526FFF] hover:bg-[#4159cc] rounded-[8px] text-sm font-medium text-white transition-colors cursor-pointer"
//             >
//               Add Patient
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPatientForm;

import React, { useEffect, useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../Settings/Sidebar/CustomDropdown';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const AddPatientForm: React.FC = () => {
  const navigate = useNavigate();
  const [allPatients, setAllPatients] = useState<FormData[]>([]); // store fetched patients
  const [loading, setLoading] = useState<boolean>(false);


  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    city: '',
    insuranceId: '',
    address: '',
    email: '',
    phone: '',
    alternativePhone: '',
    status: 'ACTIVE',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-[#D0D5DD] rounded-[8px] text-sm text-[#111A2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526FFF] focus:border-transparent";
  const labelClass = "block text-base font-medium text-[#171c35] mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

   useEffect(() => {
    const getAllPatients = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // If API needs auth
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/patient/all`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
      setAllPatients(res.data.data.patients || []);
        return allPatients;
      } catch (err: any) {
              console.error("Failed to fetch patients:", err);
      }
    };

    getAllPatients();
  }, []);
  // Validation function
  const validate = (): boolean => {
  const newErrors: FormErrors = {};
  const phoneRegex = /^\+?\d{7,15}$/;

  // Required validations
  if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!formData.dob) newErrors.dob = "Date of birth is required";
  if (!formData.gender) newErrors.gender = "Gender is required";
  if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
  if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
  if (!formData.city.trim()) newErrors.city = "City is required";
  if (!formData.address.trim()) newErrors.address = "Address is required";

  // Email validation + uniqueness
  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
  else if (allPatients.some(p => p.email === formData.email))
    newErrors.email = "This email is already used";

  // Phone validation + uniqueness
  if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
  else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
  else if (allPatients.some(p => p.phone === formData.phone))
    newErrors.phone = "This phone number is already used";

  // Alternative phone uniqueness
  if (formData.alternativePhone && !phoneRegex.test(formData.alternativePhone))
    newErrors.alternativePhone = "Invalid alternative phone number";
  else if (formData.alternativePhone && allPatients.some(p => p.alternativePhone === formData.alternativePhone))
    newErrors.alternativePhone = "This alternative phone is already used";

  // Emergency contact uniqueness
  if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone))
    newErrors.emergencyContactPhone = "Invalid emergency contact phone";
  else if (formData.emergencyContactPhone && allPatients.some(p => p.emergencyContactPhone === formData.emergencyContactPhone))
    newErrors.emergencyContactPhone = "This emergency contact phone is already used";

  // Insurance ID uniqueness
  if (formData.insuranceId && !/^[A-Z0-9-]+$/.test(formData.insuranceId))
    newErrors.insuranceId = "Invalid insurance ID";
  else if (formData.insuranceId && allPatients.some(p => p.insuranceId === formData.insuranceId))
    newErrors.insuranceId = "This insurance ID is already used";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true)
      const response = await axios.post(
        "https://1x5kkm9k-5000.asse.devtunnels.ms/api/v1/doctor/patient/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message || "Patient added successfully");
      navigate("/dashboard/patients");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "Server error");
      } else {
        alert("An unexpected error occurred");
      }
    } finally{
      setLoading(false)
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      city: '',
      insuranceId: '',
      address: '',
      email: '',
      phone: '',
      alternativePhone: '',
      status: 'ACTIVE',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen mt-6 p-6">
      <div className="py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <ChevronRight size={12} className="text-gray-500" />
          <span onClick={() => navigate('/dashboard')} className="text-gray-600 cursor-pointer">Dashboard</span>
          <ChevronRight size={12} className="text-gray-500" />
          <span onClick={() => navigate('/dashboard/patients')} className="text-gray-600 cursor-pointer">Patients</span>
          <ChevronRight size={12} className="text-gray-500" />
          <span className="text-[#171c35] font-semibold">Add Patient</span>
        </div>

        <h1 className="text-2xl font-bold text-[#171c35] mb-8">Add New Patient</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative">
          {/* Personal Info */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div className="relative">
                <label className={labelClass}>First Name *</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} placeholder="First Name" />
                {errors.firstName && <div className={errorClass}>{errors.firstName}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Last Name *</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="Last Name" />
                {errors.lastName && <div className={errorClass}>{errors.lastName}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Date of Birth *</label>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} className={inputClass} />
                {errors.dob && <div className={errorClass}>{errors.dob}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Gender *</label>
                <CustomDropdown value={formData.gender} onChange={(val) => handleDropdownChange("gender", val)} options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" }
                ]} placeholder="Select gender" />
                {errors.gender && <div className={errorClass}>{errors.gender}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Blood Group *</label>
                <CustomDropdown value={formData.bloodGroup} onChange={(val) => handleDropdownChange("bloodGroup", val)} options={[
                  { value: 'A_POS', label: 'A+' },
                  { value: 'A_NEG', label: 'A-' },
                  { value: 'B_POS', label: 'B+' },
                  { value: 'B_NEG', label: 'B-' },
                  { value: 'O_POS', label: 'O+' },
                  { value: 'O_NEG', label: 'O-' },
                  { value: 'AB_POS', label: 'AB+' },
                  { value: 'AB_NEG', label: 'AB-' },
                ]} placeholder="Select blood group" />
                {errors.bloodGroup && <div className={errorClass}>{errors.bloodGroup}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Marital Status *</label>
                <CustomDropdown value={formData.maritalStatus} onChange={(val) => handleDropdownChange("maritalStatus", val)} options={[
                  { value: "UNMARRIED", label: "Single" },
                  { value: "MARRIED", label: "Married" },
                  { value: "DIVORCED", label: "Divorced" },
                  { value: "WIDOWED", label: "Widowed" }
                ]} placeholder="Select marital status" />
                {errors.maritalStatus && <div className={errorClass}>{errors.maritalStatus}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Status</label>
                <CustomDropdown value={formData.status || 'ACTIVE'} onChange={(val) => handleDropdownChange("status", val)} options={[
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" }
                ]} placeholder="Select status" />
              </div>

              <div className="relative">
                <label className={labelClass}>Insurance ID</label>
                <input name="insuranceId" value={formData.insuranceId} onChange={handleChange} className={inputClass} placeholder="Insurance ID" />
                {errors.insuranceId && <div className={errorClass}>{errors.insuranceId}</div>}
              </div>

            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Contact & Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="relative">
                <label className={labelClass}>Email *</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="Email" />
                {errors.email && <div className={errorClass}>{errors.email}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Phone *</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Phone" />
                {errors.phone && <div className={errorClass}>{errors.phone}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>Alternative Phone</label>
                <input name="alternativePhone" value={formData.alternativePhone} onChange={handleChange} className={inputClass} placeholder="Alternative Phone" />
                {errors.alternativePhone && <div className={errorClass}>{errors.alternativePhone}</div>}
              </div>

              <div className="relative">
                <label className={labelClass}>City *</label>
                <input name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="City" />
                {errors.city && <div className={errorClass}>{errors.city}</div>}
              </div>

              <div className="relative lg:col-span-2">
                <label className={labelClass}>Address *</label>
                <input name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="Address" />
                {errors.address && <div className={errorClass}>{errors.address}</div>}
              </div>

            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#171c35] mb-6">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative">
                <label className={labelClass}>Name</label>
                <input name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className={inputClass} placeholder="Name" />
              </div>
              <div className="relative">
                <label className={labelClass}>Phone</label>
                <input name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} className={inputClass} placeholder="Phone" />
                {errors.emergencyContactPhone && <div className={errorClass}>{errors.emergencyContactPhone}</div>}
              </div>
              <div className="relative">
                <label className={labelClass}>Relationship</label>
                <input name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} className={inputClass} placeholder="Relationship" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button type="button" onClick={handleCancel} className="w-full px-6 py-3 bg-white border border-[#D0D5DD] rounded-[8px] text-sm font-medium text-[#111A2D] hover:bg-gray-50">Cancel</button>
            
              <button
  type="submit"
  disabled={loading}
  className={`w-full px-6 py-3 rounded-[8px] text-sm font-medium text-white transition-colors cursor-pointer
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#526FFF] hover:bg-[#4159cc]'}
  `}
>
  {loading ? 'Adding Patient...' : 'Add Patient'}
</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;

