import React from 'react';
import { useTranslation } from 'react-i18next';

// JSON data
const serviceData = {
  title: {
    en: "Service Status",
    de: "Dienststatus"
  },
  services: [
    { name: { en: "API Gateway", de: "API-Gateway" }, uptime: "99.98%", latency: "45ms", status: { en: "Operational", de: "Betriebsbereit" } },
    { name: { en: "Database Primary", de: "Primäre Datenbank" }, uptime: "99.98%", latency: "12ms", status: { en: "Operational", de: "Betriebsbereit" } },
    { name: { en: "Database Replica", de: "Datenbank-Replikat" }, uptime: "99.98%", latency: "15ms", status: { en: "Operational", de: "Betriebsbereit" } },
    { name: { en: "Voicebot Service", de: "Voicebot-Dienst" }, uptime: "99.98%", latency: "120ms", status: { en: "Operational", de: "Betriebsbereit" } },
    { name: { en: "Authentication", de: "Authentifizierung" }, uptime: "99.98%", latency: "8ms", status: { en: "Operational", de: "Betriebsbereit" } },
    { name: { en: "Payment Gateway", de: "Zahlungs-Gateway" }, uptime: "99.98%", latency: "250ms", status: { en: "Operational", de: "Betriebsbereit" } }
  ]
};

const ServiceStatus: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'de';

  const getStatusColor = (status: string): string => {
    return status === serviceData.services[0].status.en ? 'bg-[#FF883D]' : 'bg-[#FF883D]';
  };

  return (
    <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-headingBlack">
          {serviceData.title[lang]}
        </h1>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {serviceData.services.map((service, index) => (
          <div key={index} className="transition-colors duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 border border-[#F3F6F6] bg-[#F3F6F6] p-4 md:p-5 rounded-2xl md:rounded-3xl">
              
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-headingBlack mb-1">
                  {service.name[lang]}
                </h2>
                <p className="text-sm md:text-base text-subHeadingBlack">
                  Uptime: {service.uptime}
                </p>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <div className="text-right sm:text-left">
                  <p className="text-base md:text-lg font-semibold text-headingBlack">
                    {service.latency}
                  </p>
                  <p className="text-xs md:text-base text-[#667085]">Latency</p>
                </div>
                
                <span 
                  className={`${getStatusColor(service.status[lang])} text-white text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full whitespace-nowrap`}
                >
                  {service.status[lang]}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceStatus;
