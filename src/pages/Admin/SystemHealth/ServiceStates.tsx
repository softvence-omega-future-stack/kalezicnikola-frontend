import React from 'react';

interface Service {
  name: string;
  uptime: string;
  latency: string;
  status: 'Operational' | 'Degraded';
}

const ServiceStatus: React.FC = () => {
  const services: Service[] = [
    { name: 'API Gateway', uptime: '99.98%', latency: '45ms', status: 'Operational' },
    { name: 'Database Primary', uptime: '99.98%', latency: '12ms', status: 'Operational' },
    { name: 'Database Replica', uptime: '99.98%', latency: '15ms', status: 'Operational' },
    { name: 'Voicebot Service', uptime: '99.98%', latency: '120ms', status: 'Operational' },
    { name: 'Authentication', uptime: '99.98%', latency: '8ms', status: 'Operational' },
    { name: 'Payment Gateway', uptime: '99.98%', latency: '250ms', status: 'Operational' },
  ];

  const getStatusColor = (status: string): string => {
    return status === 'Operational' ? 'bg-[#FF883D]' : 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4 -mt-2 ">
      <div className="">
        <div className="bg-white rounded-lg ">
          <div className="p-6 ">
            <h1 className="text-2xl font-semibold text-[#171C35]">Service Status</h1>
          </div>
          
          <div className=" ">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-2  transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-[#F3F6F6] bg-[#F3F6F6] p-5 rounded-3xl">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-[#171C35] mb-1">
                      {service.name}
                    </h2>
                    <p className="text-base text-[#111A2D]">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#171C35]">
                        {service.latency}
                      </p>
                      <p className="text-base text-[#667085]">Latency</p>
                    </div>
                    
                    <span 
                      className={`${getStatusColor(service.status)} text-white text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatus;