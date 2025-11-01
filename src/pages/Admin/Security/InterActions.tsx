

interface BotInteraction {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  severity: 'medium' | 'high';
}
const InterActions = () => {
      const botInteractions: BotInteraction[] = [
    { id: 1, timestamp: '01-09-2025 at 10:32:15', user: 'Alex', action: 'Login Success', details: 'Successful login', severity: 'medium' },
    { id: 2, timestamp: '01-09-2025 at 10:32:15', user: 'Alex', action: 'Customer Status Change', details: 'Changed status of CUST-003 from Active to Suspended', severity: 'high' },
    { id: 3, timestamp: '01-09-2025 at 10:32:15', user: 'John', action: 'System Configuration', details: 'Updated API rate limiting configuration', severity: 'medium' },
    { id: 4, timestamp: '01-09-2025 at 10:32:15', user: 'Sarah', action: 'Customer Data Access', details: 'Viewed customer details for CUST-001', severity: 'medium' },
    { id: 5, timestamp: '01-09-2025 at 10:32:15', user: 'Robert Fox', action: 'Login Failed', details: 'Failed login', severity: 'high' },
  ];
  return (
    <div>
       {/* Recent Bot Interactions Section */}
        <div className="bg-white rounded-2xl mt-4">
          <div className="p-6 ">
            <h2 className="text-2xl font-semibold text-[#171C35]">Recent Bot Interactions</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Timestamp</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">User</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Action</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Details</th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {botInteractions.map((interaction) => (
                  <tr key={interaction.id} className=" transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{interaction.timestamp}</td>
                    <td className="px-6 py-4 text-sm text-[#111A2D]">{interaction.user}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{interaction.action}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{interaction.details}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center px-3 py-1 gap-1 rounded-full text-sm h-8 w-[110px] font-medium ${
                        interaction.severity === 'high'
                          ? 'bg-[#FF2F2F1A] text-[#FF2F2F]'
                          : 'bg-[#A052FF1A] text-[#A052FF]'
                      }`}>
                        {interaction.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default InterActions
