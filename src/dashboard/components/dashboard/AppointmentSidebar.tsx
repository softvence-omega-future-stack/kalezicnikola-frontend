import { useAppSelector } from '@/store/hook';
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AppointmentItemProps {
  name: string;
  timeRange: string;
  isNew?: boolean;
}

interface Appointment {
  id: string;
  name: string;
  timeRange: string;
  isNew?: boolean;
  details?: {
    phone: string;
    diagnosis: string;
    time: string;
    avatarUrl: string;
  };
}

interface ApiAppointment {
  id: string;
  patientId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  appointmentDetails: string | null;
  scheduleSlot: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, timeRange, isNew }) => {
  const { t } = useTranslation();

  return (
    <div className={`p-4 rounded-xl transition-colors ${isNew ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
      <div className="flex justify-between items-center">
        <p className="text-[#171C35] font-semibold text-base leading-snug">{name}</p>
        {isNew && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
            {t('dashboard.routes.dashboard.appointments.newBadge')}
          </span>
        )}
      </div>
      <p className="text-sm text-[#111A2D]">{timeRange}</p>
    </div>
  );
};

interface ActiveAppointmentProps {
  data: Appointment['details'] & { name: string };
}

const ActiveAppointmentCard: React.FC<ActiveAppointmentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 mb-4 bg-[#F5F6FF] rounded-xl border border-gray-100">
      <div className="flex items-start mb-4">
        <img
          src={data.avatarUrl}
          alt={data.name}
          className="h-14 w-14 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold text-[#171C35] leading-snug">{data.name}</p>
          <p className="text-sm text-[#111A2D]">{data.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-[#111A2D] tracking-wider mb-1">
            {t('dashboard.routes.dashboard.appointments.diagnosis')}
          </p>
          <p className="text-base font-semibold text-[#111A2D]">{data.diagnosis}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#111A2D] tracking-wider mb-1">
            {t('dashboard.routes.dashboard.appointments.time')}
          </p>
          <p className="text-base font-semibold text-[#171C35]">{data.time}</p>
        </div>
      </div>
    </div>
  );
};

const AppointmentsList: React.FC = () => {
  const { t } = useTranslation();
  const {accessToken} = useAppSelector((state)=> state.auth);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Transform API appointment into Appointment type
  const transformApiAppointment = (apiAppt: ApiAppointment): Appointment => ({
    id: apiAppt.id,
    name: apiAppt.firstName && apiAppt.lastName 
      ? `${apiAppt.firstName} ${apiAppt.lastName}`
      : 'Unknown Patient',
    timeRange: `${apiAppt.scheduleSlot.startTime} - ${apiAppt.scheduleSlot.endTime}`,
    details: apiAppt.phone
      ? {
          phone: apiAppt.phone,
          diagnosis: apiAppt.appointmentDetails || 'N/A',
          time: `${apiAppt.scheduleSlot.startTime} - ${apiAppt.scheduleSlot.endTime}`,
          avatarUrl: 'https://via.placeholder.com/150',
        }
      : undefined,
  });

  React.useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointment/scheduled-today`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Access the appointments correctly
      const appointmentsArray = res.data.data?.appointments || [];

      const mapped: Appointment[] = appointmentsArray.map(transformApiAppointment);
      setAppointments(mapped);
      console.log(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);
// Helper to add ordinal suffix
function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const today = new Date();
const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
const dateWithOrdinal = getOrdinal(today.getDate());

const formattedToday = `${dayName}, ${dateWithOrdinal}`;

console.log(formattedToday); // Wednesday, 10th

  if (loading) return <p>Loading appointments...</p>;

  const activeAppointment = appointments.find(a => a.details);
  const otherAppointments = appointments.filter(a => !a.details || a.id !== activeAppointment?.id);

  return (
    <div className="bg-white px-3 py-4 w-full md:rounded-3xl">
      <div className="mb-6">
        <h2 className="text-sm leading-3.5 mb-1.5 text-[#111A2D] capitalize">
          {/* {t('dashboard.routes.dashboard.appointments.dateFormat')} */}
          {formattedToday}
        </h2>
        {
          activeAppointment && activeAppointment.details ? (
            <p className="text-lg font-semibold leading-4 text-[#171C35]">
              {t('dashboard.routes.dashboard.appointments.patients', { count: appointments.length - 1 })}
            </p>
          ) : (
            <p className="text-lg font-semibold leading-4 text-[#171C35]">
              No appointments today
            </p>
          )
        }
      </div>

      <div className="space-y-2">
        {activeAppointment && activeAppointment.details && (
          <ActiveAppointmentCard data={{ ...activeAppointment.details, name: activeAppointment.name }} />
        )}

        {otherAppointments.map(a => (
          <AppointmentItem key={a.id} name={a.name} timeRange={a.timeRange} isNew={a.isNew} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;

// import React from 'react';
// import { useTranslation } from 'react-i18next';

// interface AppointmentItemProps {
//   name: string;
//   timeRange: string;
//   isNew?: boolean;
// }

// interface Appointment {
//   id: number;
//   name: string;
//   timeRange: string;
//   isNew?: boolean;

//   details?: {
//     phone: string;
//     diagnosis: string;
//     time: string;
//     avatarUrl: string;
//   };
// }

// const mockAppointments: Appointment[] = [
//   {
//     id: 1,
//     name: 'William Brooks',
//     timeRange: '9:30 - 09:45 AM',
//     details: {
//       phone: '+123456789',
//       diagnosis: 'Headache',
//       time: '9:30 - 09:45 AM',
//       avatarUrl: 'https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png',
//     },
//   },
//   { id: 2, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM', isNew: true },
//   { id: 3, name: 'Bessie Cooper', timeRange: '08:00 - 09:00 AM' },
//   { id: 4, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
//   { id: 5, name: 'Ronald Richards', timeRange: '08:00 - 09:00 AM' },
//   { id: 6, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
//   { id: 7, name: 'Esther Howard', timeRange: '08:00 - 09:00 AM' },
//   { id: 8, name: 'Floyd Miles', timeRange: '08:00 - 09:00 AM' },
//   { id: 9, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
// ];

// const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, timeRange, isNew }) => {
//   const { t } = useTranslation();
  
//   return (
//     <div className={`p-4 rounded-xl transition-colors ${isNew ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
//       <div className="flex justify-between items-center">
//         <p className="text-[#171C35] font-semibold text-base leading-snug">{name}</p>
//         {isNew && (
//           <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
//             {t('dashboard.routes.dashboard.appointments.newBadge')}
//           </span>
//         )}
//       </div>
//       <p className="text-sm text-[#111A2D]">{timeRange}</p>
//     </div>
//   );
// };


// interface ActiveAppointmentProps {
//   data: Appointment['details'] & { name: string };
// }

// const ActiveAppointmentCard: React.FC<ActiveAppointmentProps> = ({ data }) => {
//   const { t } = useTranslation();
  
//   return (
//     <div className="p-4 mb-4 bg-[#F5F6FF] rounded-xl border border-gray-100">
      
//       {/* Top Row: Avatar and Name/Phone */}
//       <div className="flex items-start mb-4">
//         <img
//           src={data.avatarUrl}
//           alt={data.name}
//           className="h-14 w-14 rounded-full object-cover mr-4"
//         />
//         <div>
//           <p className="text-lg font-semibold text-[#171C35] leading-snug">{data.name}</p>
//           <p className="text-sm text-[#111A2D]">{data.phone}</p>
//         </div>
//       </div>
      
//       {/* Bottom Row: Diagnosis and Time */}
//       <div className="grid grid-cols-2 gap-2">
//         <div>
//           <p className="text-sm text-[#111A2D] tracking-wider mb-1">
//             {t('dashboard.routes.dashboard.appointments.diagnosis')}
//           </p>
//           <p className="text-base font-semibold text-[#111A2D]">{data.diagnosis}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-[#111A2D] tracking-wider mb-1">
//             {t('dashboard.routes.dashboard.appointments.time')}
//           </p>
//           <p className="text-base font-semibold text-[#171C35]">{data.time}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main List Component ---
// const AppointmentsList: React.FC = () => {
//   const { t } = useTranslation();
//   const activeAppointment = mockAppointments.find(a => a.details);

//   return (
//     <div className="bg-white px-3 py-4 w-full md:rounded-3xl">
      
//       {/* List Header */}
//       <div className="mb-6">
//         <h2 className="text-sm leading-3.5 mb-1.5 text-[#111A2D]">
//           {t('dashboard.routes.dashboard.appointments.dateFormat')}
//         </h2>
//         <p className="text-lg font-semibold leading-4 text-[#171C35]">
//           {t('dashboard.routes.dashboard.appointments.patients', { count: mockAppointments.length })}
//         </p>
//       </div>
      
//       {/* Appointment List Items */}
//       <div className="space-y-2">
//         {/* Render the Active Card first */}
//         {activeAppointment && activeAppointment.details && (
//           <ActiveAppointmentCard 
//             data={{ ...activeAppointment.details, name: activeAppointment.name }} 
//           />
//         )}

//         {/* Render the rest of the list items */}
//         {mockAppointments
//           .filter(a => !a.details) 
//           .map((appointment) => (
//             <AppointmentItem 
//               key={appointment.id}
//               name={appointment.name}
//               timeRange={appointment.timeRange}
//               isNew={appointment.isNew}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default AppointmentsList;