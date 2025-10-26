

export default function AppointmentList() {
  const appointments = [
    {
      id: 1,
      name: "William Brooks",
      phone: "+123456789",
      diagnosis: "Headache",
      time: "9:30 - 09:45 am",
      isNew: false,
      hasAvatar: true
    },
    {
      id: 2,
      name: "Leslie Alexander",
      time: "08:00 - 09:00 AM",
      isNew: true,
      hasAvatar: false
    },
    ...Array(9).fill(null).map((_, i) => ({
      id: i + 3,
      name: "Leslie Alexander",
      time: "08:00 - 09:00 AM",
      isNew: false,
      hasAvatar: false
    }))
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:p-6 -mt-20 lg:p-8">
      <div className="max-w-sm mx-auto bg-white rounded-xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-gray-900 text-lg font-medium mb-1">
            Today Appointment
          </h1>
          <p className="text-blue-600 text-lg font-medium">
            12 Patients
          </p>
        </div>

        {/* Appointments List */}
        <div className="divide-y divide-gray-100">
          {appointments.map((apt) => {
            const isWilliam = apt.id === 1; 

            return (
              <div
                key={apt.id}
                className={`px-5 py-4 transition-colors rounded-lg mb-2 ${
                  isWilliam ? "bg-indigo-50 text-xl font-bold" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                 {/* Avatar */}
<div className="flex-shrink-0">
  {apt.hasAvatar ? (
    <img
      src="https://i.ibb.co.com/Kx5m5knh/Screenshot-2025-10-26-095351.png"
      alt={apt.name}
      className="w-14 h-14 rounded-full object-cover"
    />
  ) : (
    <div className="">
     
    </div>
  )}
</div>


                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`truncate text-sm font-medium ${isWilliam ? "font-bold text-xl" : "text-xl font-bold"}`}>
                        {apt.name}
                      </h3>
                      {apt.isNew && !isWilliam && (
                        <span className="flex-shrink-0 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                          New
                        </span>
                      )}
                    </div>

                    {apt.phone && (
                      <p className="text-gray-700 text-xs mb-2">
                        {apt.phone}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      {apt.diagnosis ? (
                        <>
                          <div className="flex w-full justify-between mt-1">
  {/* Diagnosis */}
  <div>
    <span className="text-gray-700 text-xs">Diagnosis</span>
    <p className={`mt-0.5 ${isWilliam ? "font-semibold text-base text-gray-900" : "text-gray-900 font-medium"}`}>
      {apt.diagnosis}
    </p>
  </div>

  {/* Time */}
  <div className="text-right">
    <span className="text-gray-700 text-xs">Time</span>
    <p className={`${isWilliam ? "font-bold text-gray-900 text-lg" : "text-gray-700"}`}>
      {apt.time}
    </p>
  </div>
</div>

                        </>
                      ) : (
                        <p className={`text-base ${isWilliam ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                          {apt.time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
