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
      <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl mt-4">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-headingBlack">Recent Bot Interactions</h2>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm md:text-base font-semibold text-headingBlack">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm md:text-base font-semibold text-headingBlack">User</th>
                <th className="px-4 py-3 text-left text-sm md:text-base font-semibold text-headingBlack">Action</th>
                <th className="px-4 py-3 text-left text-sm md:text-base font-semibold text-headingBlack">Details</th>
                <th className="px-4 py-3 text-left text-sm md:text-base font-semibold text-headingBlack">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {botInteractions.map((interaction) => (
                <tr key={interaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-subHeadingBlack whitespace-nowrap">
                    {interaction.timestamp}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-subHeadingBlack whitespace-nowrap">
                    {interaction.user}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-subHeadingBlack whitespace-nowrap">
                    {interaction.action}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-subHeadingBlack">
                    {interaction.details}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`sm:px-4 whitespace-nowrap inline-flex items-center justify-center px-3 py-1 gap-1 rounded-full text-sm font-medium ${
                      interaction.severity === 'high'
                        ? 'bg-[#FF2F2F1A] text-[#FF2F2F]'
                        : 'bg-[#A052FF1A] text-[#A052FF]'
                    }`}>
                      {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {botInteractions.map((interaction) => (
            <div key={interaction.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                {/* Header with User and Severity */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-headingBlack text-sm">{interaction.user}</h3>
                    <p className="text-xs text-gray-500 mt-1">{interaction.timestamp}</p>
                  </div>
                  <span className={`inline-flex items-center w-[109px] justify-center px-3 py-1 gap-1 rounded-full text-xs font-medium ${
                    interaction.severity === 'high'
                      ? 'bg-[#FF2F2F1A] text-[#FF2F2F]'
                      : 'bg-[#A052FF1A] text-[#A052FF]'
                  }`}>
                    {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                  </span>
                </div>

                {/* Action */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Action</p>
                  <p className="text-sm font-medium text-subHeadingBlack">{interaction.action}</p>
                </div>

                {/* Details */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Details</p>
                  <p className="text-sm font-medium text-subHeadingBlack leading-relaxed">
                    {interaction.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button for mobile */}
        <div className="lg:hidden mt-6 text-center">
          <button className="text-[#526FFF]  font-medium text-sm transition-colors">
            Show More Interactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterActions;