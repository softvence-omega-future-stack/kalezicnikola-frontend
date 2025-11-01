
interface Incidents {
  name: string;
  desc: string;
  time: string;
  status: 'Investigating' | 'Resolved';
}

const RecentIncidents = () => {
      const incidents: Incidents[] = [
    { name: 'Payment Gateway Degradation', desc: 'Increased latency detected on payment processing service', time: '2 hours ago', status: 'Investigating' },
    { name: 'Database Replica Failover', desc: 'Automatic failover completed successfully', time: '3 hours ago', status: 'Resolved' },
 
  ];

  const getStatusColor = (status: string): string => {
    return status === 'Investigating' ? 'bg-[#A052FF1A] text-[#A052FF]' : 'text-[#526FFF] bg-[#526FFF1A] ';
  };
  return (
    <div>
        <div className="bg-white rounded-lg mt-6 p-6">
          <div className="p-6 ">
            <h1 className="text-2xl font-semibold text-[#171C35]">Recent Incidents</h1>
          </div>
          
          <div className=" ">
            {incidents.map((inciden, index) => (
              <div 
                key={index} 
                className="p-2  transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-[#F3F6F6] bg-[#F3F6F6] p-5 rounded-3xl">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-[#171C35] mb-1">
                      {inciden.name}
                    </h2>
                    <p className="text-base text-[#111A2D]">
                    {inciden.desc}
                    </p>
                      <p className="text-base text-[#111A2D]">
                        {inciden.time}
                      </p>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6">
                 
                    
                    <span 
                      className={`${getStatusColor(inciden.status)}  text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap`}
                    >
                      {inciden.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default RecentIncidents
