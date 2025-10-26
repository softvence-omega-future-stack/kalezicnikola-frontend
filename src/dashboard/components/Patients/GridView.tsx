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
              <div key={index} className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                {/* Profile Section */}
                <div className="flex items-start gap-4 mb-6">
                  <div className=""> <img className="h-14 w-14 rounded-full" src="https://i.ibb.co.com/wh1X6vJn/Screenshot-2025-10-26-144913.png" alt="" /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-700 mb-0.5">Floyd Miles</h3>
                    <p className="text-lg text-gray-900 font-Normal">SRN-10101</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Telephone Number</p>
                    <p className="text-lg font-semibold text-gray-900">+880 1234 56 78</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Email</p>
                    <p className="text-lg font-semibold text-gray-900 truncate">username@gmail.com</p>
                  </div>
                </div>

                {/* Birthday */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-800 mb-1">Birthday</p>
                  <p className="text-lg font-normal text-gray-900">01-09-2025 at 10:01 AM</p>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-800 mb-1">Address</p>
                  <p className="text-lg font-normal text-gray-900">A-103, shyam gokul flats, Mahatma</p>
                </div>

                {/* View Button */}
                <button        onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                  className={`w-full py-3 rounded-full font-medium transition-colors ${
                    index === 1 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
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