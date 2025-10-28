import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  phone: string;
  date: string;
}

const GridView: React.FC = () => {
      const navigate = useNavigate(); 
   const patients: Patient[] = [
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' },
    { id: 'SRN-10101', name: 'Floyd Miles', phone: '+88234565', date: '24-06-2024' }
  ];
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((patient, index) => (
              <div key={index} className=" rounded-3xl  p-6  border border-[#E8E8E8]">
                {/* Profile Section */}
                <div className="flex items-start gap-4 mb-6">
                  <div className=""> <img className="h-14 w-14 rounded-full" src="https://i.ibb.co.com/wh1X6vJn/Screenshot-2025-10-26-144913.png" alt="" /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[#171C35] mb-0.5">Floyd Miles</h3>
                    <p className="text-sm text-[#111A2D] font-medium">SRN-10101</p>
                  </div>
                </div>

         <div   className={`p-3 rounded-[16px] ${
    index === 1 ? 'bg-[#EEF1FF]' : 'bg-white'
  }`}>
                 {/* Contact Info */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
                  <div>
                    <p className="text-xs font-medium text-[#111A2D] mb-1">Telephone Number</p>
                    <p className="text-base font-semibold text-[#171C35]">+880 1234 56 78</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#111A2D] mb-1">Email</p>
                    <p className="text-base font-semibold text-[#171C35] truncate">username@gmail.com</p>
                  </div>
                </div>

                {/* Birthday */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#111A2D] mb-1">Birthday</p>
                  <p className="text-base font-normal text-[#171C35]">01-09-2025 at 10:01 AM</p>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-[#111A2D] mb-1">Address</p>
                  <p className="text-base font-normal text-[#171C35]">A-103, shyam gokul flats, Mahatma</p>
                </div>
         </div>

                {/* View Button */}
                <button        onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                  className={`w-full py-3 rounded-full font-medium transition-colors cursor-pointer ${
                    index === 1 
                      ? 'bg-[#526FFF] text-white ' 
                      : 'bg-white text-[#171C35] border border-[#E8E8E8] '
                  }`}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        
    </div>
  )
}

export default GridView