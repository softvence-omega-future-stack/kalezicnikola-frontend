import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  insuranceId: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
}
interface ListViewProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

const ListView = ({ patients, loading, error }: ListViewProps) => {
  const navigate = useNavigate()
  
  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;


  //const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // ✅ Toggle single row selection
  // const toggleRowSelection = (id: string) => {
  //   setSelectedRows(prev =>
  //     prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
  //   );
  // };

  // const toggleAllRows = () => {
  //   if (selectedRows.length === patients.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(patients.map(patient => patient.id));
  //   }
  // };
  return (
    <div>
      <div className="bg-white rounded-2xl  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">
                  <div className="flex items-center gap-2">

                    Insurance Id
                  </div>
                </th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">Name</th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">Phone Number</th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">Date</th>
                <th className="px-2 sm:px-4 py-2 text-left text-sm md:text-base font-semibold text-[#171C35]">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients?.map((patient) => (
                <tr key={patient.id} className=" transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 ">

                      {patient.insuranceId}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-normal text-[#171C35] whitespace-nowrap">{patient.firstName} {patient.lastName}</td>
                  <td className="px-6 py-4 text-sm font-normal text-[#171C35]">{patient.phone}</td>

                  <td className="px-6 py-4 text-sm font-normal text-[#171C35]">{patient.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
                      className="flex items-center gap-1 text-lg font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      View
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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

export default ListView