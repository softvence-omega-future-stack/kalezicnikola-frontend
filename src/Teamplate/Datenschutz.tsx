import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const privacyData = {
  title: {
    en: "Privacy Policy",
    de: "Datenschutzerklärung",
  },

  intro: {
    en: "We take the protection of your personal data very seriously. This privacy policy informs you about the most important aspects of data processing on our website.",
    de: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung auf unserer Website.",
  },

  contact: {
    title: {
      en: "Contact with us",
      de: "Kontakt mit uns",
    },
    text: {
      en: "If you contact us via form on the website or by email, your provided data will be stored for processing your request. We do not share these data without your consent.",
      de: "Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
    },
  },

  cookies: {
    title: {
      en: "Cookies",
      de: "Cookies",
    },
    text: {
      en: "Our website uses cookies to improve the user experience. Cookies remain stored on your device until you delete them.",
      de: "Unsere Website verwendet Cookies, um die Nutzererfahrung zu verbessern. Cookies bleiben auf Ihrem Gerät gespeichert, bis Sie diese löschen.",
    },
  },

  analytics: {
    title: {
      en: "Web Analytics",
      de: "Web-Analyse",
    },
    text: {
      en: "Our website uses analytics tools to analyze user behavior. The data is anonymized and cannot be traced back to you personally.",
      de: "Unsere Website verwendet Analysetools, um das Nutzerverhalten auszuwerten. Die Daten werden anonymisiert und können nicht auf Sie persönlich zurückgeführt werden.",
    },
  },

  rights: {
    title: {
      en: "Your Rights",
      de: "Ihre Rechte",
    },
    list: {
      en: [
        "Right to access your data",
        "Right to correction",
        "Right to deletion",
        "Right to data portability",
        "Right to withdraw consent",
      ],
      de: [
        "Recht auf Auskunft",
        "Recht auf Berichtigung",
        "Recht auf Löschung",
        "Recht auf Datenübertragbarkeit",
        "Recht auf Widerruf",
      ],
    },
  },

  contactDetails: {
    title: {
      en: "Responsible for Data Protection",
      de: "Verantwortlich für den Datenschutz",
    },
    company: "Docline",
    address1: "Pfarrgasse 7/12",
    address2: "6460 Imst",
    country: { en: "Austria", de: "Österreich" },
    email: "info@docline.ai",
    web: "www.docline.ai",
  },
};

