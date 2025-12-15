// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import PersonalInfo, { type StaffFormData } from "./PersonalInfo";  
// import EmployeeDetailsForm, { type EmploymentFormData } from "./EmployedForm";
// import home from "../../../../../assets/svgIcon/homeIcon.svg";
// import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
// import axios from "axios";
// import { useAppSelector } from "@/store/hook";
// import { toast } from "react-toastify";

// export default function AddNewStaff() {
//   const { t } = useTranslation();
//   const { accessToken } = useAppSelector((state)=> state.auth)
//   const [activeTab, setActiveTab] = useState("personal");
//   const navigate = useNavigate();

//   const [personalInfo, setPersonalInfo] = useState<StaffFormData>({
//   firstName: "",
//   lastName: "",
//   dob: "",
//   gender: "",
//   email: "",
//   phone: "",
//   address: "",
//   state: "",
//   postalCode: "",
//   country: "",
//   photo: undefined, // or { src: null, alt: "" }
// });


//   const [employmentInfo, setEmploymentInfo] = useState<EmploymentFormData>({
//     department: "",
//     reportingTo: "",
//     employmentType: "",
//     workSchedule: "",
//     workHours: "",
//   });
//   const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});
// const [employmentErrors, setEmploymentErrors] = useState<Record<string, string>>({});

//   const validateStaff = (): Partial<Record<keyof StaffFormData, string>> => {
//     const errors: Partial<Record<keyof StaffFormData, string>> = {};
//     if (!personalInfo.firstName) errors.firstName = "First name is required";
//     if (!personalInfo.lastName) errors.lastName = "Last name is required";
//     if (!personalInfo.dob) errors.dob = "Date of birth is required";
//     if (!personalInfo.gender) errors.gender = "Gender is required";
//     if (!personalInfo.email) errors.email = "Email is required";
//     if (!personalInfo.phone) errors.phone = "Phone is required";
//     if (!personalInfo.address) errors.address = "Address is required";
//     if (!personalInfo.state) errors.state = "State is required";
//     if (!personalInfo.postalCode) errors.postalCode = "Postal code is required";
//     if (!personalInfo.country) errors.country = "Country is required";
//     return errors;
//   };

// const validateEmployment = () => {
//   const errors: Record<string, string> = {};
//   if (!employmentInfo.employmentType) errors.employmentType = "EmploymentType is required";
//   if (!employmentInfo.department) errors.department = "Department is required";
//   // if (!employmentInfo.reportingTo) errors.reportingTo = "reportingTo is required";
//   if (!employmentInfo.workSchedule) errors.workSchedule = "Work Schedule is required";
//   if (!employmentInfo.workHours) errors.workHours = "Work Hours is required";
//   return errors;
// };


//   // Next button handler
//   // const handleNext = () => {
//   //   if (activeTab === "personal") {
//   //     setActiveTab("employment");
//   //   } else {
//   //     console.log("Form Data:", {
//   //       personal: "your personal info state here",
//   //       employment: "your employment info state here",
//   //     });
//   //     alert(t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.alert'));
//   //   }
//   // };
// const handleNextOrSubmit = async () => {
//   if (activeTab === "personal") {
//     const errors = validateStaff();
//     if (Object.keys(errors).length > 0) {
//       setPersonalErrors(errors); // save errors
//       toast.error("Please fill all required personal info fields.");
//       return;
//     }
//     setPersonalErrors({}); // clear errors if all filled
//     setActiveTab("employment");
//     return;
//   }


//   if (activeTab === "employment") {
//     const errors = validateEmployment();
//     if (Object.keys(errors).length > 0) {
//       toast.error("Please fill all required employment info fields.");
//       console.log(errors);
//       return;
//     }

//     // All validations passed, submit data
//     try {
//       const formData = new FormData();

//       // Append staff data
//       Object.entries(personalInfo).forEach(([key, value]) => {
//         if (key === "photo" && personalInfo.photo?.src) {
//           formData.append("photo", personalInfo.photo.src);
//         } else {
//           formData.append(key, value as string);
//         }
//       });

//       // Append employment data
//       Object.entries(employmentInfo).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       console.log(formData);

