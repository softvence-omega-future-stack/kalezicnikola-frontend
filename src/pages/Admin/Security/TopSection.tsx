import React from 'react';
import { useTranslation } from 'react-i18next';

const topSectionData = {
  title: {
    en: "Security & Audit",
    de: "Sicherheit & Prüfung"
  },
  description: {
    en: "GDPR compliance, access control, and audit trail management",
    de: "DSGVO-Konformität, Zugriffskontrolle und Audit-Trail-Management"
  }
};

const TopSection: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'de';

  return (
    <div className="max-[767px]:mt-6 flex flex-col gap-3">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack">
        {topSectionData.title[lang]}
      </h1>
      <p className='text-sm sm:text-base text-subHeadingBlack'>
        {topSectionData.description[lang]}
      </p>
    </div>
  );
};

export default TopSection;
