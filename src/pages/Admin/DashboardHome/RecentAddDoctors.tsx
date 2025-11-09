
import docprofile from '../../../assets/svgIcon/recentDoctor.svg'

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
    <div>
        <div className="bg-white p-4 mt-4 rounded-3xl  " style={{ width: '388px' }}>
          <div className="mb-4 mt-3 ">
            <h2 className="text-xl font-semibold text-[#171C35] mb-0">Recent Add Doctor</h2>
            <p className="text-sm text-[#111A2D]">Last 7 days you have join 02 New Doctor.</p>
          </div>

          <div className="space-y-3">
            {recentDoctors.map((doctor, index) => (
              <div key={index} className="bg-[#F5F6FF] rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <img src={docprofile} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#171c35] text-base mb-0.5">{doctor.name}</h3>
                    <p className="text-xs text-[#667085] font-semibold mb-2">Doctor ID: {doctor.id}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#111A2D] text-sm">Specialist</span>
                        <span className="text-[#667085] text-sm">Joining Date</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-[#171c35]">{doctor.specialist}</span>
                        <span className="font-semibold text-[#171c35]">{doctor.joiningDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default RecentAddDoctors