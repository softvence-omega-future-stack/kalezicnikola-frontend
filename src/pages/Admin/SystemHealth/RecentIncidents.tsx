import React from 'react';
import { useTranslation } from 'react-i18next';

// JSON data for translation
const incidentData = {
  title: {
    en: "Recent Incidents",
    de: "Neueste Vorfälle"
  },
  incidents: [
    { 
      name: { en: "Payment Gateway Degradation", de: "Zahlungs-Gateway-Leistungsabfall" }, 
      desc: { en: "Increased latency detected on payment processing service", de: "Erhöhte Latenz beim Zahlungsdienst festgestellt" },
      time: "2 hours ago",
      status: { en: "Investigating", de: "Untersuchen" }
    },
    { 
      name: { en: "Database Replica Failover", de: "Datenbank-Replikat-Failover" }, 
      desc: { en: "Automatic failover completed successfully", de: "Automatisches Failover erfolgreich abgeschlossen" },
      time: "3 hours ago",
      status: { en: "Resolved", de: "Gelöst" }
    },
  ]
};

const RecentIncidents: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'de';

  const getStatusColor = (status: string): string => {
    return status === incidentData.incidents[0].status.en ? 'bg-[#A052FF1A] text-[#A052FF]' : 'text-[#526FFF] bg-[#526FFF1A]';
  };

  return (
    <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 mt-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-headingBlack">
          {incidentData.title[lang]}
        </h1>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {incidentData.incidents.map((incident, index) => (
          <div key={index} className="transition-colors duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 border border-[#F3F6F6] bg-[#F3F6F6] p-4 md:p-5 rounded-2xl md:rounded-3xl">
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-headingBlack mb-1">
                  {incident.name[lang]}
                </h2>
                <p className="text-sm md:text-base text-subHeadingBlack mb-2">
                  {incident.desc[lang]}
                </p>
                <p className="text-xs md:text-sm text-[#667085]">
                  {incident.time}
                </p>
              </div>
              
              <div className="flex items-center justify-end mt-2 sm:mt-0">
                <span 
                  className={`${getStatusColor(incident.status[lang])} text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full whitespace-nowrap`}
                >
                  {incident.status[lang]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentIncidents;
