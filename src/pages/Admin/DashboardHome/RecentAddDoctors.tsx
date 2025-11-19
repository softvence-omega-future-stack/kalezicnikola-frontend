import docprofile from '../../../assets/svgIcon/recentDoctor.svg';

const RecentAddDoctors = () => {
  interface Doctor {
    id: string;
    name: string;
    specialist: string;
    joiningDate: string;
  }

  const recentDoctors: Doctor[] = [
    { id: 'CUST-001', name: 'William Brooks', specialist: 'Cardiologist', joiningDate: '20-Jun-2025' },
    { id: 'CUST-002', name: 'Sarah Johnson', specialist: 'Dermatologist', joiningDate: '22-Jun-2025' },
  ];

  return (
    <div className="flex justify-center">
      <div
        className="bg-white p-4 mt-4 rounded-3xl w-full max-w-md sm:max-w-lg md:w-[388px]"
      >
        <div className="mb-4 mt-3">
          <h2 className="text-xl font-semibold text-[#171C35] mb-0 text-center md:text-left">
            Recent Add Doctor
          </h2>
          <p className="text-sm text-[#111A2D] text-center md:text-left">
            Last 7 days you have join 02 New Doctor.
          </p>
        </div>

        <div className="space-y-3">
          {recentDoctors.map((doctor, index) => (
            <div key={index} className="bg-[#F5F6FF] rounded-2xl p-4">
              <div className="flex flex-col max-[767px]:items-center sm:flex-row gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                  <img src={docprofile} alt="" />
                </div>
                <div className="flex-1 max-[767px]:text-center min-w-0">
                  <h3 className="font-semibold text-[#171c35] text-base mb-0.5 sm:text-left">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-[#667085] font-semibold mb-2 sm:text-left">
                    Doctor ID: {doctor.id}
                  </p>
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row justify-between text-sm">
                      <span className="text-[#111A2D]">Specialist</span>
                      <span className="text-[#667085] mt-1 sm:mt-0">Joining Date</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-sm">
                      <span className="font-semibold text-[#171c35]">{doctor.specialist}</span>
                      <span className="font-semibold text-[#171c35] mt-1 sm:mt-0">{doctor.joiningDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAddDoctors;