//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/doctor/add-staff`, formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Staff added successfully!");
//       console.log(response.data);
//       navigate("/dashboard/settings/myStaff"); // optional redirect
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add staff.");
//     }
//   }
// };



//   return (
//     <div className="min-h-screen mt-6 ">
//       <div className="p-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-base py-6 text-gray-600 ">
//           <img src={home} alt="" />
//           <span onClick={()=> navigate('/dashboard')} className="cursor-pointer">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.dashboard')}
//           </span>
//           <img src={chevron} alt="" />
//           <span onClick={()=> navigate('/dashboard/settings')} className="cursor-pointer">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.settings')}
//           </span>
//           <img src={chevron} alt="" />
//           <span className="text-[#171c35] font-medium">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.myStaff')}
//           </span>
//         </div>

//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-[#171c35] mb-1">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.pageTitle')}
//           </h1>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-xl p-6 md:p-8">
//           <h2 className="text-[#171C35] font-medium text-lg ">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.title')}
//           </h2>
//           <p className="text-[#667085] text-sm font-medium mb-4 ">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.description')}
//           </p>

//           {/* Tabs */}
//           <div className="flex flex-col md:flex-row gap-2 mb-8 bg-[#FAFAFA] rounded-xl py-2 px-5">
//             <button
//               onClick={() => setActiveTab("personal")}
//               className={`px-6 py-2.5 text-base font-medium rounded-full transition-colors cursor-pointer ${
//                 activeTab === "personal"
//                   ? "bg-[#DCE2FF] text-[#171c35]"
//                   : "text-[#667085]"
//               }`}
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personal')}
//             </button>
//             <button
//               onClick={() => setActiveTab("employment")}
//               className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors cursor-pointer ${
//                 activeTab === "employment"
//                   ? "bg-[#DCE2FF] text-[#171c35]"
//                   : "text-[#667085]"
//               }`}
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employment')}
//             </button>
//           </div>

//           {/* Main content */}
//           <div className="space-y-6">
//             {activeTab === "personal" && (
//               <PersonalInfo
//                 data={personalInfo}
//                 setData={setPersonalInfo}
//                 errors={setPersonalErrors}
//               />
//             )}

//             {activeTab === "employment" && (
//               <EmployeeDetailsForm
//                 data={employmentInfo}
//                 setData={setEmploymentInfo}
//               />
//             )}

//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//             <button className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-[#171c35] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.cancel')}
//             </button>

//             <button
//               onClick={handleNextOrSubmit}
//               className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors"
//             >
//               {activeTab === "personal" 
//                 ? t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.next') 
//                 : t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.save')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import PersonalInfo, { type StaffFormData } from "./PersonalInfo";  
// import EmployeeDetailsForm, { type EmploymentFormData } from "./EmployedForm";
// import home from "../../../../../assets/svgIcon/homeIcon.svg";
// import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
// import axios from "axios";
// import { useAppSelector } from "@/store/hook";
// import { toast } from "react-toastify";

// export default function AddNewStaff() {
//   const { t } = useTranslation();
//   const { accessToken } = useAppSelector((state)=> state.auth)
//   const [activeTab, setActiveTab] = useState<"personal" | "employment">("personal");
//   const navigate = useNavigate();

//   // Staff info state
//   const [personalInfo, setPersonalInfo] = useState<StaffFormData>({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     email: "",
//     phone: "",
//     presentAddress: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     nationality: "",
//     photo: undefined,
//   });

//   // Employment info state
//   const [employmentInfo, setEmploymentInfo] = useState<EmploymentFormData>({
//     employmentId:"",
//     department: "",
//     reportingTo: "",
//     employmentType: "",
//     workSchedule: "",
//     weeklyHours: "",
//   });

//   // Errors state
//   const [personalErrors, setPersonalErrors] = useState<Partial<Record<keyof StaffFormData, string>>>({});
//   const [employmentErrors, setEmploymentErrors] = useState<Record<string, string>>({});