const Datenschutz = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "de" ? "de" : "en";

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container w-[93%] mx-auto mt-24 mb-10 p-4 sm:p-6 lg:p-10 text-gray-800 leading-relaxed">

      {/* ===================== TITLE ===================== */}
      <h1
        className="relative w-fit mx-auto text-2xl sm:text-3xl md:text-[44px] text-headingBlack font-semibold mb-8 text-center
        after:content-[''] after:block after:w-20 after:h-[2px] after:bg-gray-300 after:mx-auto after:mt-5"
      >
        {privacyData.title[lang]}
      </h1>

      <p className="text-sm sm:text-base md:text-lg max-w-[900px] mx-auto text-subHeadingBlack text-center mb-10 leading-[140%]">
        {privacyData.intro[lang]}
      </p>

      {/* ===================== CONTACT ===================== */}
      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl text-headingBlack font-semibold mb-6">
          {privacyData.contact.title[lang]}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-subHeadingBlack leading-[140%]">
          {privacyData.contact.text[lang]}
        </p>
      </section>

      {/* ===================== COOKIES ===================== */}
      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl text-headingBlack font-semibold mb-6">
          {privacyData.cookies.title[lang]}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-subHeadingBlack leading-[140%]">
          {privacyData.cookies.text[lang]}
        </p>
      </section>

      {/* ===================== ANALYTICS ===================== */}
      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl text-headingBlack font-semibold mb-6">
          {privacyData.analytics.title[lang]}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-subHeadingBlack leading-[140%]">
          {privacyData.analytics.text[lang]}
        </p>
      </section>

      {/* ===================== USER RIGHTS ===================== */}
      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl text-headingBlack font-semibold mb-6">
          {privacyData.rights.title[lang]}
        </h2>

        <ul className="list-disc pl-5 space-y-2">
          {privacyData.rights.list[lang].map((item, index) => (
            <li key={index} className="text-sm sm:text-base md:text-lg text-subHeadingBlack">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ===================== RESPONSIBLE ===================== */}
      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl text-headingBlack font-semibold mb-6">
          {privacyData.contactDetails.title[lang]}
        </h2>

        <p className="text-base sm:text-lg leading-7">{privacyData.contactDetails.company}</p>
        <p className="text-base sm:text-lg leading-7">{privacyData.contactDetails.address1}</p>
        <p className="text-base sm:text-lg leading-7">{privacyData.contactDetails.address2}</p>
        <p className="text-base sm:text-lg leading-7 mb-4">
          {privacyData.contactDetails.country[lang]}
        </p>

        <p className="text-base sm:text-lg">
          <span className="font-semibold">Email:</span>{" "}
          <a href={`mailto:${privacyData.contactDetails.email}`} className="text-[#526FFF] hover:text-blue-600 underline">
            {privacyData.contactDetails.email}
          </a>
        </p>

        <p className="text-base sm:text-lg">
          <span className="font-semibold">Web:</span>{" "}
          <a
            href={`https://${privacyData.contactDetails.web}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#526FFF] hover:text-blue-600 underline"
          >
            {privacyData.contactDetails.web}
          </a>
        </p>
      </section>
    </div>
  );
};

export default Datenschutz;





// import  { useState } from 'react';

// import { FiLock, FiShield, FiDatabase, FiUserCheck, FiDownload, FiTrash2 } from 'react-icons/fi';

// const Datenschutz = () => {
//   const [activeSection, setActiveSection] = useState<string | null>(null);

//   const hospitalInfo = {
//     name: "Your Hospital Name",
//     dpoName: "Mr. Mohammad Karim",
//     dpoEmail: "dpo@hospitalname.com",
//     dpoPhone: "+880-2-XXXX-XXXX",
//     authority: "Information Rights Directorate, Dhaka",
//     dataRetention: {
//       medicalRecords: "10 Years",
//       accessLogs: "2 Years",
//       inactiveAccounts: "1 Year"
//     }
//   };

//   const sections = [
//     { id: 'intro', title: 'Introduction' },
//     { id: 'data-types', title: 'Types of Data Collected' },
//     { id: 'purpose', title: 'Purpose of Data Collection' },
//     { id: 'legal-basis', title: 'Legal Basis for Processing' },
//     { id: 'sharing', title: 'Data Sharing' },
//     { id: 'security', title: 'Data Security' },
//     { id: 'retention', title: 'Data Retention Periods' },
//     { id: 'rights', title: 'Your Rights' },
//     { id: 'cookies', title: 'Cookie Policy' },
//     { id: 'contact', title: 'Contact Information' }
//   ];

//   return (
//     <>
//       <div className='pt-[100px]'>
//         <title>Datenschutz - Privacy Policy | {hospitalInfo.name}</title>
//         <meta name="description" content="Hospital Data Privacy Policy (GDPR/HIPAA Compliant)" />
//       </div>

//       <div className="min-h-screen  py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
//               <FiLock className="w-10 h-10 text-blue-600" />
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//               Datenschutz - Data Privacy Policy
//             </h1>
//             <p className="text-gray-600 max-w-3xl mx-auto">
//               {hospitalInfo.name} is committed to protecting the privacy of patients and users
//               <span className="block text-sm text-blue-500 mt-1">
//                 GDPR/HIPAA Compliant | Last Updated: {new Date().toLocaleDateString('en-US')}
//               </span>
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar Navigation */}
//             <div className="lg:w-1/4">
//               <div className="bg-white rounded-xl shadow-lg p-5 sticky top-8">
//                 <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
//                   <FiDatabase className="mr-2" /> Policy Contents
//                 </h3>
//                 <nav className="space-y-2">
//                   {sections.map((section) => (
//                     <button
//                       key={section.id}
//                       onClick={() => setActiveSection(section.id)}
//                       className={`w-full text-left px-4 py-3 rounded-lg transition ${activeSection === section.id
//                           ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
//                           : 'text-gray-700 hover:bg-gray-50'
//                         }`}
//                     >
//                       {section.title}
//                     </button>
//                   ))}
//                 </nav>

//                 <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                   <h4 className="font-medium text-gray-800 mb-2 flex items-center">
//                     <FiShield className="mr-2" /> Important
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     This policy is legally binding. Please read completely before use.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:w-3/4">
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
//                 {/* Section 1: Introduction */}
//                 <section id="intro" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     1. Introduction
//                   </h2>
//                   <div className="prose prose-lg max-w-none text-gray-700">
//                     <p className="mb-4">
//                       {hospitalInfo.name} is committed to protecting the privacy of patients and users.
//                       This policy explains how we collect, use, protect, and share data.
//                     </p>
//                     <div className="bg-blue-50 p-5 rounded-lg my-5">
//                       <p className="font-medium text-blue-800">
//                         <span className="font-bold">Important:</span> This policy is fully compliant with 
//                         HIPAA (Health Insurance Portability and Accountability Act) and 
//                         GDPR (General Data Protection Regulation).
//                       </p>
//                     </div>
//                   </div>
//                 </section>

//                 {/* Section 2: Data Types */}
//                 <section id="data-types" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     2. Types of Data Collected
//                   </h2>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {/* User Data Card */}
//                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//                       <div className="flex items-center mb-4">
//                         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                           <FiUserCheck className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-800">a. User/Doctor Data</h3>
//                       </div>
//                       <ul className="space-y-2 text-gray-700">
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
//                           Name, contact information, qualifications
//                         </li>
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
//                           Login credentials
//                         </li>
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
//                           Access logs and activities
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Patient Data Card */}
//                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//                       <div className="flex items-center mb-4">
//                         <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
//                           <FiLock className="w-5 h-5 text-red-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-800">b. Patient Data (PHI)</h3>
//                       </div>
//                       <ul className="space-y-2 text-gray-700">
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
//                           Personal information (name, age, gender)
//                         </li>
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
//                           Medical history
//                         </li>
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
//                           Diagnosis and treatment information
//                         </li>
//                         <li className="flex items-start">
//                           <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
//                           Lab reports and images
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </section>

//                 {/* Section 3: Purpose */}
//                 <section id="purpose" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     3. Purpose of Data Collection
//                   </h2>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {[
//                       { title: "Providing Medical Services", color: "green" },
//                       { title: "Ensuring Patient Safety", color: "blue" },
//                       { title: "Fulfilling Legal Obligations", color: "purple" },
//                       { title: "Internal Research", desc: "(Anonymized Data)", color: "orange" }
//                     ].map((item, index) => (
//                       <div key={index} className={`bg-${item.color}-50 p-5 rounded-lg border border-${item.color}-200`}>
//                         <div className="flex items-center mb-2">
//                           <div className={`w-8 h-8 bg-${item.color}-100 rounded-lg flex items-center justify-center mr-3`}>
//                             <span className={`font-bold text-${item.color}-600`}>{index + 1}</span>
//                           </div>
//                           <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                         </div>
//                         {item.desc && <p className="text-gray-600 text-sm ml-11">{item.desc}</p>}
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Section 4: Legal Basis */}
//                 <section id="legal-basis" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     4. Legal Basis for Data Processing
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl">
//                     <ol className="space-y-4 list-decimal pl-5 text-gray-700">
//                       <li className="pl-2">
//                         <span className="font-medium">Patient Consent</span> - Written/digital consent before treatment
//                       </li>
//                       <li className="pl-2">
//                         <span className="font-medium">Medical Necessity</span> - For life-saving treatment
//                       </li>
//                       <li className="pl-2">
//                         <span className="font-medium">Legal Obligation</span> - Government directive or court order
//                       </li>
//                     </ol>
//                   </div>
//                 </section>

//                 {/* Section 5: Data Sharing */}
//                 <section id="sharing" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     5. Data Sharing and Recipients
//                   </h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="font-semibold text-gray-800 mb-3 text-lg">We Share Data Only With:</h3>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         {[
//                           "Other Doctors (Referral System)",
//                           "Labs and Diagnostic Centers",
//                           "Insurance Companies (When Required)",
//                           "Law Enforcement Agencies (By Order)"
//                         ].map((item, index) => (
//                           <div key={index} className="flex items-center bg-white p-4 rounded-lg border">
//                             <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
//                               ✓
//                             </div>
//                             <span className="text-gray-700">{item}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
//                       <h3 className="font-semibold text-gray-800 mb-2">Third-Party Service Providers:</h3>
//                       <p className="text-gray-700 mb-2">We use only GDPR/HIPAA compliant services:</p>
//                       <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                         <li>Cloud Hosting (AWS/GCP/Azure - HIPAA Compliant)</li>
//                         <li>Security Audit Firms (Under NDA)</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </section>

//                 {/* Section 6: Security */}
//                 <section id="security" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     6. Data Security Measures
//                   </h2>
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {[
//                       { title: "Encryption", desc: "AES-256 (In Transit & At Rest)", icon: "🔐" },
//                       { title: "Access Control", desc: "Role-Based (RBAC)", icon: "👥" },
//                       { title: "Audit Logs", desc: "Complete Access Tracking", icon: "📊" },
//                       { title: "Regular Audits", desc: "Annual Security Checks", icon: "🔍" },
//                       { title: "HIPAA Compliant", desc: "HIPAA/GDPR Certified", icon: "🏥" },
//                       { title: "Data Backup", desc: "Daily Encrypted Backups", icon: "💾" }
//                     ].map((item, index) => (
//                       <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition">
//                         <div className="text-2xl mb-3">{item.icon}</div>
//                         <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
//                         <p className="text-gray-600 text-sm">{item.desc}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Section 7: Retention */}
//                 <section id="retention" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     7. Data Retention Periods
//                   </h2>
//                   <div className="bg-gray-50 p-6 rounded-xl">
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Data Type</th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Retention Period</th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Legal Basis</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                           <tr>
//                             <td className="px-4 py-3 text-gray-700">Patient Medical Records</td>
//                             <td className="px-4 py-3">
//                               <span className="font-medium text-blue-600">{hospitalInfo.dataRetention.medicalRecords}</span>
//                             </td>
//                             <td className="px-4 py-3 text-gray-600 text-sm">Bangladesh Medical Act 2019</td>
//                           </tr>
//                           <tr className="bg-white">
//                             <td className="px-4 py-3 text-gray-700">Doctor Access Logs</td>
//                             <td className="px-4 py-3">
//                               <span className="font-medium text-blue-600">{hospitalInfo.dataRetention.accessLogs}</span>
//                             </td>
//                             <td className="px-4 py-3 text-gray-600 text-sm">Internal Security Policy</td>
//                           </tr>
//                           <tr>
//                             <td className="px-4 py-3 text-gray-700">Inactive Accounts</td>
//                             <td className="px-4 py-3">
//                               <span className="font-medium text-blue-600">{hospitalInfo.dataRetention.inactiveAccounts}</span>
//                             </td>
//                             <td className="px-4 py-3 text-gray-600 text-sm">Data Minimization Policy</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </section>

//                 {/* Section 8: User Rights */}
//                 <section id="rights" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     8. Your Rights (According to GDPR)
//                   </h2>
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {[
//                       { title: "Right of Access", icon: <FiDownload />, desc: "Right to view your data" },
//                       { title: "Right to Rectification", icon: "✏️", desc: "Correct inaccurate information" },
//                       { title: "Right to Erasure", icon: <FiTrash2 />, desc: "Right to delete your data" },
//                       { title: "Right to Restriction", icon: "⏸️", desc: "Restrict processing of data" },
//                       { title: "Right to Data Portability", icon: "📤", desc: "Right to transfer your data" },
//                       { title: "Right to Object", icon: "✋", desc: "Object to data processing" }
//                     ].map((right, index) => (
//                       <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow transition">
//                         <div className="flex items-center mb-3">
//                           <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                             <span className="text-indigo-600 text-lg">{right.icon}</span>
//                           </div>
//                           <h4 className="font-semibold text-gray-800">{right.title}</h4>
//                         </div>
//                         <p className="text-gray-600 text-sm">{right.desc}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Section 9: Cookies */}
//                 <section id="cookies" className="mb-10 scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     9. Cookies and Tracking
//                   </h2>
//                   <div className="bg-green-50 p-6 rounded-xl">
//                     <div className="flex items-start mb-4">
//                       <div className="bg-green-100 p-3 rounded-lg mr-4">
//                         <span className="text-green-600 font-bold">✓</span>
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-800 mb-2">We Use Only Essential Cookies:</h3>
//                         <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                           <li>Session Cookies (Login Status)</li>
//                           <li>Security Cookies (User Authentication)</li>
//                           <li>Preference Cookies (Language, Theme Settings)</li>
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
//                       <p className="text-red-700 font-medium">
//                         <span className="font-bold">No:</span> We do not use any third-party tracking, advertising, or analytics cookies.
//                       </p>
//                     </div>
//                   </div>
//                 </section>

//                 {/* Section 10: Contact */}
//                 <section id="contact" className="scroll-mt-20">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
//                     10. Contact Information
//                   </h2>
//                   <div className="bg-blue-50 p-6 rounded-xl">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                       <div>
//                         <h3 className="font-bold text-gray-800 text-lg mb-2">Data Protection Officer (DPO)</h3>
//                         <p className="text-gray-700 mb-1">
//                           <span className="font-medium">Name:</span> {hospitalInfo.dpoName}
//                         </p>
//                         <p className="text-gray-700 mb-1">
//                           <span className="font-medium">Email:</span> {hospitalInfo.dpoEmail}
//                         </p>
//                         <p className="text-gray-700">
//                           <span className="font-medium">Phone:</span> {hospitalInfo.dpoPhone}
//                         </p>
//                       </div>
//                       <div className="mt-4 md:mt-0">
//                         <div className="bg-white p-4 rounded-lg inline-block">
//                           <p className="text-gray-600 text-sm mb-1">Contact if needed:</p>
//                           <p className="font-bold text-blue-600">{hospitalInfo.authority}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-8 p-6 bg-gray-900 text-white rounded-xl">
//                     <h3 className="font-bold text-lg mb-3">Right to Modify</h3>
//                     <p className="mb-3">
//                       We reserve the right to make necessary changes to this policy. 
//                       Changes will be posted on this page and email notifications will be sent if necessary.
//                     </p>
//                     <p className="text-gray-300 text-sm">
//                       <span className="font-medium">Policy Date:</span> {new Date().toLocaleDateString('en-US')}<br />
//                       <span className="font-medium">Effective Date:</span> {new Date().toLocaleDateString('en-US')}
//                     </p>
//                   </div>
//                 </section>

//                 {/* Footer */}
//                 <div className="mt-12 pt-8 border-t border-gray-200 text-center">
//                   <button
//                     onClick={() => window.print()}
//                     className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-4"
//                   >
//                     🖨️ Print This Page
//                   </button>
//                   <button
//                     onClick={() => window.history.back()}
//                     className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//                   >
//                     ← Back to Previous Page
//                   </button>
//                   <p className="text-gray-500 text-sm mt-6">
//                     © {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
//                     <br />
//                     This policy is legally binding and created in accordance with HIPAA/GDPR.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Datenschutz;