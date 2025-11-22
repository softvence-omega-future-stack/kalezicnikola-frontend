import React, { useState } from 'react';
import profile from '../../../assets/svgIcon/recentDoctor.svg'

interface RequestData {
  id: number;
  name: string;
  avatar: string;
  doctorId: string;
  plan: string;
  requestStatus: 'Accept' | 'Pending' | 'Reject';
}

const Checkout: React.FC = () => {
  const [requests, setRequests] = useState<RequestData[]>([
    { id: 1, name: 'Alex', avatar: '', doctorId: 'CUST-001', plan: 'Professional', requestStatus: 'Accept' },
    { id: 2, name: 'Sarah', avatar: '', doctorId: 'CUST-001', plan: 'Basic', requestStatus: 'Pending' },
    { id: 3, name: 'John', avatar: '', doctorId: 'CUST-001', plan: 'Enterprise', requestStatus: 'Pending' },
    { id: 4, name: 'Robert Fox', avatar: '', doctorId: 'CUST-001', plan: 'Professional', requestStatus: 'Pending' },
    { id: 5, name: 'Jerome Bell', avatar: '', doctorId: 'CUST-001', plan: 'Professional', requestStatus: 'Pending' },
    { id: 6, name: 'Cody Fisher', avatar: '', doctorId: 'CUST-001', plan: 'Professional', requestStatus: 'Reject' },
  ]);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, requestStatus: 'Accept' as const } : req
    ));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, requestStatus: 'Reject' as const } : req
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accept':
        return 'bg-[#0089331A] text-[#008933]';
      case 'Pending':
        return 'bg-[#DD8F001A] text-[#DD8F00]';
      case 'Reject':
        return 'bg-[#FF1C331A] text-[#FF1C33]';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Accept':
        return ' Accept';
      case 'Pending':
        return 'Pending';
      case 'Reject':
        return 'Reject';
      default:
        return status;
    }
  };

  return (
    <div className=" bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">
      <div className="">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-headingBlack mb-1">Request</h1>
          <p className="text-sm text-[#667085]">Total 6 checkout request</p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block  rounded-lg  overflow-hidden pr-10">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full  border-spacing-x-4">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className=" px-4 py-4 text-left text-base font-semibold text-headingBlack">Name</th>
                  <th className=" px-4 py-4 text-left text-base font-semibold text-headingBlack">Doctor ID</th>
                  <th className=" px-4 py-4 text-left text-base font-semibold text-headingBlack">Plan</th>
                  <th className=" px-4 py-4 text-left text-base font-semibold text-headingBlack">Request</th>
                  <th className=" px-4 py-4 text-center text-base font-semibold text-headingBlack">Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors ">
                    {/* Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img src={profile} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-[#45464E]">{request.name}</span>
                      </div>
                    </td>

                    {/* Doctor ID */}
                    <td className="px-4 py-4 text-sm font-medium text-subHeadingBlack whitespace-nowrap">
                      {request.doctorId}
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-4 text-sm font-medium text-subHeadingBlack">{request.plan}</td>

                    {/* Request */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 h-8 w-24  justify-center rounded-full text-sm font-medium ${getStatusBadge(
                          request.requestStatus
                        )}`}
                      >
                        {request.requestStatus === 'Accept' && (
                          <span className="w-2.5 h-2.5 bg-[#008933] rounded-full inline-block"></span>
                        )}
                        {getStatusText(request.requestStatus)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {request.requestStatus === 'Accept' ? (
                          <span className="px-5 py-1.5 bg-[#008933] text-white rounded-full text-sm font-medium min-w-[110px]">
                            Accepted
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="px-4 py-1.5 bg-[#526FFF] text-white rounded-full text-sm font-medium transition-colors"
                            >
                              Approved
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="px-5 py-1.5 border border-gray-200 text-[#171c35] rounded-full text-sm font-medium transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl shrink-0">
                  <img src={profile} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-headingBlack">{request.name}</h3>
                  <p className="text-sm text-gray-600">{request.doctorId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Plan</p>
                  <p className="text-headingBlack font-medium">{request.plan}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Request</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.requestStatus)}`}>
                    {getStatusText(request.requestStatus)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {request.requestStatus === 'Accept' ? (
                  <button className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium cursor-pointer">
                    Accepted
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 px-4 py-2 border border-gray-200 text-headingBlack rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Checkout;