//   // Validation functions
//   const validateStaff = (): Partial<Record<keyof StaffFormData, string>> => {
//     const errors: Partial<Record<keyof StaffFormData, string>> = {};
//     if (!personalInfo.firstName) errors.firstName = "First name is required";
//     if (!personalInfo.lastName) errors.lastName = "Last name is required";
//     if (!personalInfo.dob) errors.dob = "Date of birth is required";
//     if (!personalInfo.gender) errors.gender = "Gender is required";
//     if (!personalInfo.email) errors.email = "Email is required";
//     if (!personalInfo.phone) errors.phone = "Phone is required";
//     if (!personalInfo.presentAddress) errors.presentAddress = "Address is required";
//     if (!personalInfo.state) errors.state = "State is required";
//     if (!personalInfo.postalCode) errors.postalCode = "Postal code is required";
//     if (!personalInfo.nationality) errors.nationality = "Nationality is required";
//     if (!personalInfo.country) errors.country = "Country is required";
//     return errors;
//   };

//   const validateEmployment = (): Record<string, string> => {
//     const errors: Record<string, string> = {};
//     if (!employmentInfo.employmentId) errors.employmentId = "Employment Id is required";
//     // if (!employmentInfo.employmentType) errors.employmentType = "Employment Type is required";
//     // if (!employmentInfo.department) errors.department = "Department is required";
//     // if (!employmentInfo.reportingTo) errors.reportingTo = "Reporting To is required";
//     // if (!employmentInfo.workSchedule) errors.workSchedule = "Work Schedule is required";
//     // if (!employmentInfo.weeklyHours) errors.weeklyHours = "Work Hours are required";
//     return errors;
//   };

//   // Handle Next / Submit
//   const handleNextOrSubmit = async () => {
//     if (activeTab === "personal") {
//       const errors = validateStaff();
//       if (Object.keys(errors).length > 0) {
//         setPersonalErrors(errors);
//         toast.error("Please fill all required personal info fields.");
//         return;
//       }
//       setPersonalErrors({});
//       setActiveTab("employment");
//       return;
//     }

//     if (activeTab === "employment") {
//       const errors = validateEmployment();
//       if (Object.keys(errors).length > 0) {
//         setEmploymentErrors(errors);
//         toast.error("Please fill all required employment info fields.");
//         return;
//       }
//       setEmploymentErrors({});
//       try {
// const payload = {
//   firstName: personalInfo.firstName,
//   lastName: personalInfo.lastName,
//   dob: personalInfo.dob,
//   gender: personalInfo.gender,
//   email: personalInfo.email,
//   phone: personalInfo.phone,
//   presentAddress: personalInfo.presentAddress,
//   state: personalInfo.state,
//   postalCode: personalInfo.postalCode,
//   nationality: personalInfo.nationality,
//   country: personalInfo.country,
//   employmentId: employmentInfo.employmentId,
//   department: employmentInfo.department,
//   reportingTo: employmentInfo.reportingTo,
//   employmentType: employmentInfo.employmentType,
//   workSchedule: employmentInfo.workSchedule,
//   weeklyHours: employmentInfo.weeklyHours
// };

// const response = await axios.post(
//   `${import.meta.env.VITE_API_URL}/doctor/add-staff`,
//   payload,
//   {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json"
//     },
//   }
// );


//         toast.success("Staff added successfully!");
//         console.log(response.data);
//         navigate("/dashboard/settings/myStaff");

//       } catch (err: any) {
//         console.error(err);
//         toast.error(err?.response?.data?.message || "Failed to add staff.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen mt-6 ">
//       <div className="p-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-base py-6 text-gray-600 ">
//           <img src={home} alt="" />
//           <span onClick={()=> navigate('/dashboard')} className="cursor-pointer">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.dashboard')}
//           </span>
//           <img src={chevron} alt="" />
//           <span onClick={()=> navigate('/dashboard/settings')} className="cursor-pointer">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.settings')}
//           </span>
//           <img src={chevron} alt="" />
//           <span className="text-[#171c35] font-medium">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.myStaff')}
//           </span>
//         </div>

//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-[#171c35] mb-1">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.pageTitle')}
//           </h1>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-xl p-6 md:p-8">
//           <h2 className="text-[#171C35] font-medium text-lg ">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.title')}
//           </h2>
//           <p className="text-[#667085] text-sm font-medium mb-4 ">
//             {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.description')}
//           </p>

