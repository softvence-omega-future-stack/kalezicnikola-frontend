import { useAppSelector } from '@/store/hook';
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import dummyImage from '../../../assets/img/dummyImage.svg';
import i18n from '@/i18n/i18n';

interface AppointmentItemProps {
  name: string;
  timeRange: string;
  isNew?: boolean;
}

interface Appointment {
  id: string;
  name: string;
  timeRange: string;
  appointmentDate: string;
  isNew?: boolean;
  isActive?: boolean;
  details?: {
    phone: string;
    diagnosis: string;
    time: string;
    avatarUrl: string;
  };
}

interface ApiAppointment {
  id: number;
  patientId: string;
  doctorId: string; // এটা important
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  appointmentDetails: string | null;
  appointmentDate: string;
  scheduleSlot: {
    id: string;
    startTime: string;
    endTime: string;
  };
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}

interface AppointmentsListProps {
  selectedDate: Date;
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
      <p className="text-sm text-subHeadingBlack">{timeRange}</p>
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
          src={dummyImage}
          alt={data.name}
          className="h-14 w-14 bg-gray-300 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold text-[#171C35] leading-snug">{data.name}</p>
          <p className="text-sm text-subHeadingBlack">{data.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-subHeadingBlack tracking-wider mb-1">
            {t('dashboard.routes.dashboard.appointments.diagnosis')}
          </p>
          <p className="text-base font-semibold text-subHeadingBlack">{data.diagnosis}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-subHeadingBlack tracking-wider mb-1">
            {t('dashboard.routes.dashboard.appointments.time')}
          </p>
          <p className="text-base font-semibold text-[#171C35]">{data.time}</p>
        </div>
      </div>
    </div>
  );
};

