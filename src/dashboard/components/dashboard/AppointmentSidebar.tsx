import React from 'react';

interface AppointmentItemProps {
  name: string;
  timeRange: string;
  isNew?: boolean;
}

interface Appointment {
  id: number;
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

const mockAppointments: Appointment[] = [
  {
    id: 1,
    name: 'William Brooks',
    timeRange: '9:30 - 09:45 AM',
    details: {
      phone: '+123456789',
      diagnosis: 'Headache',
      time: '9:30 - 09:45 AM',
      avatarUrl: 'https://via.placeholder.com/150/9CA3AF/FFFFFF?text=WB',
    },
  },
  { id: 2, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM', isNew: true },
  { id: 3, name: 'Bessie Cooper', timeRange: '08:00 - 09:00 AM' },
  { id: 4, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
  { id: 5, name: 'Ronald Richards', timeRange: '08:00 - 09:00 AM' },
  { id: 6, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
  { id: 7, name: 'Esther Howard', timeRange: '08:00 - 09:00 AM' },
  { id: 8, name: 'Floyd Miles', timeRange: '08:00 - 09:00 AM' },
  { id: 9, name: 'Leslie Alexander', timeRange: '08:00 - 09:00 AM' },
];

const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, timeRange, isNew }) => (
  <div className={`p-4 mx-2 rounded-xl transition-colors ${isNew ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
    <div className="flex justify-between items-center">
      <p className="text-gray-900 font-medium text-base leading-snug">{name}</p>
      {isNew && (
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
          New
        </span>
      )}
    </div>
    <p className="text-sm text-gray-500">{timeRange}</p>
  </div>
);


interface ActiveAppointmentProps {
  data: Appointment['details'] & { name: string };
}

const ActiveAppointmentCard: React.FC<ActiveAppointmentProps> = ({ data }) => (
  <div className="p-4 mx-2 mb-4 bg-purple-50 shadow-lg rounded-xl border border-gray-100">
    
    {/* Top Row: Avatar and Name/Phone */}
    <div className="flex items-start mb-4">
      <img
        src={data.avatarUrl}
        alt={data.name}
        className="h-14 w-14 rounded-full object-cover mr-4"
      />
      <div>
        <p className="text-lg font-bold text-gray-900 leading-snug">{data.name}</p>
        <p className="text-sm text-gray-500">{data.phone}</p>
      </div>
    </div>
    
    {/* Bottom Row: Diagnosis and Time */}
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="text-xs font-light text-gray-500 uppercase tracking-wider mb-1">Diagnosis</p>
        <p className="text-base font-semibold text-gray-900">{data.diagnosis}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-light text-gray-500 uppercase tracking-wider mb-1">Time</p>
        <p className="text-base font-semibold text-indigo-600">{data.time}</p>
      </div>
    </div>
  </div>
);

// --- Main List Component ---
const AppointmentsList: React.FC = () => {
  const activeAppointment = mockAppointments.find(a => a.details);

  return (
    // Outer container with a slight background color for contrast
    <div className="bg-white p-4 w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg shadow-xl md:rounded-xl">
      
      {/* List Header */}
      <div className="px-2 mb-4">
        <h2 className="text-sm font-medium text-gray-500">Sunday, 11th</h2>
        <p className="text- font-semibold  text-gray-900">{mockAppointments.length} patients</p>
      </div>
      
      {/* Appointment List Items */}
      <div className="space-y-2">
        {/* Render the Active Card first */}
        {activeAppointment && activeAppointment.details && (
          <ActiveAppointmentCard 
            data={{ ...activeAppointment.details, name: activeAppointment.name }} 
          />
        )}

        {/* Render the rest of the list items */}
        {mockAppointments
          .filter(a => !a.details) 
          .map((appointment) => (
            <AppointmentItem 
              key={appointment.id}
              name={appointment.name}
              timeRange={appointment.timeRange}
              isNew={appointment.isNew}
            />
          ))}
      </div>
    </div>
  );
};

export default AppointmentsList;