//           {/* Tabs */}
//           <div className="flex flex-col md:flex-row gap-2 mb-8 bg-[#FAFAFA] rounded-xl py-2 px-5">
//             <button
//               onClick={() => setActiveTab("personal")}
//               className={`px-6 py-2.5 text-base font-medium rounded-full transition-colors cursor-pointer ${
//                 activeTab === "personal"
//                   ? "bg-[#DCE2FF] text-[#171c35]"
//                   : "text-[#667085]"
//               }`}
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personal')}
//             </button>
//             <button
//               onClick={() => setActiveTab("employment")}
//               className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors cursor-pointer ${
//                 activeTab === "employment"
//                   ? "bg-[#DCE2FF] text-[#171c35]"
//                   : "text-[#667085]"
//               }`}
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employment')}
//             </button>
//           </div>

//           {/* Main content */}
//           <div className="space-y-6">
//             {activeTab === "personal" && (
//               <PersonalInfo
//                 data={personalInfo}
//                 setData={setPersonalInfo}
//                 errors={personalErrors}
//               />
//             )}

//             {activeTab === "employment" && (
//               <EmployeeDetailsForm
//                 data={employmentInfo}
//                 setData={setEmploymentInfo}
//                 errors={employmentErrors}
//               />
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//             <button
//               onClick={() => navigate("/dashboard/settings")}
//               className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-[#171c35] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//             >
//               {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.cancel')}
//             </button>

//             <button
//               onClick={handleNextOrSubmit}
//               className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors"
//             >
//               {activeTab === "personal" 
//                 ? t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.next') 
//                 : t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.save')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonalInfo, { type StaffFormData } from "./PersonalInfo";  
import EmployeeDetailsForm, { type EmploymentFormData } from "./EmployedForm";
import home from "../../../../../assets/svgIcon/homeIcon.svg";
import chevron from "../../../../../assets/svgIcon/chevronnRight.svg";
import axios from "axios";
import { useAppSelector } from "@/store/hook";
import { toast } from "react-toastify";