const AppointmentsList: React.FC<AppointmentsListProps> = ({ selectedDate }) => {
  const { t } = useTranslation();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Current doctor ID - Redux state থেকে নিন
  const currentDoctorId = user?.id || user?.doctorId; // আপনার structure অনুযায়ী adjust করুন

  // Format date to YYYY-MM-DD
  const formatDateToString = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if selected date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDateToString(date) === formatDateToString(today);
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    
    const fetchAppointments = async () => {
      if (!accessToken || !currentDoctorId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const selectedDateString = formatDateToString(selectedDate);
        let allAppointments: Appointment[] = [];

        // If today, fetch scheduled-today for active appointment
        if (isToday(selectedDate)) {
          try {
            const todayRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/appointment/scheduled-today`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                signal: abortController.signal,
              }
            );

            const todayAppointments = todayRes.data.data?.appointments || [];
            
            // Filter only current doctor's appointments
            const filteredTodayAppointments = todayAppointments.filter(
              (appt: ApiAppointment) => appt.doctorId === currentDoctorId
            );
            
            // Transform today's appointments with active flag and full details
            const transformedToday = filteredTodayAppointments.map((appt: ApiAppointment) => ({
              id: String(appt.id),
              name: appt?.patient?.firstName && appt?.patient?.lastName 
                ? `${appt.patient.firstName} ${appt.patient.lastName}`
                : appt?.firstName && appt?.lastName
                ? `${appt.firstName} ${appt.lastName}`
                : 'Unknown Patient',
              timeRange: `${appt.scheduleSlot.startTime} - ${appt.scheduleSlot.endTime}`,
              appointmentDate: formatDateToString(appt.appointmentDate),
              isActive: true,
              details: {
                phone: appt?.patient?.phone || appt.phone || 'N/A',
                diagnosis: appt.appointmentDetails || 'N/A',
                time: `${appt.scheduleSlot.startTime} - ${appt.scheduleSlot.endTime}`,
                avatarUrl: dummyImage,
              },
            }));
            
            allAppointments = [...transformedToday];
          } catch (todayErr) {
            console.error('Error fetching today scheduled:', todayErr);
          }
        }

        // Fetch all appointments
        const allRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/appointment/all?page=1&limit=1000`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: abortController.signal,
          }
        );

        const allAppointmentsRaw = allRes.data.data?.appointments || [];
        
        // Filter and transform all appointments - শুধু current doctor এর
        const transformedAll = allAppointmentsRaw
          .filter((appt: ApiAppointment) => appt.doctorId === currentDoctorId) // এই line add করা হয়েছে
          .map((appt: ApiAppointment) => ({
            id: String(appt.id),
            name: appt?.patient?.firstName && appt?.patient?.lastName 
              ? `${appt.patient.firstName} ${appt.patient.lastName}`
              : appt?.firstName && appt?.lastName
              ? `${appt.firstName} ${appt.lastName}`
              : 'Unknown Patient',
            timeRange: `${appt.scheduleSlot.startTime} - ${appt.scheduleSlot.endTime}`,
            appointmentDate: formatDateToString(appt.appointmentDate),
            isActive: false,
            details: (appt?.patient?.phone || appt.phone) ? {
              phone: appt?.patient?.phone || appt.phone || 'N/A',
              diagnosis: appt.appointmentDetails || 'N/A',
              time: `${appt.scheduleSlot.startTime} - ${appt.scheduleSlot.endTime}`,
              avatarUrl: dummyImage,
            } : undefined,
          }));

        // Filter by selected date
        const filteredAll = transformedAll.filter((appt: Appointment) => 
          appt.appointmentDate === selectedDateString
        );

        // Merge: Remove duplicates (prefer scheduled-today version with active flag)
        const todayIds = new Set(allAppointments.map(a => a.id));
        const uniqueFromAll = filteredAll.filter((appt: Appointment) => !todayIds.has(appt.id));

        allAppointments = [...allAppointments, ...uniqueFromAll];

        setAppointments(allAppointments);
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.code !== 'ECONNABORTED') {
          console.error('Error fetching appointments:', err);
        }
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      abortController.abort();
    };
  }, [selectedDate, accessToken, currentDoctorId]); // currentDoctorId dependency add করা হয়েছে

  const localeMap: Record<string, string> = {
    en: 'en-US',
    de: 'de-DE',
  };

  const locale = localeMap[i18n.language] || 'en-US';
  const dayName = selectedDate.toLocaleDateString(locale, { weekday: 'long' });
  const dateWithOrdinal = selectedDate?.getDate();
  const formattedDate = `${dayName}, ${dateWithOrdinal}`;

  if (loading) {
    return (
      <div className="bg-white px-3 py-4 w-full md:rounded-3xl">
        <p className="text-center text-gray-500 py-8">Loading appointments...</p>
      </div>
    );
  }

  // Find active appointment (first one with isActive flag and details)
  const activeAppointment = appointments.find(a => a.isActive && a.details);
  
  // Other appointments (exclude the active one)
  const otherAppointments = appointments.filter(a => 
    !a.isActive || a.id !== activeAppointment?.id
  );

  return (
    <div className="bg-white px-3 py-4 w-full md:rounded-3xl">
      <div className="mb-6">
        <h2 className="text-sm leading-3.5 mb-1.5 text-subHeadingBlack capitalize">
          {formattedDate}
        </h2>
        {appointments.length > 0 ? (
          <p className="text-lg font-semibold leading-4 text-[#171C35]">
            {t('dashboard.routes.dashboard.appointments.patients', { count: appointments.length })}
          </p>
        ) : (
          <p className="text-lg font-semibold leading-4 text-[#171C35]">
            {t('dashboard.routes.dashboard.appointments.noAppointments')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        {/* Active appointment card with special styling - only on today */}
        {activeAppointment && activeAppointment.details && (
          <ActiveAppointmentCard 
            data={{ 
              ...activeAppointment.details, 
              name: activeAppointment.name 
            }} 
          />
        )}

        {/* Other appointments - normal cards */}
        {otherAppointments.map(a => (
          <AppointmentItem 
            key={a.id} 
            name={a.name} 
            timeRange={a.timeRange} 
            isNew={a.isNew} 
          />
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
//       <p className="text-sm text-subHeadingBlack">{timeRange}</p>
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
//           <p className="text-sm text-subHeadingBlack">{data.phone}</p>
//         </div>
//       </div>
      
//       {/* Bottom Row: Diagnosis and Time */}
//       <div className="grid grid-cols-2 gap-2">
//         <div>
//           <p className="text-sm text-subHeadingBlack tracking-wider mb-1">
//             {t('dashboard.routes.dashboard.appointments.diagnosis')}
//           </p>
//           <p className="text-base font-semibold text-subHeadingBlack">{data.diagnosis}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-subHeadingBlack tracking-wider mb-1">
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
//         <h2 className="text-sm leading-3.5 mb-1.5 text-subHeadingBlack">
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