export default function AddNewStaff() {
  const { t } = useTranslation();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<"personal" | "employment">("personal");
  const navigate = useNavigate();

  // Staff info state
  const [personalInfo, setPersonalInfo] = useState<StaffFormData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    presentAddress: "",
    state: "",
    postalCode: "",
    country: "",
    nationality: "",
    photo: undefined,
  });

  // Employment info state
  const [employmentInfo, setEmploymentInfo] = useState<EmploymentFormData>({
    employmentId: "",
    department: "",
    reportingTo: "",
    employmentType: "",
    workSchedule: "",
    weeklyHours: "",
  });

  // Errors state
  const [personalErrors, setPersonalErrors] = useState<Partial<Record<keyof StaffFormData, string>>>({});
  const [employmentErrors, setEmploymentErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateStaff = (): Partial<Record<keyof StaffFormData, string>> => {
    const errors: Partial<Record<keyof StaffFormData, string>> = {};
    if (!personalInfo.firstName) errors.firstName = "First name is required";
    if (!personalInfo.lastName) errors.lastName = "Last name is required";
    if (!personalInfo.dob) errors.dob = "Date of birth is required";
    if (!personalInfo.gender) errors.gender = "Gender is required";
    if (!personalInfo.email) errors.email = "Email is required";
    if (!personalInfo.phone) errors.phone = "Phone is required";
    if (!personalInfo.presentAddress) errors.presentAddress = "Address is required";
    if (!personalInfo.state) errors.state = "State is required";
    if (!personalInfo.postalCode) errors.postalCode = "Postal code is required";
    if (!personalInfo.nationality) errors.nationality = "Nationality is required";
    if (!personalInfo.country) errors.country = "Country is required";
    return errors;
  };

  const validateEmployment = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!employmentInfo.employmentId) errors.employmentId = "Employment Id is required";
    return errors;
  };
  
  // Handle Next / Submit
  const handleNextOrSubmit = async () => {
    if (activeTab === "personal") {
      const errors = validateStaff();
      if (Object.keys(errors).length > 0) {
        setPersonalErrors(errors);
        toast.error("Please fill all required personal info fields.");
        return;
      }
      setPersonalErrors({});
      setActiveTab("employment");
      return;
    }

    if (activeTab === "employment") {
      const errors = validateEmployment();
      if (Object.keys(errors).length > 0) {
        setEmploymentErrors(errors);
        toast.error("Please fill all required employment info fields.");
        return;
      }
      setEmploymentErrors({});

      try {
  
// If user selected a photo, use it (optional)
// Otherwise, use a default backend path
const getPhotoPath = (file: File | undefined) => {
  if (!file) {
    return "/api/v1/uploads/default-user.png"; // default placeholder already on backend
  }
  // Cannot dynamically create a backend path without upload
  return "/api/v1/uploads/default-user.png";
};


        // Prepare JSON payload
        const payload = {
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          dob: new Date(personalInfo.dob).toISOString(),
          gender: personalInfo.gender,
          email: personalInfo.email,
          phone: personalInfo.phone,
          presentAddress: personalInfo.presentAddress,
          state: personalInfo.state,
          postalCode: personalInfo.postalCode,
          nationality: personalInfo.nationality,
          country: personalInfo.country,
          employmentId: employmentInfo.employmentId,
          department: employmentInfo.department || null,
          reportingTo: employmentInfo.reportingTo || null,
          employmentType: employmentInfo.employmentType || null,
          workSchedule: employmentInfo.workSchedule || null,
          weeklyHours: employmentInfo.weeklyHours || null,
          photo: getPhotoPath(personalInfo.photo) ,
        };

        console.log(payload)


        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/doctor/add-staff`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
          }
        );

        toast.success("Staff added successfully!");
        console.log(response.data);
        navigate("/dashboard/settings");
      } catch (err: any) {
        console.error(err);
        const message = err?.response?.data?.message || "Failed to add staff.";
        toast.error(message);
      }
    }
  };

  return (
    <div className="min-h-screen mt-6 ">
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-base py-6 text-gray-600 ">
          <img src={home} alt="" />
          <span onClick={() => navigate("/dashboard")} className="cursor-pointer">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.dashboard')}
          </span>
          <img src={chevron} alt="" />
          <span onClick={() => navigate("/dashboard/settings")} className="cursor-pointer">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.settings')}
          </span>
          <img src={chevron} alt="" />
          <span className="text-[#171c35] font-medium">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.breadcrumb.myStaff')}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#171c35] mb-1">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.header.pageTitle')}
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-6 md:p-8">
          <h2 className="text-[#171C35] font-medium text-lg ">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.title')}
          </h2>
          <p className="text-[#667085] text-sm font-medium mb-4 ">
            {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.card.description')}
          </p>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 mb-8 bg-[#FAFAFA] rounded-xl py-2 px-5">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2.5 text-base font-medium rounded-full transition-colors cursor-pointer ${
                activeTab === "personal" ? "bg-[#DCE2FF] text-[#171c35]" : "text-[#667085]"
              }`}
            >
              {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.personal')}
            </button>
           <button
  onClick={() => setActiveTab("employment")}
  className={`px-6 py-2.5 text-md font-semibold rounded-full transition-colors cursor-pointer ${
    activeTab === "employment" ? "bg-[#DCE2FF] text-[#171c35]" : "text-[#667085]"
  }`}
>
  {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.stafTabs.employment')}
</button>

          </div>

          {/* Main content */}
          <div className="space-y-6">
            {activeTab === "personal" && (
              <PersonalInfo data={personalInfo} setData={setPersonalInfo} errors={personalErrors} />
            )}

            {activeTab === "employment" && (
              <EmployeeDetailsForm data={employmentInfo} setData={setEmploymentInfo} errors={employmentErrors} />
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-[#171c35] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.cancel')}
            </button>

            <button
  onClick={handleNextOrSubmit}
  className="w-full px-6 py-3 text-sm font-medium cursor-pointer text-white bg-[#526FFF] rounded-xl focus:outline-none transition-colors"
>
  {activeTab === "personal"
    ? t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.next')
    : t('dashboard.routes.settings.settingsSidebar.tabs.myStaff.addNewStaff.buttons.save')}
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
